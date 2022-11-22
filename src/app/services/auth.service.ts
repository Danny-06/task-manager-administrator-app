import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs'
import { User } from '../interfaces/user';
import { Task } from '../interfaces/task';
import { auth } from 'firebase-admin';

const usersPath = 'users'
const tasksPath = 'tasks'

const adminAuth = auth()

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private firestore: Firestore,
    private utils: UtilsService
  ) {}

  getUsers(): Promise<User[]> {
    const collectionRef = collection(this.firestore, usersPath)
    const observableData = collectionData(collectionRef, {idField: 'id'}) as Observable<User[]>

    return this.utils.observableToPromise(observableData)
  }

  getUser(userId: string): Promise<User> {
    const docRef = doc(this.firestore, `${usersPath}/${userId}`)
    const observableData = docData(docRef, {idField: 'id'}) as Observable<User>

    return this.utils.observableToPromise(observableData)
  }

  deleteUserData(userId: string) {
    const docRef = doc(this.firestore, `${usersPath}/${userId}`)
    return deleteDoc(docRef)
  }

  async deleteUser(userId: string) {
    await Promise.all([
      adminAuth.deleteUser(userId),
      this.deleteUserData(userId)
    ])
  }

  getTasksFromUser(userId: string): Promise<Task[]> {
    const collectionRef = collection(this.firestore, `${usersPath}/${userId}/${tasksPath}`)
    const observableData = collectionData(collectionRef, {idField: 'id'}) as Observable<Task[]>

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

  deleteTaskToUser(userId: string, task: Task) {
    const docRef = doc(this.firestore, `${usersPath}/${userId}/${tasksPath}/${task.id}`)
    return deleteDoc(docRef)
  }

}
