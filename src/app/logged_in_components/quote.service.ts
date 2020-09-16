import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quote } from './quote.model';
import { Subject } from 'rxjs';
import { UserService } from '../User/user.service';

@Injectable({providedIn: 'root'})
export class QuoteService{

  awaitingQuotes: Quote[] = [];
  acceptedQuotes: Quote[] = [];
  quotesObservable = new Subject<Quote[]>();

  constructor(private http:HttpClient, private userService:UserService){}

  getAwaitingQuotes(){
    let headers = new HttpHeaders();
    headers = headers.set(`Authorization`,`Bearer ${this.userService.user.value.token}`);
    this.http.get<{quotes:Quote[]}>('http://localhost:3000/awaiting', {headers}).subscribe((quotes) => {
      this.awaitingQuotes = quotes.quotes;
      this.quotesObservable.next(this.awaitingQuotes.slice());
    })
  }

  getAcceptedQuotes(){
    let headers = new HttpHeaders();
    headers = headers.set(`Authorization`,`Bearer ${this.userService.user.value.token}`);
    this.http.get<{quotes:Quote[]}>('http://localhost:3000/quotes', {headers}).subscribe(quotes => {
      this.acceptedQuotes = quotes.quotes;
      this.quotesObservable.next(this.acceptedQuotes.slice());
    });
  }

  acceptQuotes(quoteID){
    let headers = new HttpHeaders();
    headers = headers.set(`Authorization`,`Bearer ${this.userService.user.value.token}`);
    this.http.put(`http://localhost:3000/accept/${quoteID}`, {awaiting: false}, {headers}).subscribe(res => {
      this.awaitingQuotes = this.awaitingQuotes.filter(quote => quote._id !== quoteID);
      this.quotesObservable.next(this.awaitingQuotes.slice());
    });
  }

  deleteQuotes(quoteID){
      let headers = new HttpHeaders();
      headers = headers.set(`Authorization`,`Bearer ${this.userService.user.value.token}`);
      this.http.delete(`http://localhost:3000/quote/${quoteID}`, {headers}).subscribe();
      this.awaitingQuotes = this.awaitingQuotes.filter(quote => quote._id !== quoteID);
      this.quotesObservable.next(this.awaitingQuotes.slice());
  }

  getObservableQuotes(){
    return this.quotesObservable.asObservable();
  }

}
