import { Component, OnInit, ElementRef, EventEmitter } from "angular2/core";
import { Observable } from 'rxjs/Observable';
import { Levels } from '../models/levels';

declare let d3:any;

@Component({
selector: 'visualizer',
inputs: ['stream'],
template: ``,
moduleId: module.id,
styleUrls: ['visualizer.css']
})

export class Visualizer implements OnInit {

  analyzer: Object[];
  stream: EventEmitter<any>;
  path: String;
  elem: HTMLElement;

  constructor(elem: ElementRef) {

    this.elem = elem.nativeElement;

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

    svg = d3.select(this.elem)
                      .append('svg:svg')
                      .attr('width', width+'px')
                      .attr('height', height+'px');

    color = '#76E7CD';

    svg.append('svg:path').attr('d', line(data));


    this.stream.subscribe((res)=>{
      res.unshift(0);
      res.push(0);
      svg.select('path')
					.attr('d', line(res))
          .style('fill', color);

    });

  }
  visualize(stream: any) {
    console.log(stream);
  }
}
