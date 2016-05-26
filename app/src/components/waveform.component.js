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
var core_1 = require('@angular/core');
var media_service_1 = require('../services/media-service');
var meter_1 = require('../models/meter');
var WaveformComponent = (function () {
    function WaveformComponent(mediaService, ref, elem) {
        this.init = false;
        this.mediaService = mediaService;
        this.elem = elem;
        this.ref = ref;
        this.color = '#8DE969';
        this.width = window.innerWidth;
        this.height = 240;
        this.data = [];
        this.meters = [];
        this.newMeter();
        this.isVisible = false;
        this.controls = new core_1.EventEmitter();
    }
    WaveformComponent.prototype.ngOnInit = function () {
        var _this = this;
        var x = d3.scale.linear().domain([0, 512]).range([0, window.innerWidth]), y = d3.scale.linear().domain([0, 255]).range([this.height, 0]), line = d3.svg.line()
            .interpolate('basis')
            .x(function (d, i) { return x(i); })
            .y(function (d, i) { return y(d); });
        this.shape = this.elem.nativeElement.getElementsByClassName('levels')[0];
        this.mediaService.emitter.subscribe(function (res) {
            _this.data = res;
            res.unshift(0);
            res.push(0);
            _this.path = line(res);
            if (_this.meters.length > 0) {
                for (var i = 0; i < _this.meters.length; i++) {
                    //this.meters[i].level.points[0].y = this.height - this.shape.getPointAtLength(this.meters[i].position.x).y;
                    //this.meters[i].val = this.scale(this.meters[i].level.points[0].y, this.height, 0, 0, 255);
                    _this.meters[i].val = _this.data[_this.scale(_this.meters[i].position.x, 0, window.innerWidth, 0, 1024)];
                    _this.meters[i].transform = 'translate(' + _this.meters[i].position.x + ', 0)';
                    _this.meters[i].level.points[0].y = _this.height - _this.scale(_this.meters[i].val, 0, 255, 0, _this.height);
                }
                _this.controls.emit({
                    meters: _this.meters
                });
                _this.ref.detectChanges();
            }
            //console.log(this.meters[0].val);
        });
    };
    // ngOnDestroy() {
    //   this.mediaService.emitter.unsubscribe();
    // }
    WaveformComponent.prototype.onMouseMove = function (ev) {
        if (this.selected !== 1000) {
            this.meters[this.selected].position.x = ev.clientX;
        }
    };
    WaveformComponent.prototype.onMouseLeave = function (ev) {
        // this.playhead.isVisible = false;
        // this.ref.detectChanges();
    };
    WaveformComponent.prototype.scale = function (v, min, max, gmin, gmax) {
        v = parseInt(v);
        return parseInt(((v - min) / (max - min)) * (gmax - gmin) + gmin);
    };
    WaveformComponent.prototype.newMeter = function () {
        this.meters.push(new meter_1.Meter(this.height, this.meters.length));
        this.selected = this.meters.length - 1;
    };
    WaveformComponent.prototype.addMeter = function () {
        if (!this.init) {
            this.isVisible = true;
            this.init = true;
        }
        else {
            this.meters.push(new meter_1.Meter(this.height, this.meters.length));
            this.selected = this.meters.length - 1;
        }
    };
    WaveformComponent.prototype.hideMeters = function () {
        this.isVisible = false;
    };
    WaveformComponent.prototype.showMeters = function () {
        this.isVisible = true;
    };
    WaveformComponent.prototype.onMeterClick = function (ev, meter) {
        if (this.selected === meter.index) {
            this.selected = 1000;
        }
        else {
            this.selected = meter.index;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WaveformComponent.prototype, "path", void 0);
    WaveformComponent = __decorate([
        core_1.Component({
            selector: 'waveform-monitor',
            moduleId: module.id,
            templateUrl: 'waveform.component.html',
            styleUrls: ['waveform.component.css'],
            providers: [media_service_1.MediaService]
        }), 
        __metadata('design:paramtypes', [media_service_1.MediaService, core_1.ChangeDetectorRef, core_1.ElementRef])
    ], WaveformComponent);
    return WaveformComponent;
}());
exports.WaveformComponent = WaveformComponent;
