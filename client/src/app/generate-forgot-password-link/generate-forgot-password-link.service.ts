import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GenerateForgotPasswordLinkService{
    constructor(private http: HttpClient){}
    RequestResetPasswordLink(useremail: any){
        return this.http.post('http://localhost:3005/api/requestResetPassword', useremail);
    }
}
