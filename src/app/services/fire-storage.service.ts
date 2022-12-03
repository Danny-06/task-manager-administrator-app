import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})


export class FireStorageService {

  constructor(private storage: AngularFireStorage) {}

  /**
   * Upload file to Firebase and return url of the uploaded file
   * @returns {string} URL of the uploaded file
   */
  uploadFile(file: any, path: string, name: string): Promise<string> {
    const filePath = `${path}/${name}`
    const storageRef = this.storage.ref(filePath)
    const task = storageRef.put(file)

    return task.then(() => storageRef.getDownloadURL().toPromise())
  }

}
