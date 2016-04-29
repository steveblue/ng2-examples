import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";

@Component({
  selector: 'hello-world',
  template: `
  <div>
    Hello ng-conf
  </div>
`
})

class HelloWorld {

}

bootstrap(HelloWorld);
