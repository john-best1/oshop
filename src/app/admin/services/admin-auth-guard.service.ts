import { UserService } from 'shared/services/user.service';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin))
  }
}
