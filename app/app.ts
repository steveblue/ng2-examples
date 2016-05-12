import { Component, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router, Routes } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import {Default} from './src/views/default';
import {About} from './src/views/about';
import {MusicPlayer} from './src/views/music-player';

// console.log(About);

@Component({
  selector: 'app',
  template:`
    <nav>
      <ul>
        <li class="nav__item"><a [routerLink]="['/']" >Home</a></li>
        <li class="nav__item"><a [routerLink]="['/music']" >Music Player</a></li>
        <li class="nav__item"><a [routerLink]="['/about']" >About</a></li>
      </ul>
    </nav>
    <div class="outer-outlet">
      <router-outlet></router-outlet>
    </div>
   `,
   directives : [ROUTER_DIRECTIVES],
   moduleId: module.id,
   styleUrls: ['app.css']
})

@Routes([
  {path:'/', component: Default},
  {path:'/music', component: MusicPlayer},
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
