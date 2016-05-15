import {Component} from '@angular/core';

@Component({
  selector: 'slider',
  moduleId: module.id,
  template: `
  <div class="ui--slider" 
       [ngClass]="{'is--hor' : options.orient === 'is--hor', 'is--vert' : options.orient === 'is--vert', 'is--joystick' : options.orient === 'is--joystick'}">
    <div class="ui--slider-container">
      <div class="ui--slider-range">
        <div class="ui--slider-handle"></div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['slider.component.css']
})
export class SliderComponent {
  options: any;
  constructor() {
    this.options = {
      orient: 'is--vert'
    };
  }
}