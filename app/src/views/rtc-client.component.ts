import config from '../conf';
import { Component, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DataChannel } from '../util/data-channel';
import {NgClass} from 'angular2/common';

@Component({
  selector: 'view',
  moduleId: module.id,
  template: `
  <h1>
    {{ headline }}
  </h1>
  <p class="copy">
    {{copy}}
  </p>
  <p class="button" (click)="onClick($event)" [ngClass]="{ 'is--disabled' : isConnected }">
    <span *ngIf="!isConnected"> Open Connection </span>
    <span *ngIf="isConnected"> Connected </span>
  </p>
  <input type="text" (keypress)="onKeyDown($event)"/>
  <ul>
    <li *ngFor="let message of messages">
      <p>{{message}}</p>
    </li>
  </ul>
  `,
  styleUrls: ['rtc-client.component.css']
})

export class DataChannelClient {
  headline: string;
  copy: string;
  client: any;
  messages: string[];
  isConnected: boolean;
  ref: ChangeDetectorRef;
  elem: any;
  constructor(private _ref: ChangeDetectorRef, private _el: ElementRef) {

    this.headline = 'DataChannel';
    this.copy = 'WebRTC DataChannels allow for fast peer to peer communication. This example creates a channel, gives the client a unique identifier (i.e. username), and establishes the connection. Firebase is used for signaling. Once the connection is established, the keyCode for whatever key is typed will appear in the remote UI. Open two windows of Chrome or Firefox to test. A more impressive demo will be coming soon.';

    this.ref = _ref;
    this.elem = _el.nativeElement;
    this.isConnected = false;

    console.log(config);

  }
  onKeyDown(ev) {

    this.client.channel.send(ev.keyCode.toString());

    if(ev.keyCode === 13) {
      ev.target.value = '';
    }

  }
  updateMessages(message: string) {
    if(this.messages.length > 24) this.messages = [];
    this.ref.detectChanges();
  }
  onClick() {

    if(!this.isConnected) {

      this.client = new DataChannel(config.room, config.username, config.server);

      this.messages = [];

      this.client.emitter.subscribe((message)=>{

        if(message === 'open') {
          this.isConnected = true;
          this.elem.querySelector('input').focus();
          this.client.observer.subscribe((res)=>{
            console.log(res[res.length-1]);
            this.messages.push(res[res.length-1].data);
            this.updateMessages(message);
          });
        }

      });

    }

  }
}
