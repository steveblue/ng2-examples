import { Component, OnInit, EventEmitter } from '@angular/core';
import { SliderComponent } from '../components/slider.component';

@Component({
  selector: 'view',
  moduleId: module.id,
  template: `
    <slider [options]="vertOptions"></slider>
  `,
  directives: [ SliderComponent ]
})

export class UIComponentTest implements OnInit {
  public vertOptions: any;
  constructor() {
    this.vertOptions = {
      orient: 'is--joystick',
      min: [0,0],
      max: [1025,1024],
      currentValue: [0,0],
      onUpdate: new EventEmitter();
    };
  }
  ngOnInit() {
     this.vertOptions.onUpdate.subscribe((val)=>{
       console.log(this.vertOptions.currentValue);
     });
  }
  
}
