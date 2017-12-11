import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service.client";
import {CBService} from "../../services/cb.service.client";
import {CEService} from "../../services/ce.service.client";
import {PubService} from "../../services/pub.service.client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-object',
  templateUrl: './edit-object.component.html',
  styleUrls: ['./edit-object.component.css']
})
export class EditObjectComponent implements OnInit {
  objectId: String;
  objectType: String;

  constructor(private userService: UserService,
              private cbService: CBService,
              private ceService: CEService,
              private pubService: PubService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.objectId = params['objId'];
      });
    if (this.userService.findUserById(this.objectId) !== null) {
      this.objectType = 'User';
    } else if (this.cbService.findCBbyId(this.objectId) !== null) {
      this.objectType = 'Celestial Body';
    } else if (this.ceService.findCEbyId(this.objectId) !== null) {
      this.objectType = 'Celestial Event';
    } else if (this.pubService.findPubbyId(this.objectId) !== null) {
      this.objectType = 'Publication';
    }
  }

}
