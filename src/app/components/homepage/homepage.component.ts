import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service.client';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user = {};
  loggedIn: Boolean;
  userId: String;

  constructor(private sharedService: SharedService, private activatedRoute: ActivatedRoute, private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = this.sharedService.user['_id'];
          this.userService.loggedIn()
            .subscribe((bool: any) => {
              this.loggedIn = bool;
            });
        });
  }

  continueToSpaceBook() {
    if(this.loggedIn) {
      this.router.navigate(['/user/' + this.userId]);
    }else {
      this.router.navigate(['/login']);
    }
  }

}
