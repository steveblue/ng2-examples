import config from '../conf';
import { Component, ChangeDetectorRef, ElementRef, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { DataChannel } from '../services/data-channel';
import { TerrainWorld } from '../scene/terrain.scene';

declare let module: any;

@Component({
  selector: 'view',
  moduleId: module.id,
  template: `
  <h1 class="copy" [ngClass]="{ 'is--hidden' : isConnected === true }">
    {{ headline }}
  </h1>
  <p class="button" (click)="onClick($event)" [ngClass]="{ 'is--disabled' : isConnected === true, 'is--hidden' : isConnected === true }">
    <span *ngIf="!isConnected"> Connect </span>
    <span *ngIf="isConnected"> Connected </span>
  </p>
  <div class="scene"></div>
  `,
  styleUrls: ['remote-ui-demo.component.css']
})

export class RemoteUIDemo implements OnInit {
  
  headline: string;
  copy: string;
  client: any;
  messages: any;
  isConnected: boolean;
  ref: ChangeDetectorRef;
  elem: any;
  world: any;
  
  constructor(private _ref: ChangeDetectorRef, private _el: ElementRef) {

    this.headline = 'Remote Terrain';
    this.ref = _ref;
    this.elem = _el.nativeElement;
    this.messages = [];
    this.isConnected = false;
    this.world = new TerrainWorld(true, true);


    console.log(config);

  }
  ngOnInit() {
     this.world.setContainer(this.elem.querySelector('.scene'));
  }
  onKeyDown(ev) {
    

  }
  updateMessages(msg: any) {
    console.log(msg);
    let data : number[] = msg.currentValue;
    
    if(msg.control === 'joyLeft') {
      if(data[0] < 0) {
        console.log('left');
        this.world.controls.moveLeft = true;
        this.world.controls.moveRight = false;
      } else {
        this.world.controls.moveLeft = false;
      }

      if(data[0] > 0) {
        console.log('right');
        this.world.controls.moveLeft = false;
        this.world.controls.moveRight = true;
      } else {
        this.world.controls.moveRight = false;
      }


      if(data[1] > 0) {
        console.log('forward');
        this.world.controls.moveForward = true;
        this.world.controls.moveBackward = false;
      } else {
        this.world.controls.moveForward = false;
      }

      if(data[1] < 0) {
        console.log('backward');
        this.world.controls.moveBackward = true;
        this.world.controls.moveForward = false;
      } else {
        this.world.controls.moveBackward = false;
      }

    }
    
    if(msg.control === 'joyRight') {
      if(data[0] < 0) {
        console.log('left');
        this.world.controls.moveLeft = true;
        this.world.controls.moveRight = false;
      } else {
        this.world.controls.moveLeft = false;
      }

      if(data[0] > 0) {
        console.log('right');
        this.world.controls.moveLeft = false;
        this.world.controls.moveRight = true;
      } else {
        this.world.controls.moveRight = false;
      }


      // if(data[1] > 0) {
      //   console.log('forward');
      //   this.world.controls.moveForward = true;
      //   this.world.controls.moveBackward = false;
      // } else {
      //   this.world.controls.moveForward = false;
      // }

      // if(data[1] < 0) {
      //   console.log('backward');
      //   this.world.controls.moveBackward = true;
      //   this.world.controls.moveForward = false;
      // } else {
      //   this.world.controls.moveBackward = false;
      // }

    }
    
    this.messages.push(msg);
    this.ref.detectChanges();
  }
  onClick() {

    if(!this.isConnected) {
        
      this.client = new DataChannel(config.room, config.username, config.server);


      this.client.emitter.subscribe((message)=>{

        if(message === 'open') {
          this.isConnected = true;
       
          this.client.observer.subscribe((res)=>{
         
            let msg = res[res.length-1].data; 
            
            this.updateMessages(msg);
            
          });
          this.ref.detectChanges();
        }

      });

    }

  }
}
