import config from '../conf';
import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { SliderComponent } from '../components/slider.component';
import { DataChannel } from '../services/data-channel';

declare let module: any;

@Component({
  selector: 'view',
  moduleId: module.id,
  template: `
  
    <p class="button" (click)="onClick($event)" [ngClass]="{ 'is--disabled' : isConnected }">
      <span *ngIf="!isConnected"> Connect </span>
      <span *ngIf="isConnected"> Connected </span>
    </p>
  
    <slider [options]="joyOptions.left"></slider>
    <slider [options]="slider"></slider>
    <slider [options]="joyOptions.right"></slider>
  `,
  directives: [ SliderComponent ],
  styleUrls: ['ui-test.component.css']
})

export class UIComponentTest implements OnInit {
  
  slider: any;
  joyOptions: any;
  client: any;
  isConnected: boolean;
  elem: any;
  
  constructor(private _el: ElementRef) {
    
    this.elem = _el.nativeElement;

    this.isConnected = false;
    
    this.joyOptions = {
      left: {
        orient: 'is--joystick',
        min: [-1.0,1.0],
        max: [1.0,-1.0],
        currentValue: [0,0],
        onUpdate: new EventEmitter(),
        position: 'absolute',
        x: 14 + 'px',
        y: window.innerHeight - 214 + 'px'
      }, 
      right:  {
        orient: 'is--joystick',
        min: [-1.0,1.0],
        max: [1.0,-1.0],
        currentValue: [0,0],
        onUpdate: new EventEmitter(),
        position: 'absolute',
        x: window.innerWidth - 214 + 'px',
        y: window.innerHeight - 214 + 'px'
      }
    };
    
    this.slider = {
        orient: 'is--vert',
        min: 0.0,
        max: 1.0,
        currentValue: 0,
        onUpdate: new EventEmitter(),
        position: 'absolute',
        x: (14*2) + 200 + 'px',
        y: window.innerHeight - 214 + 'px'
    };
    
    console.log(config);
    
    
  }
  ngOnInit() {
     this.joyOptions.left.onUpdate.subscribe((val) => {
      let msg = JSON.stringify({
        currentValue: this.joyOptions.left.currentValue,
        max: this.joyOptions.left.max,
        min: this.joyOptions.left.min,
        control: 'joyLeft'
      });
     if(this.client.channel) {
         this.client.channel.send(msg);
      }
     });
     this.joyOptions.right.onUpdate.subscribe((val) => {
      let msg = JSON.stringify({
        currentValue: this.joyOptions.right.currentValue,
        max: this.joyOptions.right.max,
        min: this.joyOptions.right.min,
        control: 'joyRight'
      });
      if(this.client.channel) {
         this.client.channel.send(msg);
      }

     });
     this.slider.onUpdate.subscribe((val) => {
      let msg = JSON.stringify({
        currentValue: this.slider.currentValue,
        max: this.slider.max,
        min: this.slider.min,
        control: 'slider'
      });
      if(this.client.channel) {
         this.client.channel.send(msg);
      }
     });
  }
  onClick() {

    if(!this.isConnected) {

      this.client = new DataChannel(config.room, config.username, config.server);

      this.client.emitter.subscribe((message)=>{

        if(message === 'open') {
          this.isConnected = true;
          this.client.observer.subscribe((res)=>{

            console.log(res);
            
          });
        }

      });

    }

  }
  
}
