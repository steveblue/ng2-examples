import { Component } from '@angular/core';

import { Media } from '../schema/media';

@Component({
selector: 'track-item',
inputs: ['track'],
template: `
  <span class="track__image"><img src="{{track.imageUrl}}"></span>
  <span class="track__title track__meta">{{track.title}}</span>
  <span class="track__artist track__meta">{{track.artist}}</span>
`,
moduleId: module.id,
styleUrls: ['track-item.css']
})

export class TrackItem {
  track: Media;
}
