import {Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service.client";
import {SharedService} from "../../../services/shared.service.client";

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.css']
})
export class SearchProfileComponent implements OnInit {
  @Input()
  user: any;
  profilePic: string;
  username: string;
  userId: string;
  originalUserId: String;
  errorFlag: Boolean;
  errorMessage: String;

  constructor(private sharedService: SharedService, private activatedRoute: ActivatedRoute,
              private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.originalUserId = this.sharedService.user['_id'];
      });
    this.profilePic = this.user.picture;
    this.username = this.user.username;
    this.userId = this.user._id;
    this.errorFlag = false;
    this.user = this.sharedService.user;
  }

  addToFollow(userId) {
    if (userId === this.originalUserId) {
      this.errorFlag = true;
      this.errorMessage = 'You cannot follow yourself!';
    } else {
        if(this.sharedService.user['follows'].includes(userId)) {
          this.errorFlag = true;
          this.errorMessage = 'You already follow this user.';
        }else {
          this.sharedService.user['follows'].push(userId);
          this.userService.updateUser(this.originalUserId, this.sharedService.user)
            .subscribe((usr: any) => {
              this.sharedService.user = usr;
              this.router.navigate(['user/' + this.originalUserId]);
            });
        }
    }
  }

  sayHi() {
    if (this.user.username) {
      this.router.navigate(['user/', this.userId]);
    } else {
      const wishToLogin = window.confirm('You must sign in to view this page! Would you like to sign in?');
      if (wishToLogin === true) {
        this.router.navigate(['login']);
      }
    }
  }
}
