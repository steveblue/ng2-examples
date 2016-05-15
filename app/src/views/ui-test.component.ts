import { Component } from '@angular/core';
import { SliderComponent } from '../components/slider.component';

@Component({
  selector: 'view',
  moduleId: module.id,
  template: `
    <slider></slider>
  `,
  directives: [ SliderComponent ]
})

export class UIComponentTest {

  constructor() {
    
  }
  
}
