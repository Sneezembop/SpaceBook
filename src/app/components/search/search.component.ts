import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service.client';
import {PostService} from '../../services/post.service.client';
import {NasaServiceClient} from '../../services/nasa.service.client';
import {CBService} from '../../services/cb.service.client';
import {SharedService} from '../../services/shared.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {CEService} from '../../services/ce.service.client';
import {PubService} from '../../services/pub.service.client';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;
  searchparam: string;
  searchResult: any;
  userResult = [];
  cbResult = [];
  ceResult = [];
  pubResult = [];
  postResult = [];
  nasaResult = [];
  searchResultString = '';
  peopleReady = false;
  nasaReady = false;
  postReady = false;
  cbReady = false;
  ceReady = false;
  pubReady = false;
  userId: String;
  user: any;

  constructor(private ceService: CEService, private cbService: CBService,
              private postService: PostService, private pubService: PubService,
              private nasaService: NasaServiceClient, private userService: UserService,
              private router: Router,
              private activateRoute: ActivatedRoute, private sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user._id;

  }

  search(param: string) {
    this.searchResultString = '' ;
    this.userResult = [];
    this.searchparam = param;
    this.userService.findUserByUsername(param).subscribe((response: any) => {
      if (response != null) {
      this.userResult.push(response);
      this.peopleReady = true;
      }
    });
      this.nasaService.searchImg(param).subscribe((imgresponse: any) => {
        if (imgresponse != null) {
          this.nasaResult = imgresponse.collection.items;
          this.searchResultString += JSON.stringify(imgresponse) + '&nbsp&nbsp';
          this.nasaReady = true ;
        }
      });
    this.cbService.findCBbyText(param).subscribe((response: any) => {
      if (response != null) {
        this.cbResult = response;
        this.cbReady = true;
      }
    });
    this.ceService.findCEbyText(param).subscribe((response: any) => {
      if (response != null) {
        this.ceResult = response;
        this.ceReady = true;
        const temp = response.length;
      }
    });
    this.pubService.findPubbyText(param).subscribe((response: any) => {
      if (response != null ) {
        this.pubResult = response;
        this.pubReady = true;
        const temp = response.length;
      }
    });

  }

  goToProfile() {
    this.router.navigate(['user/' + this.userId]);
  }

}
