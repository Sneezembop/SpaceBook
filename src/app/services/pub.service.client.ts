import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';


@Injectable()

export class PubService {
  constructor(private http: Http) {}
  baseURL = environment.baseUrl;
  api = {
    'createPub'   : this.createPub,
    'findPubbyId' : this.findPubbyId,
    'findPubbyText': this.findPubbyText,
    'updatePub' : this.updatePub,
    'deletePub' : this.deletePub
  };

  createPub(pub: any) {
    const url = this.baseURL + '/api/pub';
    return this.http.post(url, pub)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPubbyId(pubId: String) {
    const url = this.baseURL + '/api/pub/' + pubId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }
  findPubbyText(text: String) {
    const url = this.baseURL + '/api/pub?text=' + text;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updatePub(pubId: String, pub: any) {
    const url = this.baseURL + '/api/pub/' + pubId;
    return this.http.put(url, pub)
      .map((response: Response) => {
        return response.json();
      });
  }

  deletePub(pubId: String) {
    const url = this.baseURL + '/api/pub/' + pubId;
    return this.http.delete(url);
  }
}
