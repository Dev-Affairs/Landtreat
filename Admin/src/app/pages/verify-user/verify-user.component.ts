import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrl: './verify-user.component.scss'
})
export class VerifyUserComponent {

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router,private authService: AuthService) {}

  redirectionTimer:number = 4

  ngOnInit(): void {
    // Extract the UID from the query parameters
    this.route.queryParams.subscribe(params => {
      const uid = params['UID'];  // 'UID' matches the query parameter name

      if (uid) {
        // Send the POST request with UID to the backend server
        console.log(uid,"This is unique Identifier")
        this.sendPostRequest(uid);
      }

    });
  }

  sendPostRequest(uid: string) {
    const postUrl = '../api/verifyUser'; // Replace with your server URL

    // Send POST request with UID
    this.http.post(postUrl, { UID: uid })
      .subscribe(response => {
        console.log('Response from server dcwqiodhwdioqw owdqdpqwjdop qdqd pointer here:', response);
        if (response) {
          setInterval(() => {
           this.redirectionTimer -= 1
          },1000)
             setTimeout(() => {
          this.router.navigate(["/"])
          this.authService.clearStoredCredentials()
          this.router.navigate(['/auth'])
             }, 4000);
        }
      }, error => {
        console.error('Error from server:', error);
      });
  }
}
