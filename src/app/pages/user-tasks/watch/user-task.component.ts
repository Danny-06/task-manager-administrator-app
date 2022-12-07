import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../interfaces/task';
import { TaskImage } from '../../../interfaces/task-image';
import { AuthService } from '../../../services/auth.service';
import { FireStorageService } from '../../../services/fire-storage.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.scss']
})
export class UserTaskComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utils: UtilsService,
  ) {
    const userId = this.activatedRoute.snapshot.paramMap.get('userId')
    const taskId = this.activatedRoute.snapshot.paramMap.get('taskId')

    if (!userId || !taskId) {
      throw new Error(`Id not found`)
    }

    this.userId = userId
    this.taskId = taskId
  }

  userId: string 
  taskId: string

  task: Task = {images: [] as TaskImage[], title: '', description: ''} as Task

  async ngOnInit() {
    this.task = await this.getTask()
  }

  async toggleTaskCompleted() {
    const isTaskCompleted = this.task.completed === true

    this.task = await this.updateTask({...this.task, completed: !isTaskCompleted})
  }

  async getTask() {
    const task = await this.authService.getTaskFromUser(this.userId,this.taskId)

    return task
  }

  async updateTask(task: Task) {
    await this.authService.updateTaskToUser(this.userId, task)

    const updatedTask = await this.getTask()

    return updatedTask
  }

}
