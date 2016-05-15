import { Component, provide, animation, style, animate, state, transition, ChangeDetectorRef, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
  selector: 'global-nav',
  template:`
    <nav>
      <ul [class.active]="isVisible" @state="isVisible === true ? 'active' : 'hidden'">
        <li class="nav__item" ><a [routerLink]="['/']" >home</a></li>
        <li class="nav__item" ><a [routerLink]="['/ui']" >ui</a></li>
        <li class="nav__item" ><a [routerLink]="['/music']" >music</a></li>
        <li class="nav__item" ><a [routerLink]="['/about']" >about</a></li>
      </ul>
    </nav>
   `,
   directives : [ROUTER_DIRECTIVES],
   moduleId: module.id,
   styleUrls: ['nav.component.css'],
   animations: [
    animation('state', [
      state('void', style({ display: 'none' })),
      state('active', style({ transform: 'translate3d(0, 0px, 0)' })),
      state('hidden', style({ transform: 'translate3d(0, -300px, 0)' })),
      transition('active => hidden', [animate('100ms ease-out')]),
      transition('hidden => active', [animate('100ms ease-out')])
    ])
  ]
})


export class GlobalNav implements OnInit {
  isVisible: boolean;
  ref: ChangeDetectorRef;
  constructor(router: Router, ref: ChangeDetectorRef) {
    this.isVisible = false;
    this.ref = ref;
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