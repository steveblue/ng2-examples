import { Component, provide, ElementRef } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router, Routes } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import {Default} from './src/views/default.component';
import {About} from './src/views/about.component';
import {MusicPlayer} from './src/views/music-player.component';
import {GlobalNav} from './src/components/nav.component';

// console.log(About);

@Component({
  selector: 'app',
  template:`
    <global-nav></global-nav>
    <view></view>
    <div class="outer-outlet">
      <router-outlet></router-outlet>
    </div>

   `,
   directives : [ROUTER_DIRECTIVES, GlobalNav],
   moduleId: module.id,
   styleUrls: ['app.component.css']
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
