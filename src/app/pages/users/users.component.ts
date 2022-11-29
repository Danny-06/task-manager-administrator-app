import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { openModal } from 'src/app/libs/modal/modal.component';
import { ShowComponent } from '../../utils/show-component';
import { UserAccountComponent } from './account/user-account.component';
import { User as AuthUser } from '@angular/fire/auth';

@Component({
  selector: 'app-main',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  users: User[] | null = null

  authUserMap = new Map<string, AuthUser>()

  async ngOnInit() {
    const authUsers = await this.authService.getAuthUsers()
    console.log('Auth Users', authUsers)

    this.users = await this.authService.getUsers()
    this.users.reverse()

    authUsers.forEach(authUser => {
      this.authUserMap.set(authUser.uid, authUser)
    })

    console.log('AuthUser Map', this.authUserMap)

    console.log('Users', [...this.users])

    this.addRemainderToData(this.users, 6)

    this.users.forEach(async user => {
      const tasks = await this.authService.getTasksFromUser(user.id)

      if (user.name) console.log(user.name, tasks)
    })
  }

  goToUser(userId: string) {
    if (!userId) return

    this.router.navigateByUrl(`/user/${userId}/tasks`)
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

  // Handle Users

  async seeUserAccount(uid: string) {
    const {instance, waitForDismiss} = await ShowComponent.show(UserAccountComponent)

    instance.setOptions({
      authUser: this.authUserMap.get(uid)
    })

    await waitForDismiss
  }

  async deleteUser(uid: string) {
    await openModal({
      header: 'Are you sure you want to delete this user?',
      message: 'This action will delete the user account along with its data',
      buttons: [
        { text: 'Ok', action: () => this.authService.deleteUser(uid) },
        { text: 'Cancel', type: 'cancel' }
      ]
    })
  }

  editUser(uid: string) {
    this.router.navigateByUrl(`/task/edit/${uid}`)
  }

}
