import { Component } from '@angular/core';
import { DataChannelClient } from '../util/webrtc-client';

@Component({
  selector: 'view',
  moduleId: module.id,
  template: `
  <h1>
    {{ headline }}
  </h1>
  <p (click)="onClick($event)">
    Click here to start
  </p>
  <input type="text" (keypress)="onKeyDown($event)" />
  <ul>
    <li *ngFor="let message of messages">
      <p>{{message}}</p>
    </li>
  </ul>
  `,
  styleUrls: ['about.component.css']
})

export class DataChannelClient {
  headline: String;
  client: any;
  message: string;
  messages: string[];
  constructor() {
    this.headline = 'WebRTC testing... Is this mic on?';
  }
  onMessage(ev) {
    console.log(ev);
  }
  onKeyDown(ev) {

    this.client.dataChannel.send(ev.keyCode.toString());

    if(ev.keyCode === 13) {
      ev.target.value = '';
    }

  }
  onClick() {
    this.client = new DataChannelClient('room', Math.random().toString().replace('.', ''), 'https://synth-io-c7564.firebaseio.com/');
    this.messages = [];
    this.message = "";
    this.client.emitter.subscribe((message)=>{
      if(message === 'Data channel created! The channel is: open') {
        this.client.dataChannel.onmessage = this.onMessage.bind(this);
        this.client.dataChannel.send('hello');
      }
      if(this.messages.length > 24) this.messages = [];
      this.messages.push(message);
    });
  }
}
