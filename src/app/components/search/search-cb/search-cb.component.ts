import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CBService} from '../../../services/cb.service.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-search-cb',
  templateUrl: './search-cb.component.html',
  styleUrls: ['./search-cb.component.css']
})
export class SearchCbComponent implements OnInit {

  @Input()
  cb: any;
  picture: string;
  name: string;
  cbId: string;
  originalUserId: String;
  errorFlag: Boolean;
  errorMessage: String;
  user: any;

  constructor(private activatedRoute: ActivatedRoute, private cbService: CBService, private router: Router,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.originalUserId = params['uid'];
      });
    this.picture = this.cb.picture;
    this.name = this.cb.name;
    this.cbId = this.cb._id;
    this.errorFlag = false;
  }

  sayHi() {
    if (this.user.username) {
      this.router.navigate(['cb/', this.cbId]);
    } else {
      const wishToLogin = window.confirm('You must sign in to view this page! Would you like to sign in?');
      if (wishToLogin === true) {
        this.router.navigate(['login']);
      }
    }
  }



}
