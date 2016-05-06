import { Component, provide } from "angular2/core";

import { Media } from "../models/media";
import { TrackList } from "../directives/track-list";
import { AudioPlayer } from "../directives/audio-player";


@Component({
  template: `
  <div class="music-app">
    <track-list
      [trackList]="tracks"
      (onTrackSelected)="onTrackSelected($event)">
    </track-list>
    <audio-player
      [url]="currentTrackUrl">
    </audio-player>
  </div>
`,
 directives: [TrackList, AudioPlayer],
 providers: [provide('audioContext', {useValue: new (window['AudioContext'] || window['webkitAudioContext'])})]
})

export class MusicPlayer {
  message: String;
  tracks: Array<any>;
  currentTrackUrl: String;
  constructor() {

    //TODO: fetch tracks from service

    this.tracks = [
            new Media(
            'Beach House',
            'Myth',
            '/assets/music/01-myth.m4a',
            '/assets/music/album-artwork.png',
            1),
            new Media(
            'Beach House',
            'Wild',
            '/assets/music/02-wild.m4a',
            '/assets/music/album-artwork.png',
            2),
            new Media(
            'Beach House',
            'Lazuli',
            '/assets/music/03-lazuli.m4a',
            '/assets/music/album-artwork.png',
            3)
            ];


  }

  onTrackSelected(track: Media): void {
    console.log('Track selected: ', track);
    this.currentTrackUrl = track.url;

  }
}
