import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppAuthLoginService{
    constructor(private http: HttpClient){}
    status:any=null;
    login(loginData: any){
        return this.http.post('http://localhost:3005/api/loginvalidate', loginData);
    }
}
