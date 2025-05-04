import { Component } from '@angular/core';
import { GenerateForgotPasswordLinkService } from './generate-forgot-password-link.service';

@Component({
  selector: 'app-generate-forgot-password-link',
  templateUrl: './generate-forgot-password-link.component.html',
  styleUrl: './generate-forgot-password-link.component.css'
})
export class GenerateForgotPasswordLinkComponent {
  email: string = '';
    message: string = '';
    success: boolean = false;
  
    constructor(private GenerateForgotPasswordLink: GenerateForgotPasswordLinkService) { }
  
    submitForgotPasswordForm(): void {
      if (!this.email) {
        this.message = "Email is required.";
        this.success = false;
        return;
      }
  
      console.log("submit link generation button hit");
      const mailId = {
        useremail : this.email
      }
      this.GenerateForgotPasswordLink.RequestResetPasswordLink(mailId).subscribe(
          (resData: any) => {
            this.message = resData.message || 'Reset email sent!';
            this.success = resData.success;
            console.log(this.success);
            console.log(resData);
          },
          (err : any) => {
            this.message = 'Something went wrong.';
            this.success = false;
            console.error(err);
          }
        );
    }
}
