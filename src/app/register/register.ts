import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styles: ``
})
export class Register implements OnInit {
  user: User = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onRegister(): void {
    console.log(this.myForm.value);
    this.user.username = this.myForm.value.username;
    this.user.email    = this.myForm.value.email;
    this.user.password = this.myForm.value.password;

    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this.router.navigate(['/verifyEmail'], {
          state: { email: this.myForm.value.email }
        });
      },
      error: (err: any) => {
        if (err.status === 400) {
          this.err = err.error?.message ?? 'Email déjà utilisé.';
        } else {
          this.err = 'Erreur lors de l\'inscription.';
        }
      }
    });
  }
}
