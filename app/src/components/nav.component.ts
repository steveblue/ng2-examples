import { Component, provide, ChangeDetectorRef, ElementRef, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

declare let module: any;


@Component({
  selector: 'global-nav',
  template:`
    <nav>
      <ul [class.active]="isVisible">
        <li class="nav__item" ><a [routerLink]="['/']" >home</a></li>
        <li class="nav__item" ><a [routerLink]="['/ui']" >ui</a></li>
        <li class="nav__item" ><a [routerLink]="['/music']" >music</a></li>
        <li class="nav__item" ><a [routerLink]="['/webrtc/client']" >webrtc</a></li>
        <li class="nav__item" ><a [routerLink]="['/remote']" >remote</a></li>
        <li class="nav__item" ><a [routerLink]="['/about']" >about</a></li>
      </ul>
    </nav>
   `,
   directives : [ROUTER_DIRECTIVES],
   moduleId: module.id,
   styleUrls: ['nav.component.css']
})


export class GlobalNav implements OnInit {
  isVisible: boolean;
  ref: ChangeDetectorRef;
  elem: any;
  constructor(router: Router, _ref: ChangeDetectorRef, _el: ElementRef) {
    this.isVisible = false;
    this.elem = _el.nativeElement;
    this.ref = _ref;
    //console.log('Global Nav!', this.isVisible);
    
    
  }
  ngOnInit() {

    setTimeout(()=>{

          this.isVisible = true;
          this.ref.detectChanges();
         // console.log('Global Nav!', this.isVisible);

    },100);
  }
  
}
