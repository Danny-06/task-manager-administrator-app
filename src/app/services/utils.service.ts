import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor() {}

  observableToPromise<T, R extends boolean = false>(observable: Observable<T>, multipleValues: R = false as R) {

    return new Promise((resolve, reject) => {

      if (!multipleValues) {
        observable.subscribe({next: resolve, error: reject})
      }

      const values: any[] = []

      const observer: Observer<any> = {
        next:     data    => values.push(data),
        error:    message => reject(message),
        complete: ()      => resolve(values)
      }

      observable.subscribe(observer)
    }) as R extends false ? Promise<T> : Promise<T[]>

  }

}
