import { Component, OnInit, Inject, ElementRef, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MediaService } from '../services/media-service';
import { Levels } from '../models/levels';

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

  analyzer: Object[];
  path: string;
  elem: HTMLElement;
  mediaService: MediaService;
  width: number;
  height: number;
  color: string;
  emitter: EventEmitter<any>;
  ref: ChangeDetectorRef;
  //changeDetection: ChangeDetectionStrategy.OnPush;
@Inject('audioContext') private context
  constructor(elem: ElementRef, mediaService: MediaService, ref: ChangeDetectorRef) {

    this.elem = elem.nativeElement;
    this.mediaService = mediaService;
    this.emitter = new EventEmitter();
    this.ref = ref;

  }
  ngOnInit() {

    var line,
        data,
        svg,
        color,
        x,
        y,
        width = window.innerWidth,
        height = 360;

    x = d3.scale.linear().domain([0, 1026]).range([0, width]);
    y = d3.scale.linear().domain([0, 255]).range([height, 0]);

    line = d3.svg.line()
            .interpolate('cardinal')
            .x(function(d, i) { return x(i); })
            .y(function(d, i) { return y(d); });

    data = new Levels();

    // svg = d3.select(this.elem)
    //                   .append('svg:svg')
    //                   .attr('width', width+'px')
    //                   .attr('height', height+'px');

    this.color = '#76E7CD';

    //svg.append('svg:path').attr('d', line(data));
    this.width = width;
    this.height = height;

    // this.emitter.subscribe((res)=>{
    //   this.path = line(res);
    // };

    var count = 0;

    this.mediaService.emitter.subscribe((res)=>{

      // console.log(this.line);
      res.unshift(0);
      res.push(0);
      // console.log(this.path);
      this.path = line(res);
      this.ref.detectChanges();


      // svg.select('path')
			// 		.attr('d', line(res))
      //     .style('fill', color);

    });


  }

}
