import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Media } from "../schema/media";
import { TrackItem } from './track-item.component';


@Component({
  selector: 'track-list',
  template: `
  <track-item *ngFor="let track of trackList"
   [track]="track"
   (click)='clicked(track)'
   [class.selected]="isSelected(track)">
  </track-item>
`,
  moduleId: module.id,
  styleUrls: ['track-list.component.css'],
  directives: [TrackItem]
})

export class TrackList {
  
  currentTrack: Media;
  currentUrl: String;
  
  @Input() trackList: Media[]; 
  @Output() onselect: EventEmitter<any>;
  
  constructor() {
    this.onselect = new EventEmitter();
  }

  clicked(track: Media): void {
    this.currentTrack = track;
    this.onselect.emit(track);
  }

  isSelected(track:Media): boolean {
    if (!track || !this.currentTrack) {
      return false;
    }
    this.currentUrl = this.currentTrack.url;
    return track.title === this.currentTrack.title;

  }

}
