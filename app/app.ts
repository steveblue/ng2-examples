import { Component, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS, RouteConfig, RouterOutlet, RouterLink } from '@angular/router-deprecated';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import {About} from './src/views/about';
import {MusicPlayer} from './src/views/music-player';

// console.log(About);

@Component({
  selector: 'app',
  template: `
    <a [routerLink]="['./Player']" class="nav__item">Home</a>
	  <a [routerLink]="['./About']" class="nav__item">About</a>
    <div class="outer-outlet">
      <router-outlet></router-outlet>
    </div>
  `,
  directives : [RouterOutlet, RouterLink]
})

@RouteConfig([
  {path:'/', name: 'Player', component: MusicPlayer},
  {path:'/about', name: 'About', component: About}
])

export class App {
  constructor() {

  }
}

bootstrap(App, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(LocationStrategy, { useClass : PathLocationStrategy })
]);
