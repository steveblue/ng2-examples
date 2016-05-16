import {Component, EventEmitter, ChangeDetectorRef, ngStyle, Input, OnInit} from '@angular/core';

import {DraggableDirective} from '../directives/draggable.directive';

@Component({
  selector: 'slider',
  moduleId: module.id,
  template: `
  <div class="ui--slider" 
       [ngClass]="{'is--hor' : options.orient === 'is--hor', 'is--vert' : options.orient === 'is--vert', 'is--joystick' : options.orient === 'is--joystick'}">
    <div class="ui--slider-container" [uiDraggable]="options">
      <div class="ui--slider-range" >
        <div class="ui--slider-handle" [ngStyle]="{ transform: transform }" ></div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['slider.component.css'],
  directives: [DraggableDirective]
})
export class SliderComponent implements OnInit{
  options: any;
  pos: EventEmitter<T>;
  transform: string;
  ref: ChangeDetectorRef;
  
 @Input('options') options: any; 
  
  constructor(ref: ChangeDetectorRef) {
    
    this.ref = ref;
    this.transform = 'translate3d(0px, 0px, 1px)';
    
  }
  
  ngOnInit() {
    
    this.options.pos = new EventEmitter();
    this.options.pos.subscribe((pos)=>{
      this.transform = 'translate3d('+pos[0]+','+pos[1]+','+pos[2]+')';
      this.ref.detectChanges();
    });
  }

}