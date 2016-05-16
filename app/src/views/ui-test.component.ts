import { Component } from '@angular/core';
import { SliderComponent } from '../components/slider.component';

@Component({
  selector: 'view',
  moduleId: module.id,
  template: `
    <slider [options]="vertOptions"></slider>
  `,
  directives: [ SliderComponent ]
})

export class UIComponentTest {
  public vertOptions: any;
  constructor() {
    this.vertOptions = {
      orient: 'is--hor',
      min: 0,
      max: 255
    };
  }
  
}
