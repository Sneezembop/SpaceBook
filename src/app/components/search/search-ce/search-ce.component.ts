import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CBService} from '../../../services/cb.service.client';
import {CEService} from '../../../services/ce.service.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-search-ce',
  templateUrl: './search-ce.component.html',
  styleUrls: ['./search-ce.component.css']
})
export class SearchCeComponent implements OnInit {


  @Input()
  ce: any;
  picture: string;
  name: string;
  ceId: string;
  originalUserId: String;
  errorFlag: Boolean;
  errorMessage: String;
  user: any;

  constructor(private activatedRoute: ActivatedRoute,
              private ceService: CEService, private router: Router,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.originalUserId = params['uid'];
      });
    this.picture = this.ce.picture;
    this.name = this.ce.name;
    this.ceId = this.ce._id;
    this.errorFlag = false;
  }

  sayHi() {
    if (this.user.username) {
      this.router.navigate(['ce/', this.ceId]);
    } else {
      const wishToLogin = window.confirm('You must sign in to view this page! Would you like to sign in?');
      if (wishToLogin === true) {
        this.router.navigate(['login']);
      }
    }
  }


}
