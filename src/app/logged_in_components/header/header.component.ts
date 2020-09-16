import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/User/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userRole;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userRole = this.userService.user.value.userRole;
    console.log(this.userRole);
  }

  onLogout(){
    this.userService.logout();
  }

}
