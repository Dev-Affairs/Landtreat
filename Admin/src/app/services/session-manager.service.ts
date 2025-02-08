import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {
  private entryTime!: number; // To store the time when the user enters a route
  private previousUrl: string = ''; // To store the previous URL
  private actions: string[] = []; // To store the actions performed by the user

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
    // Listen for navigation events
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart || event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          // User is navigating away from the current route
          const exitTime = Date.now(); // Time when the user leaves the route
          const timeSpent = (exitTime - this.entryTime) / 1000; // Calculate time spent (in seconds)

          if (this.previousUrl) {
            // Log the time spent on the previous route before moving to the new route
            // this.logRoute(this.previousUrl, timeSpent, this.actions).subscribe(response => {
            //   // console.log('Previous route and actions logged:', response);
            // });
          }
          this.actions = []; // Reset actions for the next route
        } else if (event instanceof NavigationEnd) {
          // User has successfully navigated to the new route
          this.entryTime = Date.now(); // Store the time of entry for the new route
          this.previousUrl = event.urlAfterRedirects; // Set the current URL as the new "previousUrl" for future navigation
        }
      });
  }

  initialize(): Promise<void> {
 // Perform any necessary initialization logic for SessionManager
 
    return new Promise(resolve => {
      console.log('SessionManager initialized');
      resolve();
    });
  }

  // Method to track specific user actions
  trackAction(actionDescription: string) {
    this.actions.push(actionDescription);
  }

  private logRoute(previousUrl: string, timeSpent: number, actions: string[]) {
    return this.http.post('../api/session-logs', {
      previousUrl: previousUrl,   // Previous route
      timeSpent: timeSpent.toFixed(2) + ' seconds', // Time spent on previous route
      actions: actions // List of actions performed on the route
    });
  }
}
