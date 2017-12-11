import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';


@Injectable()

export class PostService {
  constructor(private http: Http) {}
  baseURL = environment.baseUrl;
  api = {
    'createPost'   : this.createPost,
    'findPostbyId' : this.findPostbyId,
    'findPostsbyTags': this.findPostsbyTags,
    'findPostsbyTag' : this.findPostsbyTag,
    'updatePost' : this.updatePost,
    'deletePost' : this.deletePost,
    'findAllPosts': this.findAllPosts,
    'findPostsByUser': this.findPostsByUser
  };

  createPost(post: any) {
    const url = this.baseURL + '/api/post';
    return this.http.post(url, post)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPostsByUser(userId: String) {
    const url = this.baseURL + '/api/post/user/' + userId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPostbyId(postId: String) {
    const url = this.baseURL + '/api/post/' + postId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findAllPosts() {
    const url = this.baseURL + '/api/post';
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPostsbyTags(tags: [String]) {
    const url = this.baseURL + '/api/post?tags=' + tags;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPostsbyTag(tag: String) {
    const url = this.baseURL + '/api/post?tag=' + tag;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updatePost(postId: String, post: any) {
    const url = this.baseURL + '/api/post/' + postId;
    return this.http.put(url, post)
      .map((response: Response) => {
        return response.json();
      });
  }

  deletePost(postId: String) {
    const url = this.baseURL + '/api/post/' + postId;
    return this.http.delete(url);
  }
}
