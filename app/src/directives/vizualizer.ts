import { Component, OnInit } from "angular2/core";
import { Observable } from 'rxjs/Observable';

@Component({
selector: 'visualizer',
inputs: ['stream'],
template: `
  <svg>
    <g>
      <path [attr.d]="path"></path>
    </g>
  </svg>
`
})

export class Visualizer implements OnInit {
  cx: any;
  analyzer: Object[];
  stream: Observable<any>;
  path: String;
  constructor() {

  }
  ngOnInit() {
    console.log(this.stream);
    this.stream.subscribe((res)=>{
      console.log(res);
    });

  }
  visualize(stream: any) {
    console.log(stream);
  }
}
