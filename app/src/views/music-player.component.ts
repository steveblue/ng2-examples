import { Component, provide, OnInit, EventEmitter } from '@angular/core';
import { MediaService } from '../services/media-service';
import { Media } from "../schema/media";
import { TrackList } from "../components/track-list.component";
import { AudioPlayer } from "../components/audio-player.component";

declare let module: any;


@Component({
  selector: 'view',
  moduleId: module.id,
  template: `
  <div class="music__player">
  
    <audio-player
      [url]="currentTrack.url"
      [control]="controller"
      (onended)="nextTrack()">
    </audio-player>
    
    <track-list
      [trackList]="tracks"
      [control]="controller"
      (onselect)="onTrackSelected($event)">
    </track-list>

  </div>
`,
 styleUrls: ['music-player.component.css'],
 directives: [TrackList, AudioPlayer],
 providers: [MediaService, provide('audioContext', {useValue: new (window['AudioContext'] || window['webkitAudioContext'])})]
})

export class MusicPlayer implements OnInit {
  message: string;
  tracks: Media[];
  playhead: number;
  controller: EventEmitter<any>;
  currentTrack: any;
  
  constructor(public mediaService: MediaService) {

    this.playhead = 0;
    this.currentTrack = {};
    
    this.controller = new EventEmitter();

    mediaService.get().subscribe(res => {
      this.tracks = res;
      this.currentTrack = this.tracks[this.playhead];
    });

  }
  ngOnInit() {
    
  }
  onTrackSelected(track: Media): void {
    
    this.playhead = this.tracks.indexOf(track);
    this.currentTrack = this.tracks[this.playhead];

    this.controller.emit({
      action: 'play',
      track: this.currentTrack
    });
    
  }
  prevTrack() {
    
    this.playhead = this.tracks.indexOf(this.currentTrack);
    this.playhead--;
    this.currentTrack = this.tracks[this.playhead];
    
    this.controller.emit({
      action: 'play',
      track: this.currentTrack
    });
    
  }
  nextTrack() {
    
    this.playhead = this.tracks.indexOf(this.currentTrack);
    this.playhead++;
    this.currentTrack = this.tracks[this.playhead];
    
    this.controller.emit({
      action: 'play',
      track: this.currentTrack
    });
    
  }
}
