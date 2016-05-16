import {Component, EventEmitter, ChangeDetectorRef, ngStyle} from '@angular/core';

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
export class SliderComponent {
  options: any;
  pos: EventEmitter<T>;
  transform: string;
  ref: ChangeDetectorRef
  
  constructor(ref: ChangeDetectorRef) {
    
    this.ref = ref;
    this.transform = 'translate3d(120px, 120px, 1px)';
    this.options = {
      orient: 'is--vert',
      min: 0,
      max: 255,
      pos: new EventEmitter()
    };
    
    this.options.pos.subscribe((pos)=>{
     
      this.transform = 'translate3d('+parseInt(pos[0])+'px,'+parseInt(pos[1])+'px,'+pos[2]+'px)';
      this.ref.detectChanges();
      
    });
  }

}