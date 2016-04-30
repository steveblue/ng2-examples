import { Component } from "angular2/core";

@Component({
  template: `
  <div>
    {{ message }}
  </div>
`
})

export class Default {
  message: String;
  constructor() {
    this.message = 'Hello Angular 2!';
  }
}
