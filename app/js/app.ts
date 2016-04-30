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
  names: Array<string>;
  constructor() {
    this.message = 'Hello Angular 2!';
  }
}
bootstrap(HelloWorld);
