import { Component } from '@angular/core';
import { AppAuthSignupService } from './appsignup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userId: string = "";
  userEmail: string = "";
  userPhoneNumber: string = "";
  password: string = "";
  confirmPassword: string = "";
  passwordMismatch: boolean = false;
  confirmPasswordTouched: boolean = false;

  constructor(private appauthsignupservice: AppAuthSignupService) { }

  clearForm() {
    this.userId = "";
    this.userEmail = "";
    this.userPhoneNumber = "";
    this.password = "";
    this.confirmPassword = "";
    this.passwordMismatch = false;
    this.confirmPasswordTouched = false;
  }

  checkPasswordMatch(): void {
    // Compare passwords and update the mismatch flag
    this.confirmPasswordTouched = true;
    this.passwordMismatch = this.password !== this.confirmPassword;
  }

  submitSignupForm(): void {
    if (!this.userId || !this.userEmail || !this.userPhoneNumber || !this.password || !this.confirmPassword) {
      alert("Please fill all fields before submitting.");
      return;  // Stop the function here itself
    }
    if (this.userPhoneNumber.length != 10) {
      alert("Mobile number must be exactly 10 digits!");
      return;
    }
    const Organization = this.userEmail.split("@")[1];
    if (!Organization || !["gmail.com", "yahoo.com", "outlook.com"].includes(Organization.toLowerCase())) {
      alert("Please use a valid Email-Id (@gmail/@yahoo/@outlook)!");
      return;
    }

    if (this.passwordMismatch) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      userid: this.userId,
      useremail: this.userEmail,
      userphonenumber: this.userPhoneNumber,
      password: this.password
    };

    this.appauthsignupservice.signup(userData).subscribe(
      (res: any) => {
        if (res.message === "User registered successfully") {
          alert('Sign up successful: ' + res.message);
          this.clearForm();
        }
        else {
          alert('Sign up unsuccessful: ' + res.message);
        }

        // Handle success, such as showing a success message or redirecting to another page
      },
      (error) => {
        console.error('Error signing up:', error);
        // Handle error, such as displaying an error message to the user
      }
    );
  }
}
