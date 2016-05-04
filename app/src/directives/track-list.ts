import { Component, EventEmitter } from "angular2/core";

import { Media } from "../models/media";
import { TrackItem } from './track-item';

@Component({
  selector: 'track-list',
  directives: [TrackItem],
  inputs: ['trackList'],
  outputs: ['onTrackSelected'],
      template: `
      <track-item *ngFor="#track of trackList"
       [track]="track"
       (click)='clicked(track)'
       [class.selected]="isSelected(track)">
      </track-item>
    `
})

export class TrackList {
  trackList: Media[];
  onTrackSelected: EventEmitter<Media>;
  currentTrack: Media;

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
    return track.title === this.currentTrack.title;
  }



}
