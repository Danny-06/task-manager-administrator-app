import { Component, OnInit } from '@angular/core';
import { User as AuthUser } from '@angular/fire/auth';
import { ShowComponent } from '../../../utils/show-component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  close() {
    ShowComponent.hide(this)
  }

  options = {
    user: {} as AuthUser
  }

  setOptions(options: any) {
    this.options = options
  }

}
