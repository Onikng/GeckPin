import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class SessionManager {
    private readonly temporaryUserName: string = 'oniking';
    private readonly temporaryPass: string = 'pass';

    performLogin(user: string, password: string): boolean {
        if( user == this.temporaryUserName && password == this.temporaryPass){
            return true;
        }else{
            return false;
        }
    }


    performLogout(){
        //CODE LOGOUT
    }
}