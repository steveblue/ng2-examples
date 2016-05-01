import { bootstrap } from 'angular2/platform/browser';
import { Component, bind } from 'angular2/core';
import { ROUTER_PROVIDERS, RouteConfig, RouterOutlet, RouterLink } from 'angular2/router';
import { LocationStrategy, PathLocationStrategy } from 'angular2/platform/common';

import {About} from './src/views/about';
import {Default} from './src/views/default';

// console.log(About);

@Component({
  selector: 'app',
  template: `
    <a [routerLink]="['./Default']">Home</a>
	  <a [routerLink]="['./About']">About</a>
    <div class="outer-outlet">
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [RouterOutlet, RouterLink]
})

@RouteConfig([
  {path:'/', name: 'Default', component: Default},
  {path:'/about', name: 'About', component: About}
])

export class App {}

bootstrap(App, [
  ROUTER_PROVIDERS,
  bind(LocationStrategy).toClass(PathLocationStrategy),
]);
