import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {PostService} from '../../../services/post.service.client';
import {CBService} from '../../../services/cb.service.client';
import {SharedService} from '../../../services/shared.service.client';
import {environment} from '../../../../environments/environment';
import {isUndefined} from 'util';
import {AlbumServiceClient} from '../../../services/album.service.client';
import {CEService} from "../../../services/ce.service.client";

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})

export class PublicProfileComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private postService: PostService,
              private cbService: CBService,
              private sharedService: SharedService,
              private albumService: AlbumServiceClient,
              private ceService: CEService) {
  }

  objType: String;
  objId: String;
  objData = {};
  follows: any[];
  birthday: Boolean;
  DOB: String;
  today = new Date();
  birthdayMsg = 'Happy Birthday!';
  postsInPublicProfile: any[];
  dataReady: boolean;
  user: any;
  sharedServiceUserId: String;
  baseURL = environment.baseUrl;
  currentURL: String;
  flipper: boolean;
  albumid: string;
  albumReady = true;


  ngOnInit() {
    this.albumReady = false;
    this.dataReady = false;
    this.flipper = true;
    this.user = this.sharedService.user;
    this.sharedServiceUserId = this.user._id;
    this.currentURL = window.location.href;
    if (this.currentURL.includes('api/login')) {
      this.flipper = false;
    }
    if (this.user.username === undefined) {
      this.router.navigate([this.baseURL, 'user', this.user._id, 'edit']);
    } else {
      if (this.flipper) {
        this.activatedRoute.params
          .subscribe(
            (params: any) => {
              this.objId = params['uid'];
              this.objType = params['obtype'];
              this.userService.findUserById(this.objId)
                .subscribe((user) => {
                  this.objData = user;
                  this.user = user;
                  this.birthday = false;
                  switch (this.objType) {
                    case 'cb':
                      this.getCBData(this.objId);
                      break;
                    case 'ce':
                      this.getCEData(this.objId);
                      break;
                    case 'user':
                      this.getUserData(this.objId);
                      break;
                    case 'org':
                      this.getUserData(this.objId);
                      break;
                  }
                });
            });
      } else {
        this.flipper = true;
        this.objId = this.user._id;
        this.objType = 'user';
        this.userService.findUserById(this.objId)
          .subscribe((user) => {
          this.objData = user;
            this.getUserData(this.objId);
            this.router.navigate([this.baseURL, 'user', this.objId]);
          });
      }
    }
  }

  editProfile() {
    this.router.navigate(['user/' + this.objId + '/edit']);
  }

  goToUserProfile(objId) {
    this.router.navigate(['user/' + objId]);
    // this.ngOnInit();
  }

  navigateToPost() {
    this.router.navigate(['user/' + this.objId + '/posts/new']);

  }

  search() {
    this.router.navigate(['user/' + this.objId + '/search']);
  }


  getCBData(objId) {
    this.cbService.findCBbyId(this.objId).subscribe((cb: any) => {
      this.objData = cb;
      this.follows = [];
      this.findPostsForNonUserDataByTag();
      this.dataReady = true;
    });
  }

  getCEData(objId) {
    this.ceService.findCEbyId(this.objId).subscribe((ce: any) => {
      this.objData = ce;
      this.follows = [];
      this.findPostsForNonUserDataByTag();
      this.dataReady = true;
    });
  }

  /**
   * Helper function for non-user object's post retrieval by tag.
   */
  findPostsForNonUserDataByTag() {
    this.postService.findPostsbyTag(this.objData['name'])
      .subscribe((posts) => {
        posts = posts.slice(0).reverse();
        this.postsInPublicProfile = posts;
      });
  }


  getUserData(objId) {
    const f = [];
    for (let i = 0; i < this.objData['follows'].length; i++) {
      this.userService.findUserById(this.objData['follows'][i])
        .subscribe((user1: any) => {
          f.push(user1);
        });
      this.follows = f;
    }
    this.findPostsByTagForUser();
    this.prepAlbum();
    this.dataReady = true;
  }

  /**
   * Helper function for getUserData()
   */
  findPostsByTagForUser() {
    this.postService.findPostsbyTag(this.objData['username'])
      .subscribe((posts) => {
        posts = posts.slice(0).reverse();
        this.postsInPublicProfile = posts;
      });
  }

  deleteFollow(objId) {
    for (let i = 0; i < this.follows.length; i++) {
      if (this.follows[i]._id === objId) {
        this.follows.splice(i, 1);
      }
    }
    this.sharedService.user['follows'] = [];
    for(let i = 0; i < this.follows.length; i++) {
      this.sharedService.user['follows'].push(this.follows[i]._id);
    }
    this.userService.updateUser(this.objId, this.sharedService.user)
      .subscribe( (usr: any) => {
      });
  }

  goToAlbums() {
    this.router.navigate(['user/' + this.objId + '/album']);
  }

  ifIdEqualPosterId() {
    return (this.objId === this.sharedServiceUserId);
  }

  logout() {
    this.userService.logout()
      .subscribe((status) => {
        this.router.navigate(['login']);
      });
  }

  /**
   * Still is not able to deal with the bug that if a
   * user has multiple albums and then deletes the first one, otherwise appears to function.
   */
  prepAlbum() {
    if (this.user.albums.length > 0) {
      this.albumid = this.user.albums[0];
      this.albumReady = true;
    }
  }

  isAdmin() {
    return this.sharedService.user['userType'] === 'ADMIN';
  }

  authorized() {
    if (this.sharedService.user['_id'] === this.objId) {
      return true;
    } else if ((this.objType === 'user') && (this.sharedService.isType('ADMIN'))) {
      return true;
    } else if ((this.objType === 'ce') && (this.sharedService.isType('PROFESSIONAL'))) {
      return true;
    } else if ((this.objType === 'cb') && (this.sharedService.isType('ORGANIZATION'))) {
      return true;
    } else {
      return false;
    }
  }

  edit(objId) {
    this.router.navigate(['edit/' + objId]);
  }

  findUsers() {
    this.router.navigate(['admin/user']);
  }

  checkUserType() {
    var user = this.sharedService.user;
    if(user['_id'] !== this.objId || user['userType'] === 'AMATEUR') {
      return false;
    }
    return true;
  }

  checkMatchingId() {
    var user = this.sharedService.user;
    if(user['_id'] !== this.objId) {
      return false;
    }
    return true;
  }



}

