import { Component, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router, Routes } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import {Default} from './src/views/default';
import {About} from './src/views/about';
import {MusicPlayer} from './src/views/music-player';
import {GlobalNav} from './src/components/nav';

// console.log(About);

@Component({
  selector: 'app',
  template:`
    <global-nav></global-nav>
    <div class="outer-outlet">
      <router-outlet></router-outlet>
    </div>
   `,
   directives : [ROUTER_DIRECTIVES, GlobalNav],
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
    console.log(router);
  }
  
}

bootstrap(App, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(LocationStrategy, { useClass : PathLocationStrategy })
]);
