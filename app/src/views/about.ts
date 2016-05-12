import { Component } from '@angular/core';

@Component({
  template: `
  <h1>
    {{ headline }}
  </h1>
  <p>
    {{copy}}
  </p>
  <p>
  Follow <a href="https://twitter.com/iplayitofflegit">@iplayitofflegit</a> on Twitter.
  </p>
  `,
  moduleId: module.id,
  styleUrls: ['about.css']
})

export class About {
  headline: String;
  copy: String;
  constructor() {
    this.headline = 'About';
    this.copy = 'This web app contains examples of components built with Angular 2 and is maintained by Steve Belovarich, a full stack web engineer based in Los Angeles, CA.';
  }
}
