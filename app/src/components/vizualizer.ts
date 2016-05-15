import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MediaService } from '../services/media-service';
import { Meter } from '../models/meter';

declare let d3:any;

@Component({
selector: 'visualizer',
outputs: ['path'],
template: `
 <svg [attr.width]="44" 
      [attr.height]="44"
      (click)="addMeter($event)">
   <line [attr.x1]="0" 
         [attr.x2]="22" 
         [attr.y1]="11" 
         [attr.y2]="11"
         [attr.stroke]="meters[0].level.color"
         [attr.stroke-width]="1"></line>
   <line [attr.x1]="11" 
         [attr.x2]="11" 
         [attr.y1]="0" 
         [attr.y2]="22"
         [attr.stroke]="meters[0].level.color"
         [attr.stroke-width]="1"></line>
 </svg>
 <svg [attr.width]="width" 
      [attr.height]="height"
      (mousemove)="onMouseMove($event)"
      (mouseleave)="onMouseLeave($event)">
   <path class="levels"
         [attr.d]="path" 
         [attr.fill]="color">
   </path>
   <line *ngFor="let meter of meters"
         [attr.x1]="meter.level.points[0].x" 
         [attr.x2]="meter.level.points[1].x" 
         [attr.y1]="meter.playhead.points[0].y" 
         [attr.y2]="meter.playhead.points[1].y"
         [attr.stroke]="meter.playhead.color"
         [attr.stroke-width]="meter.playhead.stroke"
         (click)="onMeterClick($event, meter)">
   </line>
   <line *ngFor="let meter of meters"
         [attr.x1]="meter.level.points[0].x" 
         [attr.x2]="meter.level.points[1].x" 
         [attr.y1]="meter.level.points[0].y" 
         [attr.y2]="meter.level.points[1].y"
         [attr.stroke]="meter.level.color"
         [attr.stroke-width]="meter.level.stroke"
         (click)="onMeterClick($event, meter)">
   </line>
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
  meters: any[];
  shape: any;
  selected: number;
  ref: ChangeDetectorRef;
  //changeDetection: ChangeDetectionStrategy.OnPush;
  
  constructor(mediaService: MediaService, ref: ChangeDetectorRef, elem: ElementRef) {

    this.mediaService = mediaService;
    this.elem = elem;
    this.ref = ref;
    this.color = '#8DE969';
    this.width = window.innerWidth;
    this.height = 240;
    this.meters = []; 
    
    this.addMeter();

   

  }
  ngOnInit() {

    var line = d3.svg.line()
            .interpolate('cardinal')
            .x(function(d, i) { return x(i); })
            .y(function(d, i) { return y(d); }),
        x = d3.scale.linear().domain([0, 514]).range([0, window.innerWidth]),
        y = d3.scale.linear().domain([0, 255]).range([this.height, 0]);
    
    this.shape = this.elem.nativeElement.getElementsByClassName('levels')[0];

    this.mediaService.emitter.subscribe((res)=>{
      
      res.unshift(0);
      res.push(0);

      this.path = line(res);

      
      for(let i=0; i<this.meters.length i++) {
        this.meters[i].level.points[0].x = this.meters[i].position.x;
        this.meters[i].level.points[1].x = this.meters[i].position.x; 
        this.meters[i].level.points[0].y = this.height - this.shape.getPointAtLength(this.meters[i].position.x).y; 
        this.meters[i].level.points[1].y = this.height;
        this.meters[i].val = this.scale(this.height - this.shape.getPointAtLength(this.meters[i].position.x).y, 0, this.height, 0, 255);
      }

            //console.log(this.meters[0].val);
      
      this.ref.detectChanges();

    });



  }
  onMouseMove(ev) {
    if(this.selected !== 1000) {
      this.meters[this.selected].position.x = ev.clientX;
      this.ref.detectChanges();
    }
  }
  onMouseLeave(ev) {
    
    // this.playhead.isVisible = false;
    // this.ref.detectChanges();

  }
  
  scale(v, min, max, gmin, gmax) {
    
      v = parseInt(v);
      return parseInt(((v - min) / (max - min)) * (gmax - gmin) + gmin);
   }
   
   addMeter(ev) {
     this.meters.push(new Meter(this.height, this.meters.length));
     this.selected = this.meters.length - 1;
   }
   
   onMeterClick(ev, meter) {
     console.log(ev, meter);
     if(this.selected === meter.index) {
       this.selected = 1000;
     } else {
       this.selected = meter.index;
     }
     
   }



}
