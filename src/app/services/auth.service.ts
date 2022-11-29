import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs'
import { User } from '../interfaces/user';
import { Task } from '../interfaces/task';
import { User as AuthUser } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

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

  // Auth Users

  async getAuthUsers(): Promise<AuthUser[]> {
    const authUsersObservable = this.http.get<AuthUser[]>(`${ADMIN_API_URL}/api/firebase-admin/auth/users`)
    const authUsers = await this.utils.observableToPromise(authUsersObservable)

    return authUsers
  }

  getAuthUser(uid: string) {

  }

  deleteAuthUser(uid: string) {

  }

  getUsers(): Promise<User[]> {
    const collectionRef = collection(this.firestore, usersPath)
    const observableData = collectionData(collectionRef, { idField: 'id' }) as Observable<User[]>

    return this.utils.observableToPromise(observableData)
  }

  getUserData(userId: string): Promise<User> {
    const docRef = doc(this.firestore, `${usersPath}/${userId}`)
    const observableData = docData(docRef, { idField: 'id' }) as Observable<User>

    return this.utils.observableToPromise(observableData)
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
