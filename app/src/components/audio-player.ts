import { Component, ElementRef, Inject, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Visualizer } from "./vizualizer";

@Component({
selector: 'audio-player',
inputs: ['url'],
template: `
  <audio controls src="{{url}}"
  (play)="onPlay($event)"
  (ended)="onEnded($event)"></audio>
  <visualizer *ngIf="emitter" [stream]="emitter"></visualizer>
`,
directives: [Visualizer]
})

export class AudioPlayer implements OnInit {
  url: String;
  audioStream: any;
  elem: HTMLElement;
  audioElem: any;
  ctx: AudioContext;
  analyzer: AnalyserNode;
  processor: ScriptProcessorNode;
  sourceNode: MediaElementAudioSourceNode;
  freqData: Uint8Array;
  emitter: EventEmitter<any>;
  constructor(elem: ElementRef, @Inject('audioContext') private context) {
     this.elem = elem.nativeElement;
     this.ctx = context;
     this.analyzer = this.ctx.createAnalyser();
     this.processor = this.ctx.createScriptProcessor(1024);
     this.processor.connect(this.ctx.destination);
     this.analyzer.connect(this.processor);
     this.freqData = new Uint8Array(this.analyzer.frequencyBinCount);
     this.emitter = new EventEmitter();
  }
  ngOnInit() {

    this.audioElem = this.elem.querySelector('audio');
    this.sourceNode = this.ctx.createMediaElementSource(this.audioElem);
    this.sourceNode.connect(this.analyzer);
    this.sourceNode.connect(this.ctx.destination);

    //console.dir(this.audioElem);
  }
  onPlay(ev) {

    var uint8ArrayToArray = function(uint8Array) {
        var array = [];

        for (var i = 0; i < uint8Array.byteLength; i++) {
            array[i] = uint8Array[i];
        }

        return array;
    };

    this.processor.onaudioprocess = () => {
        this.analyzer.getByteFrequencyData(this.freqData);
        //console.log(map);
        this.emitter.next(uint8ArrayToArray(this.freqData));
    };

  }

  onEnded(ev) {
    // this.sourceNode.disconnect();
    // this.sourceNode = null;
    this.processor.onaudioprocess = function() {};
  }

}
