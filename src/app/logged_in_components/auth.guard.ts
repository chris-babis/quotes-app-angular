import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../User/user.service';
import { Observable } from 'rxjs';
import { map, take, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService, private router:Router){}

  canActivate(route:ActivatedRouteSnapshot, router: RouterStateSnapshot):boolean|UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>  {
    return this.userService.user.pipe(
      take(1),
      map(user => {
        console.log(user);
        return !!user;
    }),
    tap(isAuth => {
      console.log(isAuth);
      if(!isAuth){
        this.router.navigate(['/login']);
      }
    })

    );
  }
}
