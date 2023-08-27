import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../common/interfaces/users';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable()
export class UsersService {

  private baseURL: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient, private injector: Injector) { }

  public getUsers(): Signal<Users[]>{
    return toSignal(this.http.get<Users[]>(this.baseURL), {initialValue:[],injector: this.injector});
  }
}
