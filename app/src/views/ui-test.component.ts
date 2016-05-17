import { Component, OnInit, EventEmitter } from '@angular/core';
import { SliderComponent } from '../components/slider.component';

@Component({
  selector: 'view',
  moduleId: module.id,
  template: `
    <slider [options]="joyOptions.left"></slider>
    <slider [options]="slider"></slider>
    <slider [options]="joyOptions.right"></slider>
  `,
  directives: [ SliderComponent ]
})

export class UIComponentTest implements OnInit {
  
  public slider: any;
  public joyOptions: any;
  
  constructor() {
    
    this.joyOptions = {
      left: {
        orient: 'is--joystick',
        min: [0,0],
        max: [1024,1024],
        currentValue: [0,0],
        onUpdate: new EventEmitter(),
        position: 'absolute',
        x: 14 + 'px',
        y: window.innerHeight - 214 + 'px'
      }, 
      right:  {
        orient: 'is--joystick',
        min: [0,0],
        max: [1024,1024],
        currentValue: [0,0],
        onUpdate: new EventEmitter(),
        position: 'absolute',
        x: window.innerWidth - 214 + 'px',
        y: window.innerHeight - 214 + 'px'
      }
    };
    
    this.slider = {
        orient: 'is--vert',
        min: 0,
        max: 255,
        currentValue: 0,
        onUpdate: new EventEmitter(),
        position: 'absolute',
        x: (14*2) + 200 + 'px',
        y: window.innerHeight - 214 + 'px'
    };
    
    
  }
  ngOnInit() {
     this.joyOptions.left.onUpdate.subscribe((val)=>{
       console.log(this.joyOptions.left.currentValue);
     });
     this.joyOptions.right.onUpdate.subscribe((val)=>{
       console.log(this.joyOptions.right.currentValue);
     });
     this.slider.onUpdate.subscribe((val)=>{
       console.log(this.slider.currentValue);
     });
  }
  
}
