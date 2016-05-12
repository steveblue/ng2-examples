import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MediaService } from '../services/media-service';

declare let d3:any;

@Component({
selector: 'visualizer',
outputs: ['path'],
template: `
 <svg [attr.width]="width" 
      [attr.height]="height"
      (mousemove)="onMouseMove($event)"
      (mouseleave)="onMouseLeave($event)">
   <path [attr.d]="path" 
         [attr.fill]="color">
   </path>
   <line [attr.x1]="playhead.points[0].x" 
         [attr.x2]="playhead.points[1].x" 
         [attr.y1]="playhead.points[0].y" 
         [attr.y2]="playhead.points[1].y"
         [attr.stroke]="playhead.color"></line>
 </svg>
`,
moduleId: module.id,
styleUrls: ['visualizer.css'],
providers: [MediaService]
})

export class Visualizer implements OnInit {

  path: string;
  elem: any;
  mediaService: MediaService;
  width: number;
  height: number;
  color: string;
  playhead: any;
  shape: any;
  ref: ChangeDetectorRef;
  //changeDetection: ChangeDetectionStrategy.OnPush;
  
  constructor(mediaService: MediaService, ref: ChangeDetectorRef, elem: ElementRef) {

    this.mediaService = mediaService;
    this.elem = elem;
    this.ref = ref;
    this.color = '#8DE969';
    this.width = window.innerWidth;
    this.height = 240;
    
    this.playhead = {
      color: 'rgba(255,255,255,1.0)',
      isVisible: false,
      points: [{
        x: 0,
        y: 0
      },
      {
        x: 0,
        y: this.height
      }]
    };

  

  }
  ngOnInit() {

    var line = d3.svg.line()
            .interpolate('cardinal')
            .x(function(d, i) { return x(i); })
            .y(function(d, i) { return y(d); }),
        x = d3.scale.linear().domain([0, 1026]).range([0, window.innerWidth]),
        y = d3.scale.linear().domain([0, 255]).range([this.height, 0]);
    
    this.shape = this.elem.nativeElement.getElementsByTagName('path')[0];


    this.mediaService.emitter.subscribe((res)=>{
      
      res.unshift(0);
      res.push(0);
      this.path = line(res);
      this.ref.detectChanges();

    });


  }
  onMouseMove(ev) {
    let x = ev.clientX;
    let y = 0;
    //console.log(this.shape.getPointAtLength(ev.clientX));
    // this.playhead.points[0].x = x;
    // this.playhead.points[1].x = x; 
    // this.playhead.points[0].y = this.shape.getPointAtLength(ev.clientX).y;
    // this.playhead.points[1].y = 0;
    // this.playhead.isVisible = true; 
    //this.ref.detectChanges();
  }
  onMouseLeave(ev) {
    
    //this.playhead.isVisible = false;
    console.log( this.playhead.isVisible );
    //this.ref.detectChanges();

  }



}
