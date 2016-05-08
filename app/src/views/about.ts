import { Component } from '@angular/core';

@Component({
  template: `
  <div>
    {{ message }}
  </div>
`
})

export class About {
  message: String;
  constructor() {
    this.message = 'About';
  }
}
