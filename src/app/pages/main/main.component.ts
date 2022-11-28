import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { openModal } from 'src/app/libs/modal/modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  users: User[] | null = null

  async ngOnInit() {
    await openModal({
      header: 'Sonic',
      message: 'Elise',
      buttons: [
        {text: 'Ok', action: () => console.log('OK')},
        {text: 'Cancel', closeModal: true, type: 'cancel', action: () => console.log('Cancel')}
      ]
    })

    const authUsers = await this.authService.getAuthUsers()
    console.log('Auth Users', authUsers)

    this.users = await this.authService.getUsers()

    console.log('Users', [...this.users])

    this.addRemainderToData(this.users, 6)
    
    this.users.forEach(async user => {
      const tasks = await this.authService.getTasksFromUser(user.id)
      console.log(user.name, tasks)
    })
  }

  goToUser(userId: string) {
    if (!userId) return

    this.router.navigateByUrl(`/tasks/${userId}`)
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

  seeUserAccount(uid: string) {
    
  }

  deleteUser(uid: string) {

  }

  editUser(uid: string) {

  }

}
