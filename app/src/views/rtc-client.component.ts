import config from '../conf';
import { Component, ChangeDetectorRef } from '@angular/core';
import { DataChannel } from '../util/data-channel';

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
  ref: ChangeDetectorRef;
  constructor(private _ref: ChangeDetectorRef) {
    this.headline = 'DataChannel';
    this.ref = _ref;
    console.log(config);
  }
  onKeyDown(ev) {

    this.client.dataChannel.send(ev.keyCode.toString());

    if(ev.keyCode === 13) {
      ev.target.value = '';
    }

  }
  updateMessages(message: string) {
    if(this.messages.length > 24) this.messages = [];
    this.ref.detectChanges();
  }
  onClick() {

    this.client = new DataChannel(config.room, config.username, config.server);

    this.messages = [];
    this.message = "";

    this.client.emitter.subscribe((message)=>{

      if(message === 'open') {
        this.client.observer.subscribe((res)=>{
          console.log(res[res.length-1]);
          this.messages.push(res[res.length-1].payload);
          this.updateMessages(message);
        });
      }

    });
  }
}
