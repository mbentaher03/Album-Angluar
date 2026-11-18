import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  user = new User();
  err:number = 0; 

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLoggedin(): void { 
  
      this.authService.login(this.user).subscribe({ 
        next: (data) => { 
          let jwToken = data.headers.get('Authorization')!; 
          this.authService.saveToken(jwToken); 
          this.router.navigate(['/']);   
        }, 
        error: (err: any) => { 
          this.err = 1;  
        } 
        }); 
  } 
  }
