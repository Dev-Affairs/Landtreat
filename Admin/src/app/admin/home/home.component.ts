import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  homeItems: any = [
    {
      "name": "Properties",
      "link": "/properties",
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
