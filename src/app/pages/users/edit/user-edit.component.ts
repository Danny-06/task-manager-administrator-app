import { Component, OnInit } from '@angular/core';
import { User as AuthUser } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserForm } from '../../../interfaces/auth-user-form';
import { User } from '../../../interfaces/user';
import { openModal } from '../../../libs/modal/modal.component';
import { AuthService } from '../../../services/auth.service';
import { FireStorageService } from '../../../services/fire-storage.service';
import { UtilsService } from '../../../services/utils.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private fireStorageService: FireStorageService,
    private utils: UtilsService
  ) {}

  readonly userPlaceholder = 'assets/user-placeholder.jpg'

  userData: User = {} as User
  authUserForm: AuthUserForm = {}

  async ngOnInit() {
    const uid = this.activatedRoute.snapshot.paramMap.get('id')

    if (!uid) {
      openModal({
        header: `We couldn't find this user`,
        message: 'You will be redirected to /users',
        buttons: [
          {
            text: 'Continue',
            action: () => this.router.navigateByUrl(`/users`)
          }
        ]
      })
      return
    }

    const [authUserForm, userData] = await this.getUser(uid)

    this.authUserForm = {uid: authUserForm.uid, email: authUserForm.email ?? '', password: ''}
    this.userData = userData
  }

  getUser(uid: string) {
    return this.authService.getUser(uid)
  }

  async editUser() {
    if (!this.userData) {
      return
    }

    if (this.authUserForm.email === '' || this.userData.name === '') {
      this.emptyValuesAlert()
      return
    }

    console.log({authUserForm: this.authUserForm, userData: this.userData})

    this.authService.updateUser(this.authUserForm, this.userData)
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
      message: 'User was edited.\nYou will be redirected to /users.',
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
