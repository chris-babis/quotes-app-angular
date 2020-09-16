import { Component, OnInit } from '@angular/core';
import { Quote } from '../quote.model';
import { QuoteService } from '../quote.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quotes: Quote[] = [];
  acceptedSub: Subscription;
  constructor(private quoteService:QuoteService) { }

  ngOnInit(): void {
    this.quoteService.getAcceptedQuotes();
    this.acceptedSub = this.quoteService.getObservableQuotes().subscribe(quotes => this.quotes = quotes)
  }

  likeQuote(quoteID){

  }

}
