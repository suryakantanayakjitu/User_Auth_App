import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppAuthLoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username:any;
  password:any;
  constructor (private router:Router, private loginservice: AppAuthLoginService) {}

  clearForm(){
    this.username = "";
    this.password = "";
  }

  login(): void{
    // alert(`username is:${this.username}
    //   password is ${this.password}`)
    const loginData = {
      userid: this.username,
      password: this.password
    };

    this.loginservice.login(loginData).subscribe(
      (resData:any) =>{
        this.loginservice.status = resData;
        if(resData.data == null && resData.message === "User not found"){
          return alert(`${this.username} Does not Exist.`)
        }
        else if(resData.data == null && resData.message === "Invalid password"){
          return alert(`Please enter a valid password`)
        }
        else{
          this.clearForm();
          this.router.navigate(['/home']);
          return alert('Login successful: ' + resData.message);
        }
      }
    )
  }
}

