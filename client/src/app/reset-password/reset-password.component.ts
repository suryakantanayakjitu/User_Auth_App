import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  token: string = '';

  errorMessage: string = '';
  successMessage: string = '';
  showError: boolean = false;
  showSuccess: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log("Token from query params:", this.token);
    });
  }

  checkPasswords(): void {
    if (!this.confirmPassword) {
      this.showError = false;
      this.showSuccess = false;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showError = true;
      this.showSuccess = false;
      this.errorMessage = 'Passwords do not match';
    } else {
      this.showError = false;
      this.showSuccess = true;
      this.successMessage = 'Passwords match';
    }
  }

  submitResetForm(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.http
      .post(`http://localhost:3005/api/reset-password/${this.token}`, {
        password: this.password,
        confirmPassword: this.confirmPassword,
      })
      .subscribe(
        (response: any) => {
          alert(response.message);
          if (response.success) {
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          alert('Something went wrong. Please try again.');
          console.error(error);
        }
      );
  }
}
