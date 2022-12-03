import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs'
import { User } from '../interfaces/user';
import { Task } from '../interfaces/task';
import { AuthUserForm } from '../interfaces/auth-user-form';
import { User as AuthUser } from '@angular/fire/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const usersPath = 'users'
const tasksPath = 'tasks'

const ADMIN_API_URL = 'http://127.0.0.1:9000'


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private firestore: Firestore,
    private utils: UtilsService,
    private http: HttpClient
  ) { }

  async addUser(authUserForm: AuthUserForm, userData: User) {
    const newAuthUser = await this.addAuthUser(authUserForm)

    userData.id = newAuthUser.uid

    await this.addUserData(userData)
  }

  // Auth Users

  async getAuthUsers(): Promise<AuthUser[]> {
    const authUsersObservable = this.http.get<AuthUser[]>(`${ADMIN_API_URL}/api/firebase-admin/auth/users`)
    const authUsers = await this.utils.observableToPromise(authUsersObservable)

    return authUsers
  }

  async getAuthUser(uid: string) {
    const authUserObservable = this.http.get<AuthUser[]>(`${ADMIN_API_URL}/api/firebase-admin/auth/user/${uid}`)
    const authUser = await this.utils.observableToPromise(authUserObservable)

    return authUser
  }

  async addAuthUser(authUserForm: AuthUserForm) {
    const response = await fetch(
      `${ADMIN_API_URL}/api/firebase-admin/auth/user/add`,
      {
        method: 'POST',
        body: JSON.stringify(authUserForm),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const data = await response.json()

    if (response.status !== 200) {
      throw data
    }

    return data
  }

  async updateAuthUser(authUserForm: AuthUserForm) {
    const response = await fetch(
      `${ADMIN_API_URL}/api/firebase-admin/auth/user/update`,
      {
        method: 'POST',
        body: JSON.stringify(authUserForm),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const data = await response.json()
    return data
  }

  async deleteAuthUser(uid: string) {
    const response = await fetch(
      `${ADMIN_API_URL}/api/firebase-admin/auth/user/delete`,
      {
        method: 'POST',
        body: JSON.stringify(uid),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const data = await response.json()
    return data
  }

  getUsersData(): Promise<User[]> {
    const collectionRef = collection(this.firestore, usersPath)
    const observableData = collectionData(collectionRef, { idField: 'id' }) as Observable<User[]>

    return this.utils.observableToPromise(observableData)
  }

  getUserData(userId: string): Promise<User> {
    const docRef = doc(this.firestore, `${usersPath}/${userId}`)
    const observableData = docData(docRef, { idField: 'id' }) as Observable<User>

    return this.utils.observableToPromise(observableData)
  }

  addUserData(userData: User) {
    const collectionRef = collection(this.firestore, `${usersPath}/${userData.id}}`)
    return addDoc(collectionRef, userData)
  }

  deleteUserData(userId: string) {
    const docRef = doc(this.firestore, `${usersPath}/${userId}`)
    return deleteDoc(docRef)
  }

  async deleteUser(userId: string) {
    await Promise.all([
      this.deleteAuthUser(userId),
      this.deleteUserData(userId)
    ])
  }

  getTasksFromUser(userId: string): Promise<Task[]> {
    const collectionRef = collection(this.firestore, `${usersPath}/${userId}/${tasksPath}`)
    const observableData = collectionData(collectionRef, { idField: 'id' }) as Observable<Task[]>

    return this.utils.observableToPromise(observableData)
  }

  addTaskToUser(userId: string, task: Task) {
    const collectionRef = collection(this.firestore, `${usersPath}/${userId}/${tasksPath}`)
    return addDoc(collectionRef, task)
  }

  updateTaskToUser(userId: string, task: Task) {
    const docRef = doc(this.firestore, `${usersPath}/${userId}/${tasksPath}/${task.id}`)
    return setDoc(docRef, task)
  }

  deleteTaskToUser(userId: string, taskId: string) {
    const docRef = doc(this.firestore, `${usersPath}/${userId}/${tasksPath}/${taskId}`)
    return deleteDoc(docRef)
  }

}
