import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service.client';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: String;
  password: String;
  errorFlag: Boolean;
  errorMsg = 'Invalid username or password!';
  baseUrl = environment.baseUrl;

  constructor(private userService: UserService, private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.errorFlag = false;
  }

  login(username: String, password: String) {
    this.userService
      .login(username, password)
      .subscribe((user) => {
        this.sharedService.user = user;
        this.router.navigate(['/user', user._id]);
      });
  }

  goTofindAsteroid() {
    this.router.navigate(['/searchAsteroids']);
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

  goToImageSearch() {
    this.router.navigate(['/nasa-pic']);
  }

  goToAPOD() {
    this.router.navigate(['/APOD']);
  }



}
