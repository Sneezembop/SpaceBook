import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service.client';
import {UserService} from '../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../services/shared.service.client';
import {CEService} from "../../services/ce.service.client";
import {CBService} from "../../services/cb.service.client";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {

  @Input()
  ID: String;
  post: any;
  poster: any;
  text: String;
  images: any[];
  tags: any[];
  date: Date;
  likes: Number;
  userId: String;
  user: any;


  constructor(private postService: PostService,
              private sharedService: SharedService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private ceService: CEService,
              private cBService: CBService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
    });
      this.postService.findPostbyId(this.ID)
        .subscribe((post) => {
          this.post = post;
          this.poster = post.username;
          this.images = post.images;
          this.text = post.text;
          this.tags = post.tags;
          this.date = post.date;
          this.likes = post.likes;
        });
      // }
  }

  likeThisPost() {
    this.post.likes++;
    this.postService.updatePost(this.ID, this.post)
      .subscribe((post) => {
      this.ngOnInit();
      // this.router.navigate(['user/' + this.userId]);
        // this.post = post;
      });
  }

  deletePost(user) {
    if (user === this.post.poster) {
      // SPLICE This stuff
      this.postService.deletePost(this.ID)
        .subscribe((post) => {
          this.post = post;
          this.ngOnInit();
        });
    } else {
      alert('You are not the original poster');
    }
  }


  //
  // removeMyTag() {
  //   for (let i = 0; i < this.tags.length; i++) {
  //     if (this.tags[i] = user.username)
  //   }
  //
  // }

  navigateToTag(name) {
    this.userService.findUserByUsername(name)
      .subscribe((user) => {
        if (user) {
          this.router.navigate(['user/' + user._id]);
        } else {
          this.ceService.findCEbyText(name)
            .subscribe((ce) => {
              if (ce.length > 0) {
                this.router.navigate(['ce/', ce[0]._id]);
              } else {
                this.cBService.findCBbyText(name)
                  .subscribe((cb) => {
                    if (cb.length > 0) {
                      this.router.navigate(['cb/', cb[0]._id]);
                    }
                  });
              }
            });
        }
      });
  }

  ifIdEqualPosterId() {
    return (this.userId === this.user._id);
  }

  removeMyTag() {
    const postition = this.post.tags.indexOf(this.user.username);
    this.tags.splice(postition, 1);
    this.post.tags = this.tags;
    if (this.tags.length === 0) {
      this.postService.deletePost(this.ID)
        .subscribe((posts) => {
        });
    } else {
      this.postService.updatePost(this.ID, this.post)
        .subscribe((post1) => {
          this.post = post1;
          this.ngOnInit();
        });
    }
  }

  //
  // findPostsByTag(ID) {
  //   this.postService.findPostsbyTag(this.ID)
  //     .subscribe((posts) => {
  //       this.post = posts;
  //     });
  // }
  //
  // findPostsByTags(any) {
  //   this.postService.findPostsbyTags(any)
  //     .subscribe((post) => {
  //       this.post = post;
  //     });
  // }

}
