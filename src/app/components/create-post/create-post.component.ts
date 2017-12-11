import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service.client';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../services/shared.service.client';
import {CBService} from '../../services/cb.service.client';
import {CEService} from '../../services/ce.service.client';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  posterId: String;
  postId: String;
  post: any;
  posts: any[];
  usernameOfPoster: String;
  url: String;
  text: String;
  images: any[];
  width: Number;
  date: Date;
  likes: Number;
  tag: any;
  tags: any[];
  user: any;
  baseUrl = environment.baseUrl;

  constructor(private postService: PostService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService,
              private cbService: CBService,
              private ceService: CEService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.posterId = params['uid'];
    });
    this.user = this.sharedService.user;
    this.usernameOfPoster = this.user.username;
    this.tags = [];

  }

  deleteThisPost(ID) {
    this.postService.deletePost(this.postId)
      .subscribe(() => {
        this.router.navigate(['user/', this.posterId]);
      });
    this.text = null;
  }

  addTag() {
    this.userService.findUserByUsername(this.tag)
      .subscribe((user) => {
        if (user) {
          this.tags.push(this.tag);
          this.tag = null;
        } else {
          this.cbService.findCBbyText(this.tag)
            .subscribe((cb) => {
              if (cb.length > 0) {
                this.tags.push(this.tag);
                this.tag = null;
              } else {
                this.ceService.findCEbyText(this.tag)
                  .subscribe((ce) => {
                    if (ce.length > 0) {
                      this.tags.push(this.tag);
                      this.tag = null;
                    } else {
                      alert('tag not valid');
                      this.tag = null;
                    }
                  });
              }
            });
        }
      });
  }

  createThisPost() {
    this.tags.push(this.usernameOfPoster);
    const newPost = {poster: this.posterId, text: this.text, likes: 0,
      date: new Date(), images: [this.url],  tags: this.tags};
    this.postService.createPost(newPost)
      .subscribe((posts) => {
        // this.posts = posts;
        //   this.router.navigate([this.baseUrl + 'user/', this.posterId]);
        //   this.ngOnInit();
      });
  }


}
