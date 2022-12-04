import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user';
import { openModal } from '../../../libs/modal/modal.component';
import { AuthService } from '../../../services/auth.service';
import { FireStorageService } from '../../../services/fire-storage.service';
import { UtilsService } from '../../../services/utils.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private fireStorageService: FireStorageService,
    private utils: UtilsService
  ) {}

  readonly userPlaceholder = 'assets/user-placeholder.jpg'

  userData: User = {name: '', image: ''}

  email: string = ''
  password: string = ''

  async createUser() {
    if (this.email === '' || this.password === '' || this.userData.name === '') {
      this.emptyValuesAlert()
      return
    }

    this.authService.addUser({email: this.email, password: this.password}, this.userData)
    .then(() => {
      this.successModal()
    })
    .catch(error => {
      this.errorModal(error)
    })
  }

  async selectProfileImage() {
    const imageFile = await this.utils.requestFile('image/*') as File

    const imageURL = await this.fireStorageService.uploadFile(imageFile, 'images', `${imageFile.name} - ${Date.now()}`)

    this.userData.image = imageURL
  }

  private async emptyValuesAlert() {
    await openModal({
      header: 'Form error',
      message: 'Require empty fields must be filled',
      buttons: [
        {text: 'Ok'}
      ]
    })
  }

  private async successModal() {
    await openModal({
      header: 'Operation Succeeded',
      message: 'User was created.\nYou will be redirected to /users.',
      buttons: [
        {text: 'Continue', action: () => this.router.navigateByUrl('/users')}
      ]
    })
  }

  private async errorModal(error: string) {
    await openModal({
      header: 'An error happened',
      message: error,
      buttons: [
        {text: 'Ok'}
      ]
    })
  }

}
