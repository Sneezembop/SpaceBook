import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NasaServiceClient} from '../../services/nasa.service.client';


@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})
export class ApodComponent implements OnInit {
  result: Object;
  gotResult: Boolean;
  url: URL;

  constructor(private router: Router, private nasaService: NasaServiceClient) { }

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
