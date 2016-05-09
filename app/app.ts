import { Component, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router, Routes } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import {About} from './src/views/about';
import {MusicPlayer} from './src/views/music-player';

// console.log(About);

@Component({
  selector: 'app',
  template: `
    <a [routerLink]="['/']" class="nav__item">Home</a>
	  <a [routerLink]="['/about']" class="nav__item">About</a>
    <div class="outer-outlet">
      <router-outlet></router-outlet>
    </div>
  `,
    directives : [ROUTER_DIRECTIVES]
})

@Routes([
  {path:'/', component: MusicPlayer},
  {path:'/about', component: About}
])

export class App {
  constructor(router: Router) {

  }
}

bootstrap(App, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(LocationStrategy, { useClass : PathLocationStrategy })
]);
