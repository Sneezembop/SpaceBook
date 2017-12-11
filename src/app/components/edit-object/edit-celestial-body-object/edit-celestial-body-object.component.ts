import { Component, OnInit } from '@angular/core';
import {CBService} from "../../../services/cb.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service.client";

@Component({
  selector: 'app-edit-celestial-body-object',
  templateUrl: './edit-celestial-body-object.component.html',
  styleUrls: ['./edit-celestial-body-object.component.css']
})
export class EditCelestialBodyObjectComponent implements OnInit {

  constructor(private cbService: CBService, private router: Router, private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) { }
  cbId: String;
  cb = {};
  cbName: String;
  cbRegion: String;
  cbTypes = [];
  cbWikiLink: String;
  cbPictureURL: String;
  // name: String,
  // region: String,
  // types: [String],
  // wiki: String,
  // verified: Boolean,
  // picture: String

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        // this.cbId = params['objId'];
        this.cbId = "5a2daeefc3dba628bc2a5414";
      });
    this.cbService.findCBbyId(this.cbId)
      .subscribe((cb: any) => {
        this.cb = cb;
        this.cbName = cb['name'];
        this.cbRegion = cb['region'];
        this.cbTypes =  cb['types'];
        this.cbWikiLink = cb['wiki'];
        this.cbPictureURL = cb['picture'];
      });
  }

  deletecb() {
    this.cbService.deleteCB(this.cbId)
      .subscribe((status: any) => {
        this.router.navigate(['user/' + this.sharedService.user['_id']]);
      });
  }

  commit(name, region, types, wiki, picture) {
    const cb = {name: name, region: region, types: types, wiki: wiki, picture: picture};
    console.log('UPDATED', cb);
    this.cbService.updateCB(this.cbId, cb)
      .subscribe((status: any) => {
        console.log(status);
        this.router.navigate(['cb/' + this.cbId]);
      });
  }

}
