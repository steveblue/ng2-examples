import { Component, animation, style, animate, state, transition, ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
  selector: 'view',
  template:`
  
  <h1 @state="isVisible === true ? 'active' : 'hidden'">
    Angular 2 Examples
  </h1>
  
  `,
   moduleId: module.id,
   styleUrls: ['default.css'],
   animations: [
    animation('state', [
      state('void', style({ display: 'none' })),
      state('active', style({ transform: 'translate3d(0, 0, 0)', opacity: '1' })),
      state('hidden', style({ transform: 'translate3d(-100%, 0, 0)', opacity: '0' })),
      transition('active => hidden', [animate('100ms ease-out')]),
      transition('hidden => active', [animate('100ms ease-out')])
    ])
  ]
})

export class Default {
  isVisible: boolean;
  ref: ChangeDetectorRef;
  constructor(ref: ChangeDetectorRef) {
    this.isVisible = false;
    this.ref = ref;
  }
  ngOnInit() {
    setTimeout(()=>{
      
          this.isVisible = true;
          this.ref.detectChanges();
          console.log('Global Nav!', this.isVisible);
    
    },100);
  }
  
}
