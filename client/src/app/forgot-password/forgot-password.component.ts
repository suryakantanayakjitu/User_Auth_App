import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  success: boolean = false;

  constructor(private http: HttpClient) { }

  submitForgotPasswordForm(): void {
    if (!this.email) {
      this.message = "Email is required.";
      this.success = false;
      return;
    }

    console.log("submit link generation button hit");
    
    this.http.post<any>('http://localhost:3005/api/requestResetPassword', { useremail: this.email })
      .subscribe(
        (res) => {
          this.message = res.message || 'Reset email sent!';
          this.success = res.success;
          console.log(this.success);
        },
        (err) => {
          this.message = 'Something went wrong.';
          this.success = false;
          console.error(err);
        }
      );
  }
}
