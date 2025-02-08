import { Component, OnInit } from '@angular/core';
import { faEye, faChartPie, faGear, faSliders, faUserPen, faSquareRss, faHouse, faContactBook} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  constructor(
    public authService: AuthService,
    private router: Router
  ){

  }

  currentUser: any
ngOnInit(): void {
  this.authService.currentUser.subscribe((userData) => {
    this.currentUser = userData ?  userData.user : null;
    console.log("this.currentUser--", this.currentUser)
  });
}
faSliders = faSliders;


showUserProfileModal: Boolean = false

onClickLogOut(){
  this.showUserProfileModal = false
  this.authService.logout()
}

onAdmin(){
  this.router.navigate(['/admin']);
}

onClickNavLogo(){
  window.open("http://landtreat.com", "_self")
}
}
