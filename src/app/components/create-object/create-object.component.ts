import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service.client';
import {Router} from '@angular/router';
import {CBService} from '../../services/cb.service.client';
import {CEService} from '../../services/ce.service.client';
import {PubService} from '../../services/pub.service.client';
import {SharedService} from "../../services/shared.service.client";

@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {
  @ViewChild('f') createForm: NgForm;
  objType: String;
  userType: string;
  types = ['User', 'Celestial Body', 'Celestial Event', 'Publication'];
  user = {
    username: '', password: '', email: '', firstName: '',
    lastName: '', DOB: '', phone: '', picture: '', userType: ''
  };
  cb = {name: '', region: '', types: [], wiki: '', picture: ''};
  ce = {name: '', region: '', types: [], wiki: '', picture: '', start: '', end: ''};
  pub = {name: '', authors: [], link: '', abstract: '', tags: [], pubDate: ''};
  errorFlag: Boolean;
  errorMessage: String;
  loggedInUserType: any;

  constructor(private pubService: PubService, private ceService: CEService,
              private cbService: CBService, private router: Router, private userService: UserService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.errorFlag = false;
    this.loggedInUserType = this.sharedService.user['userType'];
  }

  create() {
    if (this.objType === 'User') {
      this.user.username = this.createForm.value.username;
      this.user.password = this.createForm.value.password;
      this.user.email = this.createForm.value.email;
      this.user.firstName = this.createForm.value.firstName;
      this.user.lastName = this.createForm.value.lastName;
      this.user.DOB = this.createForm.value.DOB;
      this.user.phone = this.createForm.value.phone;
      this.user.picture = 'https://upload.wikimedia.org/wikipedia/commons/4/48/Creative-Tail-astronaut.svg';

      this.user.userType = this.userType;
      this.userService.findUserByUsername(this.user.username)
        .subscribe((usr: any) => {
          if(usr !== null) {
            this.errorFlag = true;
            this.errorMessage = 'User already exists!';
          }else {
            this.userService.register(this.user, this.user.password).subscribe((user: any) => {
              alert('User created!');
            });
          }
        });

    } else if (this.objType === 'Cb') {
      this.cb.name = this.createForm.value.cbname;
      this.cb.region = this.createForm.value.region;
      this.cb.types = this.createForm.value.types.split(',');
      this.cb.wiki = this.createForm.value.wiki;
      this.cb.picture = this.createForm.value.picture;
      this.cbService.findCBbyText(this.cb.name)
        .subscribe((cb: any) => {
          if(cb.length !== 0) {
            this.errorFlag = true;
            this.errorMessage = 'Celestial body already exists!';
          } else {
            this.cbService.createCB(this.cb).subscribe((cb: any) => {
              alert('CB created!');
            });
          }
        });
    } else if (this.objType === 'Ce') {
      this.ce.name = this.createForm.value.cename;
      this.ce.region = this.createForm.value.ceregion;
      this.ce.types = this.createForm.value.cetypes.split(',');
      this.ce.wiki = this.createForm.value.cewiki;
      this.ce.picture = this.createForm.value.cepicture;
      this.ce.start = this.createForm.value.cestart;
      this.ce.end = this.createForm.value.ceend;
      this.ceService.findCEbyText(this.ce.name)
        .subscribe((ce: any) => {
          if (ce.length !== 0) {
            this.errorFlag = true;
            this.errorMessage = 'Celestial Event Already Exists!';
          } else {
            this.ceService.createCE(this.ce).subscribe((ce: any) => {
              alert('CE created!');
            });
          }
        });
    } else if (this.objType === 'Pub') {
      this.pub.name = this.createForm.value.pubname;
      this.pub.authors = this.createForm.value.pubauthors.split(',');
      this.pub.tags = this.createForm.value.pubtags.split(',');
      this.pub.abstract = this.createForm.value.pubabstract;
      this.pub.link = this.createForm.value.publink;
      this.pub.pubDate = this.createForm.value.pubdate;


      this.pubService.createPub(this.pub).subscribe((pub: any) => {
        alert('Pub created!');
      });
    } else {
      // console.log('cant make one of those yet');
    }
  }

}
