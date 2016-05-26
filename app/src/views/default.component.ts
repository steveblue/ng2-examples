import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
declare let module: any;

@Component({
  selector: 'view',
  moduleId: module.id,
  template:`
  
  <h1>
    Angular 2 Examples
  </h1>
  
  `,
   styleUrls: ['default.component.css']
})

export class Default {
  isVisible: boolean;
  ref: ChangeDetectorRef;
  constructor(ref: ChangeDetectorRef) {
    this.isVisible = false;
    this.ref = ref;
  }
  ngOnInit() {
    setTimeout(()=>{ //TODO: remove when ngEnter starts working
      
      this.isVisible = true;
      this.ref.detectChanges();
    
    },100);
  }
  
}
