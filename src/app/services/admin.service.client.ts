import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {SharedService} from './shared.service.client';
import {CanActivate, Router} from '@angular/router';
import {UserService} from "./user.service.client";


@Injectable()
export class AdminServiceClient implements CanActivate{
  options: RequestOptions = new RequestOptions();

  constructor(private http: Http, private router: Router, private sharedService: SharedService,
              private userService: UserService) {}
  canActivate() {
    return this.userService.isAdmin();
  }
}
