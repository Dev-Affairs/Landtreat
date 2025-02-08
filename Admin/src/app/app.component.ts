import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private router = inject(Router);
  isAuthRoute: boolean = false;
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd) // ✅ Only listen to navigation changes
    ).subscribe(() => {
      this.isAuthRoute = this.router.url.includes('auth'); // ✅ Check for 'auth' in the URL
    });
  }
  title = 'landtreat_admin';
}
