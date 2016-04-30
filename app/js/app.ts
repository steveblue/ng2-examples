import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";
@Component({
  selector: 'hello-world',
  template: `
  <div>
    {{ message }}
  </div>
`
})
class HelloWorld {
  message: String;
  constructor() {
    this.message = 'Hello Angular 2!';
  }
}
bootstrap(HelloWorld);
