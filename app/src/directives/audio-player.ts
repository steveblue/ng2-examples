import { Component } from "angular2/core";

@Component({
selector: 'audio-player',
inputs: ['url'],
template: `
  <audio controls src="{{url}}">
`
})

export class AudioPlayer {
  url: String;
}
