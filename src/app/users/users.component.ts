import {
  Component,
  Injector,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../core/users.service';
import { Observable } from 'rxjs';
import { Users } from '../common/interfaces/users';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users!: Signal<Users[]>;
  public age: WritableSignal<number> = signal(0);
  public totalAge: Signal<number> = computed(()=> this.age()*2)

  constructor(private userServices: UsersService, private injector: Injector) {
  }

  ngOnInit(): void {
    this.users = this.userServices.getUsers();
    /* this.age.set(1); // la diferencia entre el update y set es que el update nos permite acceder al valor actual del signal
    this.age.update(value => value*2);
    this.age.mutate(obj => obj.age = 20)//el mutate esta pensado en los objetos
    //y al cambiar el valor lo que hace es emitir dicho cambio
  } */
  effect(()=> {
    console.log(`Age: ${this.age()}`)
    console.log(this.totalAge())
    //console.log(untracked(this.age())
  }, {injector: this.injector}) //cuando se utiliza el effect por fuera del constructor se necesita usar el injector
  }

  public updateAge(){
    this.age.update(age => age+2);
  }
}
