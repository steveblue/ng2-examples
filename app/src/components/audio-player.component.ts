import { Component, ElementRef, Inject, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MediaService } from '../services/media-service';
import { WaveformComponent } from './waveform.component';

declare let module: any;

@Component({
selector: 'audio-player',
template: `
  <audio controls src="{{url}}" type="audio/mpeg"
  (play)="onPlay($event)"
  (ended)="onTrackEnded($event)">

  </audio>
  <waveform-monitor></waveform-monitor>
`,
directives: [WaveformComponent],
providers: [MediaService],
moduleId: module.id,
styleUrls: ['audio-player.component.css']

})

export class AudioPlayer implements OnInit, OnDestroy {


  audioStream: any;
  elem: HTMLElement;
  audioElem: any;
  ctx: AudioContext;
  analyzer: AnalyserNode;
  processor: ScriptProcessorNode;
  sourceNode: MediaElementAudioSourceNode;
  freqData: Uint8Array;
  mediaService: MediaService;

  @Input() url: string;
  @Input() control: any;
  @Output() onended: any;
  @Output() controls: any;

  constructor(elem: ElementRef, mediaService: MediaService, @Inject('audioContext') private context) {
     this.elem = elem.nativeElement;
     this.mediaService = mediaService;
     this.ctx = context;
     this.analyzer = this.ctx.createAnalyser();
     this.processor = this.ctx.createScriptProcessor(1024);
     this.processor.connect(this.ctx.destination);
     this.analyzer.connect(this.processor);
     this.freqData = new Uint8Array(this.analyzer.frequencyBinCount);
     this.onended = new EventEmitter();
  }

  ngOnInit() {

    this.audioElem = this.elem.querySelector('audio');
    this.sourceNode = this.ctx.createMediaElementSource(this.audioElem);
    this.sourceNode.connect(this.analyzer);
    this.sourceNode.connect(this.ctx.destination);

    this.control.subscribe((control)=>{
      if(control.action === 'play') {
        this.audioElem.play();
      }
      if(control.action === 'pause') {
        this.audioElem.pause();
      }
    });

  }

  ngOnDestroy() {

    this.processor.onaudioprocess = function() {};
    this.sourceNode.disconnect();
    this.sourceNode = null;

  }

  onPlay(ev) {

    let uint8ArrayToArray = function(uint8Array) {
        let array = [];

        for (let i = 0; i < uint8Array.byteLength; i++) {
            array[i] = uint8Array[i];
        }

        return array;
    };

    this.processor.onaudioprocess = (e) => {

        this.analyzer.getByteFrequencyData(this.freqData);
        this.mediaService.setFrequencyData(uint8ArrayToArray(this.freqData));

    };

  }

  onTrackEnded(ev) {

    this.processor.onaudioprocess = function() {};
    this.onended.emit();

  }

}
