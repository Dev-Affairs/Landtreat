import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-landing',
  standalone: false,
  
  templateUrl: './admin-landing.component.html',
  styleUrl: './admin-landing.component.scss'
})
export class AdminLandingComponent {
  open: boolean = true; // Controls the sidebar state

  toggleSidebar() {
    this.open = !this.open; // Toggles the sidebar state
  }
}
