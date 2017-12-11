import { Component, OnInit } from '@angular/core';
import {CEService} from '../../../services/ce.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-edit-celestial-event-object',
  templateUrl: './edit-celestial-event-object.component.html',
  styleUrls: ['./edit-celestial-event-object.component.css']
})
export class EditCelestialEventObjectComponent implements OnInit {
  ceId: String;
  name: String;
  region: String;
  types = [];
  wiki: String;
  picture: String;
  start: String;
  end: String;
  ce = {};

  // name: String,
  // region: String,
  // types: [String],
  // wiki: String,
  // verified: Boolean,
  // picture: String,
  // start: Date,
  // end: Date

  constructor(private ceService: CEService, private router: Router, private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        // this.ceId = '5a2dc1d485be02065cc2f846';
        this.ceId = params['objId'];
      });
    this.ceService.findCEbyId(this.ceId)
      .subscribe((ce: any) => {
        this.ce = ce;
        this.name = ce['name'];
        this.region = ce['region'];
        this.types = ce['types'];
        this.wiki = ce['wiki'];
        this.picture = ce['picture'];
        this.start = ce['start'];
        this.end = ce['end'];
      });
  }

  deletecb() {
    this.ceService.deleteCE(this.ceId)
      .subscribe((status: any) => {
        this.router.navigate(['user/' + this.sharedService.user['_id']]);
      });
  }

  commit(name, region, types, wiki, picture, start, end) {
    const ce = {name: name, region: region, types: types, wiki: wiki, picture: picture, start: start, end: end};
    console.log('UPDATED', ce);
    this.ceService.updateCE(this.ceId, ce)
      .subscribe((status: any) => {
        console.log(status);
        this.router.navigate(['ce/' + this.ceId]);
      });
  }

}
