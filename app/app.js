"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var common_1 = require('angular2/platform/common');
var about_1 = require('src/views/about');
var default_1 = require('src/views/default');
// console.log(About);
var App = (function () {
    function App() {
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <a [routerLink]=\"['./Default']\">Home</a>\n\t  <a [routerLink]=\"['./About']\">About</a>\n    <div class=\"outer-outlet\">\n      <router-outlet></router-outlet>\n    </div>\n  ",
            directives: [router_1.RouterOutlet, router_1.RouterLink]
        }),
        router_1.RouteConfig([
            { path: '/', name: 'Default', component: default_1.Default },
            { path: '/about', name: 'About', component: about_1.About }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
browser_1.bootstrap(App, [
    router_1.ROUTER_PROVIDERS,
    core_1.bind(common_1.LocationStrategy).toClass(common_1.PathLocationStrategy),
]);
