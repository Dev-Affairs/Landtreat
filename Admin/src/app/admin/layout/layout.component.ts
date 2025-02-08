import { Component } from '@angular/core';
import { faEye, faChartPie, faGear, faSliders, faUserPen, faSquareRss, faHouse, faContactBook} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  standalone: false,
  
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  open: boolean = true; // Controls the sidebar state

  toggleSidebar() {
    this.open = !this.open; // Toggles the sidebar state
  }
  showPassIcon:any = faEye

  menuOptions = [
    {
      "name": "Home",
      "link": "/admin/home",
      "icon": faHouse
    },
    // {
    //   "name": "Dashboard",
    //   "link": "/admin/dashboard",
    //   "icon": faChartPie
    // },
    {
      "name": "Landing Page",
      "link": "/admin/landingConfig",
      "icon": faSliders
    }
  ]
}
