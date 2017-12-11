import { Component, OnInit } from '@angular/core';
import {NasaServiceClient} from '../../services/nasa.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-apodarchive',
  templateUrl: './apodarchive.component.html',
  styleUrls: ['./apodarchive.component.css']
})
export class ApodarchiveComponent implements OnInit {
  result: Object;
  gotResult: Boolean;
  url: URL;
  date: Date;
  result1: Object;
  result2: Object;
  result3: Object;
  result4: Object;

  constructor(private router: Router, private nasaService: NasaServiceClient) {
  }

  ngOnInit() {
    this.nasaService.getAPOD()
      .subscribe((result) => {
        this.result = result;
        this.gotResult = true;
        this.url = result.hdurl;
      });
  }

  goTofindAsteroid() {
    this.router.navigate(['/searchAsteroids']);
  }

  goToImageSearch() {
    this.router.navigate(['/nasa-pic']);
  }

  goToAPODArchive() {
    this.router.navigate(['/APOD/Archive']);
  }
}
