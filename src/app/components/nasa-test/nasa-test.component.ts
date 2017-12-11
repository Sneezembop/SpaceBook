import { Component, OnInit } from '@angular/core';
import {NasaServiceClient} from '../../services/nasa.service.client';

@Component({
  selector: 'app-nasa-test',
  templateUrl: './nasa-test.component.html',
  styleUrls: ['./nasa-test.component.css']
})
export class NasaTestComponent implements OnInit {
  asteroidId: String;
  result: Object;
  gotResult: Boolean;
  asteroidName: String;
  absolute_magnitude_h: Number;
  nasa_jpl_url: String;
  is_potentially_hazardous_asteroid: Boolean;
  orbital_data: {};
  close_approach_data: {};
  estimated_diameter: {};

  // orbital_data
  aphelion_distance: String;
  ascending_node_longitude: String;
  eccentricity: String;
  epoch_osculation: String;
  equinox: String;
  inclination: String;
  jupiter_tisserand_invariant: String;
  mean_anomaly: String;
  mean_motion: String;
  minimum_orbit_intersection: String;
  orbit_determination_date: String;
  orbit_id: String;


  searchAsteroid(asteroidId: String) {
    this.nasaService.searchAsteroid(asteroidId)
      .subscribe((result) => {
        this.asteroidId = asteroidId;
        this.result = result;
        this.gotResult = true;
        this.asteroidName = result.name;
        this.absolute_magnitude_h = result.absolute_magnitude_h;
        this.estimated_diameter = result.estimated_diameter;
        this.nasa_jpl_url = result.nasa_jpl_url;
        this.orbital_data = result.orbital_data;
        this.close_approach_data = result.close_approach_data;
        this.is_potentially_hazardous_asteroid = result.is_potentially_hazardous_asteroid;
        console.log(result);
        console.log(this.orbital_data);
      });
    console.log(this.asteroidId);
  }
  constructor(private nasaService: NasaServiceClient) { }

  ngOnInit() {
    this.gotResult = false;
  }

}
