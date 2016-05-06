import { Component, OnInit, ElementRef, EventEmitter } from "angular2/core";
import { Observable } from 'rxjs/Observable';
import { Levels } from '../models/levels';

declare let d3:any;

@Component({
selector: 'visualizer',
inputs: ['stream'],
template: ``
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

    x = d3.scale.linear().domain([0, 1024]).range([0, width]);
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

    color = d3.scale.category10();

    svg.append('svg:path').attr('d', line(data));


    this.stream.subscribe((res)=>{

      svg.select('path')
					.attr('d', line(res))
          .style('stroke', function (d,i) { return color(d) });

    });

  }
  visualize(stream: any) {
    console.log(stream);
  }
}
