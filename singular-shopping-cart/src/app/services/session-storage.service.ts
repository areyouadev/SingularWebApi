import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {WindowRef} from "./window-ref.service";


@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private readonly nativeWindow: any;

  private readonly sessionItemSubjects: {
    [key: string]: BehaviorSubject<string>;
  } = {};


  constructor(windowRef: WindowRef) {
    this.nativeWindow = windowRef.nativeWindow;
  }

  select(key: string): Observable<string> {
    if (this.sessionItemSubjects.hasOwnProperty(key)) {
      return this.sessionItemSubjects[key].asObservable();
    }

    if (this.nativeWindow.sessionStorage.getItem(key) != null) {
      this.sessionItemSubjects[key] = new BehaviorSubject(
        this.nativeWindow.sessionStorage.getItem(key) as string
      );
    } else {
      this.sessionItemSubjects[key] = new BehaviorSubject('');
    }

    return this.sessionItemSubjects[key].asObservable();
  }

  set(key: string, value: string): void {
    this.nativeWindow.sessionStorage.setItem(key, value);

    if (this.sessionItemSubjects.hasOwnProperty(key)) {
      this.sessionItemSubjects[key].next(value);
    }
  }

  remove(key: string): void {
    this.nativeWindow.sessionStorage.removeItem(key);

    if (this.sessionItemSubjects.hasOwnProperty(key)) {
      // @ts-ignore
      this.sessionItemSubjects[key].next(null);
    }
  }
}
