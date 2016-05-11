import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MediaService } from '../services/media-service';

declare let d3:any;

@Component({
selector: 'visualizer',
outputs: ['path'],
template: `
 <svg [attr.width]="width" [attr.height]="height">
   <path [attr.d]="path" [attr.fill]="color">
   </path>
 </svg>
`,
moduleId: module.id,
styleUrls: ['visualizer.css'],
providers: [MediaService]
})

export class Visualizer implements OnInit {

  path: string;
  elem: HTMLElement;
  mediaService: MediaService;
  width: number;
  height: number;
  color: string;
  ref: ChangeDetectorRef;
  //changeDetection: ChangeDetectionStrategy.OnPush;
  
  constructor(mediaService: MediaService, ref: ChangeDetectorRef) {

    this.mediaService = mediaService;
    this.ref = ref;
    this.color = '#8DE969';
    this.width = window.innerWidth;
    this.height = 360;

  }
  ngOnInit() {

    var line,
        x,
        y;
        
    x = d3.scale.linear().domain([0, 1026]).range([0, this.width]);
    y = d3.scale.linear().domain([0, 255]).range([this.height, 0]);

    line = d3.svg.line()
            .interpolate('cardinal')
            .x(function(d, i) { return x(i); })
            .y(function(d, i) { return y(d); });


    this.mediaService.emitter.subscribe((res)=>{
      
      res.unshift(0);
      res.push(0);
      this.path = line(res);
      this.ref.detectChanges();

    });


  }

}
