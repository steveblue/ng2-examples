import { Component, provide } from '@angular/core';
import { MediaService } from '../services/media-service';
import { Media } from "../schema/media";
import { TrackList } from "../components/track-list.component";
import { AudioPlayer } from "../components/audio-player.component";


@Component({
  selector: 'view',
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
 providers: [MediaService, provide('audioContext', {useValue: new (window['AudioContext'] || window['webkitAudioContext'])})]
})

export class MusicPlayer {
  message: String;
  tracks: Array<Media>;
  currentTrackUrl: String;
  constructor(public mediaService: MediaService) {

    //TODO: fetch tracks from service

    mediaService.get().subscribe(res => this.tracks = res);


    // this.tracks = [
    //         new Media(
    //         'Beach House',
    //         'Myth',
    //         '/assets/music/01-myth.m4a',
    //         '/assets/music/album-artwork.png',
    //         1),
    //         new Media(
    //         'Beach House',
    //         'Wild',
    //         '/assets/music/02-wild.m4a',
    //         '/assets/music/album-artwork.png',
    //         2),
    //         new Media(
    //         'Beach House',
    //         'Lazuli',
    //         '/assets/music/03-lazuli.m4a',
    //         '/assets/music/album-artwork.png',
    //         3)
    //         ];


  }

  onTrackSelected(track: Media): void {
    console.log('Track selected: ', track);
    this.currentTrackUrl = track.url;

  }
}
