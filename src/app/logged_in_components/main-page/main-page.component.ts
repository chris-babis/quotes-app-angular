import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/User/user.service';
import { Subscription } from 'rxjs';
import { Quote } from '../quote.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  quotesSub: Subscription;

  constructor(private userService:UserService) { }
  quotes:Quote[] = [];
  userRole;

  ngOnInit(): void {
    this.userRole = this.userService.user.value.userRole;
    this.userService.getUserQuotes();
    this.quotesSub = this.userService.getObservableQuotes().subscribe(quotes => this.quotes = quotes);
  }

  deleteQuote(quoteID){
    this.userService.deleteQuote(quoteID);
  }

  ngOnDestroy(){
    this.quotesSub.unsubscribe();
  }

}
