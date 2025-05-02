import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppAuthSignupService{
    constructor(private http: HttpClient){}

    signup(userData: any){
        return this.http.post('http://localhost:3005/api/signUp', userData);
    }
}
