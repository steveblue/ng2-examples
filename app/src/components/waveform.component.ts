import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MediaService } from '../services/media-service';
import { Meter } from '../models/meter';

declare let d3:any;

@Component({
selector: 'waveform-monitor',
moduleId: module.id,
outputs: ['path'],
templateUrl: 'waveform.component.html',
styleUrls: ['waveform.component.css'],
providers: [MediaService]
})

export class WaveformComponent implements OnInit {

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

    var x = d3.scale.linear().domain([0, 514]).range([0, window.innerWidth]),
        y = d3.scale.linear().domain([0, 255]).range([this.height, 0]),
        line = d3.svg.line()
            .interpolate('cardinal')
            .x(function(d, i) { return x(i); })
            .y(function(d, i) { return y(d); });
           
    this.shape = this.elem.nativeElement.getElementsByClassName('levels')[0];

    this.mediaService.emitter.subscribe((res)=>{
      
      res.unshift(0);
      res.push(0);

      this.path = line(res);

      
      for(let i=0; i<this.meters.length; i++) {
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
  
  // ngOnDestroy() {
  //   this.mediaService.emitter.unsubscribe();
  // }
  
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
   
   addMeter() {
     
     this.meters.push(new Meter(this.height, this.meters.length));
     this.selected = this.meters.length - 1;
     
   }
   
   onMeterClick(ev, meter) {

     if(this.selected === meter.index) {
       this.selected = 1000;
     } else {
       this.selected = meter.index;
     }
     
   }



}
