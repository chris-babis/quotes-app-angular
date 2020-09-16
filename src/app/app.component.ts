import { Component, OnInit } from '@angular/core';
import { UserService } from './User/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'quotesAPP';

  constructor(private userService:UserService){}

  ngOnInit(){
    this.userService.autoLogin();
  }
}
