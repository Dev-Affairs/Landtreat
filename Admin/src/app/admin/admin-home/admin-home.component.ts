import { Component } from '@angular/core';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-home',
  standalone: false,
  
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
  homeItems: any = [
    {
      "name": "Add Property",
      "link": "/addProperty",
      "bgColor": "#f1f1f1"
    },
    {
      "name": "Posts",
      "link": "/posts"
    },
    {
      "name": "Saved Lists",
      "link": "/savedLists"
    }
  ]
}
