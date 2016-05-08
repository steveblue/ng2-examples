import { Injectable } from '@angular2/core';
import { Http } from '@angular2/http';
import { Media } from '../schema/media';
import 'rxjs/add/operator/map';

@Injectable()
export class MediaService {
  constructor(public http: Http) {
    this.http = http;
  }
  get() {

    return this.http.get('/src/models/media.json')
    .map((responseData) => {

      return responseData.json().media;

    })
    .map((media: Array<any>) => {

      let result: Array<Media> = [];

      if (media) {

        media.forEach((media) => {
          result.push(
            new Media(media.artist,
              media.title,
              media.url,
              media.imageUrl,
              media.index));
        });

      }

      return result;

    });
  }

}
