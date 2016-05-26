import { Component, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { MediaService } from '../services/media-service';
import { Meter } from '../models/meter';

declare let d3:any;
declare let module: any;


@Component({
selector: 'waveform-monitor',
moduleId: module.id,
templateUrl: 'waveform.component.html',
styleUrls: ['waveform.component.css'],
providers: [MediaService]
})

export class WaveformComponent implements OnInit {

  elem: any;
  mediaService: MediaService;
  width: number;
  height: number;
  color: string;
  meters: any[];
  data: number[];
  shape: any;
  selected: number;
  init: boolean;
  isVisible: boolean;
  ref: ChangeDetectorRef;
  controls: EventEmitter<any>;

  @Output() path: any;

  constructor(mediaService: MediaService, ref: ChangeDetectorRef, elem: ElementRef) {

    this.init = false;
    this.mediaService = mediaService;
    this.elem = elem;
    this.ref = ref;
    this.color = '#8DE969';
    this.width = window.innerWidth;
    this.height = 240;
    this.data = [];
    this.meters = [];
    this.newMeter();
    this.isVisible = false;
    this.controls = new EventEmitter();
  }

  ngOnInit() {

    var x = d3.scale.linear().domain([0, 512]).range([0, window.innerWidth]),
        y = d3.scale.linear().domain([0, 255]).range([this.height, 0]),
        line = d3.svg.line()
            .interpolate('basis')
            .x(function(d, i) { return x(i); })
            .y(function(d, i) { return y(d); });

    this.shape = this.elem.nativeElement.getElementsByClassName('levels')[0];

    this.mediaService.emitter.subscribe((res)=>{

      this.data = res;
      res.unshift(0);
      res.push(0);

      this.path = line(res);

      if(this.meters.length > 0) {

        for( let i=0; i < this.meters.length; i++ ) {

          //this.meters[i].level.points[0].y = this.height - this.shape.getPointAtLength(this.meters[i].position.x).y;

          //this.meters[i].val = this.scale(this.meters[i].level.points[0].y, this.height, 0, 0, 255);
          this.meters[i].val = this.data[this.scale(this.meters[i].position.x, 0, window.innerWidth, 0, 1024)];
          this.meters[i].transform = 'translate('+ this.meters[i].position.x+', 0)';
          this.meters[i].level.points[0].y = this.height - this.scale(this.meters[i].val, 0, 255, 0, this.height);


        }

        this.controls.emit({
          meters: this.meters
        });

        this.ref.detectChanges();

      }


      //console.log(this.meters[0].val);



    });



  }

  // ngOnDestroy() {
  //   this.mediaService.emitter.unsubscribe();
  // }

  onMouseMove(ev) {

    if(this.selected !== 1000) {
      this.meters[this.selected].position.x = ev.clientX;
      //this.ref.detectChanges();
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

    newMeter() {

     this.meters.push(new Meter(this.height, this.meters.length));
     this.selected = this.meters.length - 1;

   }

   addMeter() {

     if(!this.init) {
       this.isVisible = true;
       this.init = true;
     } else {
      this.meters.push(new Meter(this.height, this.meters.length));
      this.selected = this.meters.length - 1;
     }

   }

   hideMeters() {
     this.isVisible = false;
   }

   showMeters() {
    this.isVisible = true;
   }

   onMeterClick(ev, meter) {

     if(this.selected === meter.index) {
       this.selected = 1000;
     } else {
       this.selected = meter.index;
     }

   }



}
