import { Component } from "angular2/core";

import { Media } from "../models/media";

@Component({
selector: 'track-item',
inputs: ['track'],
host: {'class': 'item'},
template: `
  <span class="track__image"><img src="{{track.imageUrl}}"></span>
  <span class="track__title track__meta">{{track.title}}</span>
  <span class="track__artist track__meta">{{track.artist}}</span>
`
})

export class TrackItem {
  track: Media;
}
