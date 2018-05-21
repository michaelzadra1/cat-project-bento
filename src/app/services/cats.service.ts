import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import * as xml2js from 'xml2js';

@Injectable()
export class CatsService {

  imagesEndpoint = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=25&size=full';
  factsEndpoint = 'https://cors-proxy.htmldriven.com/?url=https://catfact.ninja/facts?limit=25';

  constructor(private http: HttpClient) { }

  getCatImages() {
    return this.http.get(this.imagesEndpoint, {responseType: 'text'})
    .map(res => {
        let data;
        xml2js.parseString( res, function (err, result) {
          data = result;
        });
        return data;
    })
    .catch((error: any) =>
      Observable.throw(error)
    );
  }
  getCatFacts() {
    return this.http.get(this.factsEndpoint, {responseType: 'text'})
    .map( res => JSON.parse(res))
    .catch((error: any) =>
      Observable.throw(error)
    );
  }
}
