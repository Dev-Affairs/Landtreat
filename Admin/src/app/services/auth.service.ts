import { Injectable, ViewChild } from '@angular/core';
// import { AuthModalComponent } from '../components/auth-modal/auth-modal.component';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
// import { SearchFilterModalComponent } from '../components/search-filter-modal/search-filter-modal.component';
import Swal from 'sweetalert2';
// import { RequestPriceModalComponent } from '../components/request-price-modal/request-price-modal.component';
// import { RequestCallbackComponent } from '../components/request-callback/request-callback.component';
import { CommonService } from './common-service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    // private modalService: NgbModal,
    public http: HttpClient,
    public jwtHelper: JwtHelperService,
    public router: Router,
    private commonService: CommonService,
    public configService: ConfigService
  ){
    const token = localStorage.getItem('token');
    this.currentUserSubject = new BehaviorSubject<any>(token ? this.decodeToken(token) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public serverUrl : string = "../"
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private secretKey: string = 'landtreat2024-01';
  // openAuthModal(): void {
  //   this.modalService.open(AuthModalComponent, { size: 'md' }).result.then(
  //   );
  //   }
  //   openTest(): void {
  //     this.modalService.open(SearchFilterModalComponent, { size: 'md' }).result.then(
  //   );
  // }

    trySignUp(formData: any){
      return this.http.post(this.configService.get("API_BASE_URL") + 'api/auth/signup', formData)
    }

    tryLogIn(formData: any){
      return this.http.post(this.configService.get("API_BASE_URL") + 'api/auth/login', formData)
    }

    login(credentials: any): Observable<any> {
      return this.http.post(this.configService.get("API_BASE_URL") + 'api/auth/login', credentials)
      .pipe(map((response: any) => {
        if (response.success && response.authResult &&  response.token && response.isVerified) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userInfo', JSON.stringify(this.decodeToken(response.token)));
            this.currentUserSubject.next(this.decodeToken(response.token));
            
          }else if(!response.isVerified && response.authResult && response.success){
            Swal.fire({
              title: "Action required",
              text: "Dear, user please verify your e-mail by clicking on the link sent to your mail",
              icon:"info"
            })
            // this.activeModal.close()
          }
          return response;
        }));
    }

    updateUserRole(UID: string, role: string): Observable<any> {
      return this.http.post(this.configService.get("API_BASE_URL") + 'api/auth/updateUserRole', {
        UID, role
      })
      .pipe(map((response: any) => {
        console.log("guqsdgqbduq ooqujdwqldjwqoduwqd9 diqdiqdoq2jd this is to grab your attention",response)
        if (response.success &&  response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userInfo', JSON.stringify(this.decodeToken(response.token)));
            this.currentUserSubject.next(this.decodeToken(response.token));
          }
          return response;
        }));
    }

    requestForgetPass(mail:any){
      return this.http.post(this.configService.get("API_BASE_URL") + 'api/auth/reset-password',mail)
    }


    register(formData: any): Observable<any> {
      return this.http.post(this.configService.get("API_BASE_URL") + 'api/auth/signup', formData)
        .pipe(map((response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.currentUserSubject.next(this.decodeToken(response.token));
          }
          return response;
        }));
    }

    logout() {
      this.commonService.updateUserProfileMenuState(false)
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      this.currentUserSubject.next(null);
      this.router.navigate(['/'])
    }

    clearLocalStorageData(){
     if (!this.isAuthenticated()) {
      if (localStorage.getItem("token") || localStorage.getItem("userInfo")) {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        this.currentUserSubject.next(null)
      }
     }
    }

    public get currentUserValue() {
      return this.currentUserSubject.value;
    }

    isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      return token != null && !this.jwtHelper.isTokenExpired(token);
    }

    decodeToken(token: string) {
      console.log("token--", token)
      console.log("decodeToken--", this.jwtHelper.decodeToken(token))
      return this.jwtHelper.decodeToken(token);
    }

    storeCredentials(email: string, password: string): void {
      console.log('storeCredentials---', email, " ",  password)
      try {
        const encryptedEmail = CryptoJS.AES.encrypt(email, this.secretKey).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(password, this.secretKey).toString();

        localStorage.setItem('rememberMeEmail', encryptedEmail);
        localStorage.setItem('rememberMePassword', encryptedPassword);

      } catch (error) {
        console.log("error storing cred--", error)
      }
    }

    clearStoredCredentials(): void {
      localStorage.removeItem('rememberMeEmail');
      localStorage.removeItem('rememberMePassword');
    }

    autoFillCredentials(logInForm: any){
      const encryptedEmail = localStorage.getItem('rememberMeEmail');
      const encryptedPassword = localStorage.getItem('rememberMePassword');
      console.log("encryptedEmail-", encryptedEmail)
      console.log("encryptedPassword-", encryptedPassword)
      if (encryptedEmail && encryptedPassword) {
        try {
          const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, this.secretKey).toString(CryptoJS.enc.Utf8);
          const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, this.secretKey).toString(CryptoJS.enc.Utf8);

          logInForm['email'] = decryptedEmail
          logInForm['password'] = decryptedPassword
          // .patchValue({
          //   email: decryptedEmail,
          //   password: decryptedPassword,
          //   rememberMe: true
          // });
          return true
        } catch (error) {
          console.error('Error decrypting credentials:', error);
          this.clearStoredCredentials();
          return false
        }
      }
      else{
        return false
      }
    }
}
