import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Media } from '../schema/media';
import 'rxjs/add/operator/map';

let emitter = new EventEmitter();

@Injectable()
export class MediaService {
  emitter: EventEmitter<any>;
  constructor(public http: Http) {
    this.http = http;
    this.emitter = emitter;
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
  setFrequencyData(data) {
    emitter.next(data);
  }

}
