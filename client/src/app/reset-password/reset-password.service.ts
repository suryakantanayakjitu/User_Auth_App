import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class ResetPasswordService {
    token: any;
    constructor(private http: HttpClient) { }
    resetPassword(passwordData : any){
        return this.http.post(`http://localhost:3005/api/reset-password/`,passwordData)
    }
}
