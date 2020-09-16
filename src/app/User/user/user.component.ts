import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {


  error;
  header;
  buttonText;
  page_mode;
  errorSub: Subscription;
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    if(this.userService.user.value)this.router.navigate(['/user']);
    this.page_mode = this.router.url === '/register' ? 'register' : 'login';
    if(this.page_mode === 'register') {
      this.header = 'Register';
      this.buttonText = 'Register'
    } else {
      this.header = 'Login';
      this.buttonText = 'Login'
    }
    this.errorSub = this.userService.errorMessage.subscribe(error => this.error = error);
  }

  onSubmit(form:NgForm){
    const user: User = {username: form.value.username, password: form.value.password};
    this.page_mode === 'register' ? this.userService.registerUser(user) : this.userService.loginUser(user);
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }

}
