import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../interfaces/task';
import { TaskImage } from '../../../interfaces/task-image';
import { openModal } from '../../../libs/modal/modal.component';
import { AuthService } from '../../../services/auth.service';
import { FireStorageService } from '../../../services/fire-storage.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-user-task-create',
  templateUrl: './user-task-create.component.html',
  styleUrls: ['./user-task-create.component.scss']
})
export class UserTaskCreateComponent {

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fireStorageService: FireStorageService,
    private utils: UtilsService,
  ) {
    const userId = this.activatedRoute.snapshot.paramMap.get('userId')

    if (!userId) {
      throw new Error(`Id not found`)
    }

    this.userId = userId
  }

  userId: string 

  task: Task = {images: [] as TaskImage[], title: '', description: ''} as Task

  async createTask() {
    if (this.isTaskFieldsEmpty()) {
      this.emptyFieldsAlert()
      return
    }

    this.task.date = Date.now()

    this.authService.addTaskToUser(this.userId, this.task)

    this.router.navigateByUrl(`/user/${this.userId}/tasks`)
  }

  isTaskFieldsEmpty() {
    if (this.task.title === '' || this.task.description === '') {
      return true
    }

    return false
  }

  async emptyFieldsAlert() {
    await openModal({
      header: 'Required fields empty',
      message: 'Fill the missing required fields',
      buttons: [
        {text: 'Ok'}
      ]
    })
  }

  async addImage() {
    const imageFile = await this.utils.requestFile('image/*')
    const imgURL = await this.fireStorageService.uploadFile(imageFile, 'tasks', `${imageFile.name} - ${Date.now()}`)

    this.task.images.push({src: imgURL})
  }

  deleteImage(image: TaskImage) {
    const imageIndex = this.task.images.indexOf(image)
    this.task.images.splice(imageIndex, 1)
  }

}
