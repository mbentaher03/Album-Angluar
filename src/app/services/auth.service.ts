import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
 import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
     apiURL: string = 'http://localhost:8087/users';
     token! : string ;
     private helper = new JwtHelperService(); 

  /*users: User[] = [
    { username: 'admin', password: '123', roles: ['ADMIN'] },
    { username: 'taher', password: '123', roles: ['USER'] },
  ];*/

  loggedUser!: string;
  isloggedIn = false;
  roles!: string[];

  constructor(private router: Router ,
              private http : HttpClient ) {}


  login(user : User) 
 { 
     return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'}); 
 } 

  registerUser(user: User) {
    return this.http.post<string>(this.apiURL + '/register', user, { observe: 'response', responseType: 'text' as 'json' });
  }
saveToken(jwt:string){ 
     localStorage.setItem('jwt',jwt); 
     this.token = jwt; 
     this.isloggedIn = true;
     this.loadUserFromToken(jwt);
     this.decodeJWT();
} 

decodeJWT() 
  {   if (this.token == undefined) 
            return; 
    const decodedToken = this.helper.decodeToken(this.token); 
    this.roles = decodedToken.roles; 
    this.loggedUser = decodedToken.sub; 
  }

getToken():string { 
    return this.token; 
  } 

loadUserFromToken(jwt: string): void {
  try {
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    this.loggedUser = payload.sub;
    this.roles = payload.roles ?? [];
    localStorage.setItem('loggedUser', this.loggedUser);
    localStorage.setItem('roles', JSON.stringify(this.roles));
  } catch (e) {
    this.roles = [];
  }
}


  logout(): void {
   this.loggedUser = undefined!; 
   this.roles = undefined!; 
   this.token= undefined!; 
   this.isloggedIn = false; 
   localStorage.removeItem('jwt'); 
   this.router.navigate(['/login']); 
  }

   loadToken() { 
    this.token = localStorage.getItem('jwt')!; 
    this.decodeJWT(); 
  } 
  isTokenExpired(): Boolean 
{ 
      return  this.helper.isTokenExpired(this.token);   
}


  /*SignIn(user: User): boolean {
    const validUser = this.users.find(
      (current) => current.username === user.username && current.password === user.password,
    );

    if (!validUser) {
      return false;
    }

    this.loggedUser = validUser.username;
    this.isloggedIn = true;
    this.roles = validUser.roles;
    localStorage.setItem('loggedUser', this.loggedUser);
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    return true;
  }*/

  setLoggedUserFromLocalStorage(login: string): void {
    this.loggedUser = login;
    this.isloggedIn = true;
    //this.getUserRoles(login);
  }

  getUserRoles(username: string): void {
    // roles loaded from JWT or backend
  }

  isAdmin(): boolean {
    if (!this.roles) 
       return false; 
    return this.roles.indexOf('ADMIN') >= 0 || this.roles.indexOf('ROLE_ADMIN') >= 0; 
  }
}
