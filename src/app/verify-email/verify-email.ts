import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './verify-email.html',
  styles: ``
})
export class VerifyEmail implements OnInit {
  token: string = '';
  message: string = '';
  success: boolean = false;
  loading: boolean = false;
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // If token passed in URL (?token=xxx), verify automatically
    const tokenFromUrl = this.route.snapshot.queryParams['token'];
    const emailFromNav = history.state?.email;
    if (emailFromNav) this.email = emailFromNav;

    if (tokenFromUrl) {
      this.token = tokenFromUrl;
      this.verifyToken();
    }
  }

  verifyToken(): void {
    if (!this.token.trim()) {
      this.message = 'Veuillez entrer le code de vérification.';
      return;
    }
    this.loading = true;
    this.http.get('http://localhost:8087/users/verifyEmail?token=' + this.token, {
      responseType: 'text'
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = res;
        this.success = res.includes('succès');
      },
      error: (err) => {
        this.loading = false;
        this.message = 'Token invalide ou expiré.';
        this.success = false;
      }
    });
  }
}
