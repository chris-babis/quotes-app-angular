import { Component, OnInit, OnDestroy } from '@angular/core';
import { Quote } from '../quote.model';
import { QuoteService } from '../quote.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-awaiting',
  templateUrl: './awaiting.component.html',
  styleUrls: ['./awaiting.component.css']
})
export class AwaitingComponent implements OnInit,OnDestroy {

  quotes: Quote[] = [];
  quotesSub: Subscription;
  constructor(private quoteService:QuoteService) { }

  ngOnInit(): void {
    this.quoteService.getAwaitingQuotes();
    this.quotesSub = this.quoteService.getObservableQuotes().subscribe(quotes => this.quotes = quotes );
  }

  acceptQuote(quoteID){
    this.quoteService.acceptQuotes(quoteID);
  }
  deleteQuote(quoteID){
    this.quoteService.deleteQuotes(quoteID);
  }

  ngOnDestroy(){
    this.quotesSub.unsubscribe();
  }

}
