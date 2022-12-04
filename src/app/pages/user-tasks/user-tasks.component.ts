import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task';
import { AuthService } from 'src/app/services/auth.service';
import { openModal } from '../../libs/modal/modal.component';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  userId: string | null = null

  tasks: Task[] | null = null

  async ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id')

    if (!this.userId) {
      return
    }

    this.tasks = await this.authService.getTasksFromUser(this.userId)
    this.tasks.reverse()

    this.addRemainderToData(this.tasks, 6)


    console.log('Tasks', this.tasks)
  }

  addRemainderToData(data: any[], remainderValue: number) {
    if (!data) return

    const remainder = remainderValue - data.length % remainderValue

    if (data.length === 0 || data.length % remainderValue !== 0) {
      for (let i = 0; i < remainder; i++) {
        data.push({} as Task)
      }
    }
  }

  createUserTask() {
    this.router.navigateByUrl(`/user/${this.userId}/task/create`)
  }

  goToTask(taskId: string | null | undefined) {
    if (taskId == null) return

    this.router.navigateByUrl(`/user/${this.userId}/task/${taskId}`)
  }

  editTask(taskId: string) {
    this.router.navigateByUrl(`/user/${this.userId}/task/edit/${taskId}`)
  }

  async deleteTask(taskId: string) {
    await openModal({
      header: 'Are you sure you want to delete this task?',
      message: 'This action will delete the task from the user and cannot be undone',
      buttons: [
        {
          text: 'Ok',
          action: async () => {
            await this.authService.deleteTaskToUser(this.userId!!, taskId)
            location.reload()
          }
        },
        { text: 'Cancel', type: 'cancel' }
      ]
    })
  }

}
