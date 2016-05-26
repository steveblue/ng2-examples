///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import { Component, provide, ElementRef } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router, Routes } from '@angular/router';
//import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Default } from './src/views/default.component';
import { About } from './src/views/about.component';
import { MusicPlayer } from './src/views/music-player.component';
import { UIComponentTest } from './src/views/ui-test.component';
import { DataChannelClient } from './src/views/rtc-client.component';
import { RemoteUIDemo } from './src/views/remote-ui-demo.component';
import { GlobalNav } from './src/components/nav.component';

declare let module: any;

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
   styleUrls: ['app.component.css']
})

@Routes([
  {path:'/', component: Default},
  {path:'/music', component: MusicPlayer},
  {path:'/ui', component: UIComponentTest},
  {path:'/about', component: About},
  {path:'/remote', component: RemoteUIDemo},
  {path:'/webrtc/client', component: DataChannelClient}
])

export class App {

  constructor(router: Router) {
    //console.log(router);
  }

}

bootstrap(App, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS//,
  //provide(LocationStrategy, { useClass : HashLocationStrategy })
]);
