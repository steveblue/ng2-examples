import { Component, EventEmitter } from '@angular/core';

import { Media } from "../schema/media";
import { TrackItem } from './track-item';


@Component({
  selector: 'track-list',
  inputs: ['trackList'],
  outputs: ['onTrackSelected'],
  template: `
  <track-item *ngFor="let track of trackList"
   [track]="track"
   (click)='clicked(track)'
   [class.selected]="isSelected(track)">
  </track-item>
`,
  moduleId: module.id,
  styleUrls: ['track-list.css'],
  directives: [TrackItem]
})

export class TrackList {
  trackList: Media[];
  onTrackSelected: EventEmitter<Media>;
  currentTrack: Media;
  currentUrl: String;

  constructor() {
    this.onTrackSelected = new EventEmitter();
  }

  clicked(track: Media): void {
    this.currentTrack = track;
    this.onTrackSelected.emit(track);
  }

  isSelected(track:Media): boolean {
    if (!track || !this.currentTrack) {
      return false;
    }
    this.currentUrl = this.currentTrack.url;
    return track.title === this.currentTrack.title;

  }

}
