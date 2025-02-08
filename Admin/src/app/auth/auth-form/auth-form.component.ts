import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonService } from '../../services/common-service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faEyeSlash, faPencil} from '@fortawesome/free-solid-svg-icons';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-auth-form',
  standalone: false,
  
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent implements OnInit{

  constructor(
        public commonService: CommonService,
        public authService: AuthService,
        private http: HttpClient,
        private route: ActivatedRoute, private router: Router,
            public configService: ConfigService
        
  ) { 
  }
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){ 
      this.router.navigate(['/admin'])
    }
    if(this.route.snapshot.queryParams['returnUrl']){
      this.redirectUrl = this.route.snapshot.queryParams['returnUrl']
    }
  }
  showPassIcon:any = faEye
  hidePassIcon:any = faEyeSlash
  editIcon:any = faPencil
  
  redirectUrl:string | undefined;
  otpTimerMinutes:number = 5
  otpTimerSeconds:number = 0
  termsAndPolicesAccepted: boolean = false
  OTPexpired:boolean = false
  remeberMyLogin: boolean = false
  defaultLogInOption: string = 'loginWith_password'
  defaultModalTitle: string = 'Login To Landtreat'
  authActiveFormName: String = this.defaultLogInOption;
  isMailValid:boolean = true
  isSignupMailValid:boolean = true
  showOTPInput:boolean = false
  // editIcon:any = faPencil
  isCheckConfirmPass:boolean = false
  // showPassIcon:any = faEye
  // hidePassIcon:any = faEyeSlash
  isPassVissible:boolean = false
  passwordType:any = 'password'
  loginPasswordType:any = 'password'
  isLoginPasswordVisible:boolean = false 
  resetPasswordType:any = 'password'
  isResetPasswordVisible:boolean = false
  signupPasswordType:any = 'password'
  isSignupPasswordVisible:boolean = false

  public signUpForm: any = {

  }

  public logInForm: any = {

  }

  modalTitle: string = 'Login To Landtreat'

  onEditEmailInput(){
    this.showOTPInput = false
   }
 
   // togglePasswordVisibility(){
   //  this.isPassVissible = !this.isPassVissible
 
   //  if (!this.isPassVissible) {
   //   this.passwordType = 'password'
   //  }else{
   //    this.passwordType = 'text'
   //  }
   // }
 
   togglePasswordVisibility(formName:any){
     console.log(formName)
     if (formName == 'loginWith_password') {
       this.isLoginPasswordVisible = !this.isLoginPasswordVisible
       if (!this.isLoginPasswordVisible) {
         this.loginPasswordType = 'password'
       } else {
         this.loginPasswordType = 'text'
       }
     }else if (formName == 'changePassword') {
       this.isResetPasswordVisible = !this.isResetPasswordVisible
       if (!this.isResetPasswordVisible) {
         this.resetPasswordType = 'password'
       } else {
         this.resetPasswordType = 'text'
       }
     }else if (formName == 'signUp') {
       this.isSignupPasswordVisible = !this.isSignupPasswordVisible
       if (!this.isSignupPasswordVisible) {
         this.signupPasswordType = 'password'
       } else {
         this.signupPasswordType = 'text'
       }
     }
   }
 
   onSubmitSignUpForm(){
 if (!this.signUpForm["email"]) {
   Swal.fire({
     text:"Please provide your mail",
     icon:"warning"
   })
 } else {
     console.log("on submit sign up form --", this.signUpForm)
 
     this.commonService.startBlockUI("Block UI Started")
 
 
 
     this.authService.trySignUp(this.signUpForm).subscribe(
       (signUpRes: any) => {
         console.log("sign up response --", signUpRes);
         this.commonService.stopBlockUI()
         if (signUpRes.success) {
           Swal.fire({
             title: "Successfully registered.",
             text: "Congratulations! You have been successfully registered with Land Treat. Please click on the verification link sent to your email.",
             icon: "success"
           });
           //this.activeModal.close();333;
         }
       },
       (error: any) => {
         console.error("Error during sign up --", error);
         Swal.fire({
           title: "Failed to register",
           text: error.error.msg,
           icon: "error"
         });
         this.commonService.stopBlockUI()
       }
     );
   }
   }
 
   onShowLogInForm(){
     this.authActiveFormName = this.defaultLogInOption
     this.modalTitle = this.defaultModalTitle
     this.remeberMyLogin = this.authService.autoFillCredentials(this.logInForm)
   }
 
   onShowSignUpForm(){
     this.authActiveFormName = 'signUp'
     this.modalTitle = 'Sign Up To Landtreat'
   }
   disableBtn(){
     if (this.logInForm["email"] === '') {
       return true
     }else{
        return false
     }
   }
 
   onConfirmPassFocus(){
   this.isCheckConfirmPass = true
   }
 
   onSumitLogInWithPassForm(){
     if (!this.logInForm["email"]) {
       Swal.fire({
         text:"Please provide your mail",
         icon:"warning"
       })
     } else {
     this.commonService.startBlockUI("Block UI Started")
     this.authService.login(this.logInForm).subscribe((logInRes: any)=>{
       console.log("logInRes pointer--", logInRes)
       this.commonService.stopBlockUI()
       if(logInRes.success && logInRes.authResult && logInRes.isVerified){
         if(this.remeberMyLogin){
           this.authService.storeCredentials(this.logInForm.email, this.logInForm.password)
         }
         

         this.authService.currentUser.subscribe((userData) => {
          let currentUser = userData ?  userData.user : null;
          console.log("this.currentUser--", currentUser.role)
          if(currentUser.role === 'admin'){
            const returnUrl = this.redirectUrl || '/admin';
            this.router.navigate([returnUrl]);
          }
          else{
            if(this.redirectUrl){
              const returnUrl = this.redirectUrl
              this.router.navigate([returnUrl]);
            }
            else{
              window.open(this.configService.get("Main_Site_Url") , "_self")
            }
          }
        });
       }
       else if(logInRes.success && !logInRes.authResult && logInRes.msg === 'Invalid Credentials'){
         Swal.fire({
           title: "Error",
           text: "Invalid credentials.",
           icon: "error"
         })
       }
       else if(logInRes.success && !logInRes.authResult && logInRes.msg === 'user not found'){
         Swal.fire({
           title: "Error",
           text: "This email is not registered with Landtreat, please sign up and then proceed",
           icon: "info"
         })
         this.authActiveFormName = 'signUp'
         this.modalTitle = 'Sign Up To Landtreat'
       }
     })
     }
   }
 
   verifyOTP(){
     delete this.logInForm["otpExpiration"] 
     console.log(this.logInForm,"test here --  now")
     if (!this.logInForm['otpInput']) {
       Swal.fire({
         text:"Please enter the OTP then proceed",
         icon:"warning"
       })
     } else {   
     this.http.post(this.configService.get("API_BASE_URL") + "api/verify-otp",this.logInForm).subscribe((res:any) => {
       console.log(res)
       if (!res.isMatch) {
         Swal.fire({
           title: "Error",
           text: "Invalid OTP",
           icon: "error"
         })
       }else{
         if (res.isExpired) {
           Swal.fire({
             title: "Error",
             text: "OTP expired",
             icon: "error"
           })
           this.OTPexpired = true
         } else {
           // console.log(this.authActiveFormName,"testing here right now --")
           if (this.authActiveFormName === 'loginWith_otp') {
 // console.log(this.logInForm)
             this.logInForm['password'] = ''
             this.logInForm['loginWithOtp'] = true
             this.authService.login(this.logInForm).subscribe((response:any) => {
               console.log(response)
               //this.activeModal.close();333
               this.commonService.reloadWindow()
             })
             
           } else if(this.authActiveFormName === 'send-reset-pass-url'){
 this.logInForm['password'] = ''
             console.log(this.logInForm,res)
             this.authActiveFormName = 'changePassword'
             this.modalTitle = 'Enter your new password'
             console.log("reset pass verify OTP works",this.logInForm)
           }
         }
 }
     }),
     (error:any) => {
 console.log(error)
       }
     }
 
   }
 
   onSubmitResetPass(){
     this.authService.requestForgetPass(this.logInForm).subscribe((res:any) => {
       if (res.success) {
         Swal.fire({
           title:"Password reset successful !",
           text:"Congratulations your password has been sucessfully changed !",
           icon:"success"
         })
         this.authActiveFormName = 'loginWith_password'
         this.logInForm['password'] = ''
       }
     })
   }
 
   checkConfirmPass(){
     if (this.logInForm['password'] === this.logInForm['confirmPassword']) {
       console.log('match')
       this.isCheckConfirmPass = false
     } else {
       console.log('not match')
       this.isCheckConfirmPass = true
     }
   }
 
   onShowLoginWithOtpForm(){
     this.authActiveFormName = 'loginWith_otp'
   }
 
   onShowLoginWithPasswordForm(){
     this.authActiveFormName = 'loginWith_password'
   }
 
   onSendOtpClick(){
     if (!this.logInForm["email"]) {
       Swal.fire({
         text:"Please provide your mail",
         icon:"warning"
       })
     } else {
     console.log(this.logInForm)
     this.commonService.startBlockUI("Block UI Started")
     let otpExpiration = this.convertToMilliseconds()
     this.logInForm["otpExpiration"] = otpExpiration
   console.log(this.logInForm,"this is a login form")
     this.http.post(this.configService.get("API_BASE_URL") + 'api/generate-otp',this.logInForm).subscribe((res:any) => {
       console.log(res,"inside onsendotp click")
       this.commonService.stopBlockUI()
       if (res.success) {
         if (res.resTitle === "not-registered") {
           Swal.fire({
             title: "This email is not registered with Landtreat, please sign up and then proceed",
               text: res.message,
               icon: "info"
           })
           this.authActiveFormName = 'signUp'
           this.modalTitle = 'Sign Up To Landtreat'
         }else if (res.resTitle === "not-verified") {
           Swal.fire({
             title: "OTP sent succesfully",
               text: res.message,
               icon: "info"
           })
         }
         else{
           console.log(res)
           Swal.fire({
             title: "OTP sent succesfully",
               text: "An OTP has been sent to you please check your mail",
               icon: "success"
           })
     // this.authActiveFormName = 'login_otp'
         }
       }
     }),
     (error:any) => {
       console.log(error,"line 173")
     }
   }
   }
 
   checkValidEmail(){
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(this.signUpForm['email']){
       let isValidEmail = emailRegex.test(this.signUpForm['email'])
       console.log("isValidEmail-", isValidEmail)
       this.isSignupMailValid = isValidEmail
     }else{
       this.isSignupMailValid = true
     }
     if(this.logInForm['email']){
       let isValidEmail = emailRegex.test(this.logInForm['email'])
       console.log("isValidEmail-", isValidEmail)
       this.isMailValid = isValidEmail
     }else{
       this.isMailValid = true
     }
   }
 
   checkPassword(){
     if(this.signUpForm['password'] && this.signUpForm['confirmPassword']){
     }
   }
 
   test(){
     console.log(this.logInForm,"debugger here --")
   }
   onSubmitForgotPass(){
     if (!this.logInForm["email"]) {
       Swal.fire({
         text:"Please provide your e-mail",
         icon:"warning"
       })
     }else{
 this.commonService.startBlockUI('')
     let otpExpiration = this.convertToMilliseconds()
     this.logInForm["otpExpiration"] = otpExpiration
     console.log(this.logInForm,"this is a login form")
       this.http.post(this.configService.get("API_BASE_URL") + 'api/generate-otp',this.logInForm).subscribe((res:any) => {
         console.log(res,"inside onsendotp click")
       this.commonService.stopBlockUI()
         if (res.success) {
           if (res.resTitle === "not-registered") {
             Swal.fire({
               title: "E-mail not registered",
                 text: res.message,
                 icon: "error"
             })
           }else if (res.resTitle === "not-verified") {
             Swal.fire({
               title: "OTP sent succesfully",
                 text: res.message,
                 icon: "info"
             })
           }
           else{
             console.log(res)
             Swal.fire({
               title: "OTP sent succesfully",
                 text: "An OTP has been sent to you please check your mail",
                 icon: "success"
             })
             this.showOTPInput = true
       // this.authActiveFormName = 'login_otp'
           }
         }
       })
 
     }
     console.log(this.logInForm,"inside submit forgot pass --")
   }
 
   convertToMilliseconds():number{
     let minutes = Math.floor(this.otpTimerMinutes) * (1000 *60)
     let seconds = Math.floor(this.otpTimerSeconds)*1000
     let otpExpiration = minutes + seconds
 
     return otpExpiration
   }
   onForgetPassword(){
   this.authActiveFormName = 'send-reset-pass-url',
   this.modalTitle = 'Recover your password'
   }
}
