import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../User/user.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Quote } from '../logged_in_components/quote.model';

@Injectable({providedIn: 'root'})
export class UserService {

  userQuotes = new Subject<Quote[]>();
  quotes: Quote[] = [];
  errorMessage = new Subject<string>();
  user = new BehaviorSubject<User>(null);
  constructor(private http:HttpClient,private router:Router){}

  registerUser(user: User){
    this.http.post<{token:string, user: User}>("http://localhost:3000/register", user)
      .pipe(tap(resData => this.handleAuthentication(resData.user._id, resData.user.username, resData.user.userRole, resData.token)))
      .subscribe(
        res => {
          this.router.navigate(['/user'])
        },
        err => console.log(err));
  }

  loginUser(user:User){
    this.http.post<{token:string, user: User}>("http://localhost:3000/login", user)
    .pipe(tap(resData => this.handleAuthentication(resData.user._id, resData.user.username, resData.user.userRole, resData.token)))
    .subscribe(
      res => {
        this.router.navigate(['/user'])
      },
      err => this.errorMessage.next(err.error.message));
  }

  private handleAuthentication(_id:string,username:string, userRole:string, token:string){
    const user = new User(_id,username,userRole,token);
    this.user.next(user);
    localStorage.setItem('userData',JSON.stringify(user));
  }

  autoLogin(){
    const userData: {_id: string; username: string; userRole:string, token: string} = JSON.parse(localStorage.getItem('userData'));
    if(!userData) return;

    const loadedUser = new User(userData._id,userData.username,userData.userRole,userData.token);
    if(loadedUser.token) this.user.next(loadedUser);
  }

  logout(){
    let headers = new HttpHeaders();
    headers = headers.set(`Authorization`,`Bearer ${this.user.value.token}`);
    this.http.post(`http://localhost:3000/user/logout`,this.user.value, {headers: headers}).subscribe();
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }

  getUserQuotes(){
    let headers = new HttpHeaders();
    headers = headers.set(`Authorization`,`Bearer ${this.user.value.token}`);
    this.http.get<{quotes: Quote[]}>(`http://localhost:3000/quotes/me`, {headers: headers})
    .subscribe(quotes => {
      this.quotes = quotes.quotes;
      this.userQuotes.next(this.quotes.slice());
    });
  }

  uploadQuote(quote:Quote){
    let headers = new HttpHeaders();
    headers = headers.set(`Authorization`,`Bearer ${this.user.value.token}`);
    return this.http.post("http://localhost:3000/quote", quote, {headers: headers}).subscribe(res => this.router.navigate(['/user/me']));
  }

  deleteQuote(quoteID){
    let headers = new HttpHeaders();
    headers = headers.set(`Authorization`,`Bearer ${this.user.value.token}`);
    this.http.delete(`http://localhost:3000/quote/${quoteID}`, {headers}).subscribe();
    this.quotes = this.quotes.filter(quote => quote._id !== quoteID);
    this.userQuotes.next(this.quotes.slice());
  }

  getObservableQuotes(){
    return this.userQuotes.asObservable();
  }

}

//Create User
//Add token,id,username to a observable user
//setlocalStorage
