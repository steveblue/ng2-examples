import { Component, EventEmitter, Input, Output, ElementRef, OnInit } from '@angular/core';
import { Media } from "../schema/media";
import { TrackItem } from './track-item.component';

declare let module: any;


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

export class TrackList implements OnInit {
  
  currentTrack: Media;
  elem: any;
  
  @Input() trackList: Media[]; 
  @Input() control: EventEmitter<any>; 
  @Output() onselect: EventEmitter<any>;
  
  constructor(private el: ElementRef) {
    
    this.onselect = new EventEmitter();
    this.elem = el.nativeElement;
    
  }
  
  setTrack(track:Media): void {
    
     this.currentTrack = track;
     
     setTimeout(()=>{ // TODO: figure out better way than setTimeout
       
        var self = this;
        var mult = 10;
        var frame = this.elem.scrollTop;
        var end = this.elem.querySelectorAll('.selected')[0].offsetTop;
        var cb = () => {
  
           if(frame >= end) {
             
             return;
          
           } else {
             
              frame += mult;
              this.elem.scrollTop = frame;
              window.requestAnimationFrame(cb);
      
           }

        };
        
        window.requestAnimationFrame(cb);
 
     },100);
    
  }
  
  ngOnInit() {
    
    this.control.subscribe((control)=>{
      this.setTrack(control.track);
    });
    
  }

  clicked(track: Media): void {

    this.onselect.emit(track);
    
  }

  isSelected(track:Media): boolean {
    
    if (!track || !this.currentTrack || this.currentTrack.url !== track.url) {
      return false;
    }

    return track.url === this.currentTrack.url;

  }

}
