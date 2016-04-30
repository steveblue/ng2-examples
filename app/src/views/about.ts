import { Component } from "angular2/core";

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
