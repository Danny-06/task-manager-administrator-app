import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task';
import { AuthService } from 'src/app/services/auth.service';

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
  ) {}

  tasks: Task[] | null = null

  async ngOnInit() {
    const userId = this.activatedRoute.snapshot.paramMap.get('id')

    if (!userId) {
      return
    }

    this.tasks = await this.authService.getTasksFromUser(userId)

    this.addRemainderToData(this.tasks, 6)

    

    console.log(this.tasks)
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

}
