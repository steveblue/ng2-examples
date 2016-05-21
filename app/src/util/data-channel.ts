import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

declare let Firebase:any;

interface DataChannelMessage {
  id: number;
  createdAt: Date;
  payload: any;
}

@Injectable()
export class DataChannel {

  public id: string;
  public key: string;
  public name: string;
  public conf: any;
  public db: any;
  public url: string;
  public server: any;
  public remotePeer: any;
  public observer: Observable<any>;
  public peerConnection: any;
  public hasPulse: boolean;
  public isOpen: boolean;
  public channel: any;
  public dataChannel: any;
  public emitter: EventEmitter<any>;
  public connections: any;
  public debug : boolean;

  private _channelObserver: Observer<any>;
  private _count : number;
  private _dataStore : {
    messages: DataChannelMessage[]
  };

  constructor(private _key: string,
              private _id: string,
              private _url: string) {

    var self = this;
    this.id = _id || Math.random().toString().replace('.', ''); // make uuid?
    this.key = _key || '1234'; // prompt from user
    this.url = _url; // replace with your server name
    this.name = 'channel';
    this.db = new Firebase(this.url);
    this._count = 0;
    //this.onmessage = _onmessage || null;

    this.hasPulse = false;
    this.isOpen = false;
    this.connections = {};
    this.remotePeer = null;
    this.debug = true;

    this._dataStore = { messages: [] };

    this.server = {
      iceServers: [{
        url: 'stun:stun.l.google.com:19302'
      }]
    };

    this.conf = {
      ordered: false,
      maxRetransmitTime: 1000
    };


    this.channel = {
      announce: this.db.child('announce'),
      signal: this.db.child('messages').child(this.id)
    };

    this.channel.signal.on('child_added', this.onSignal.bind(self));
    this.channel.announce.on('child_added', this.onAnnounce.bind(self));

    this.emitter = new EventEmitter();
    this.observer = new Observable(observer =>  this._channelObserver = observer).share();

    this.sendAnnounce();

  }

  sendAnnounce() {
    this.channel.announce.remove(()=>{
      this.channel.announce.push({
        sharedKey: this.key,
        id: this.id
      });
      if(this.debug) console.log('Announced our sharedKey is ' + this.key);
      if(this.debug) console.log('Announced our ID is ' + this.id);
    });
  }

  onAnnounce(snapshot) {
    var msg = snapshot.val();
    if (msg.id != this.id && msg.sharedKey == this.key) {
      if(this.debug) console.log('Discovered matching announcement from ' + msg.id);
      this.remotePeer = msg.id;
      this.init();
      this.connect();
    }
  }

  sendSignal(msg) {
    msg.sender = this.id;
    this.db.child('messages').child(this.remotePeer).push(msg);
  }

  onOffer(msg) {
    var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
    this.hasPulse = true;
    if(this.debug) console.log('Client has pulse');
    this.remotePeer = msg.sender;
    this.init();
    this.sendCandidates();
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg));
    this.peerConnection.createAnswer((sessionDescription) => {
      if(this.debug) console.log('Sending answer to ' + msg.sender);
      this.peerConnection.setLocalDescription(sessionDescription);
      this.sendSignal(sessionDescription.toJSON());
    }, function(err) {
      console.error('Could not create offer', err);
    });
  }

  onAnswerSignal(msg) {
    var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
    if(this.debug) console.log('Handling answer from '+ this.remotePeer);
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg));
  }

  onCandidateSignal(msg) {
    var candidate = new RTCIceCandidate(msg);
    if(this.debug) console.log('Adding candidate to peerConnection: '+ this.remotePeer);
    this.peerConnection.addIceCandidate(candidate);
  }

  onSignal(snapshot) {

    var msg = snapshot.val();
    var sender = msg.sender;
    var type = msg.type;

    if(!this.isOpen) {
      if(this.debug) console.log('Received a \'' + type + '\' signal from ' + sender + ' of type ' + type);
      if (type == 'offer') {
        this.onOffer(msg);
      }
      else if (type == 'answer') {
        this.onAnswerSignal(msg);
      }
      else if (type == 'candidate' && this.hasPulse) {
        this.onCandidateSignal(msg);
      }
    }

  }

  sendCandidates() {
    this.peerConnection.onicecandidate = this.onICECandidate.bind(this);
  }

  onICEStateChange() {
    if (this.peerConnection.iceConnectionState == 'disconnected') {
      if(this.debug) console.log('Client disconnected!');
      this.sendAnnounce();
    }
  }

  onICECandidate(ev) {
    var candidate = ev.candidate;
    if (candidate) {
      candidate = candidate.toJSON();
      candidate.type = 'candidate';
      if(this.debug) console.log('Sending candidate to ' + this.remotePeer);
      this.sendSignal(candidate);
    } else {
      if(this.debug) console.log('All candidates sent');
    }
  }

  onDataChannel(ev) {
    ev.channel.onmessage = this.onDataChannelMessage.bind(this);
  }

  onDataChannelMessage(ev) {
    this._dataStore.messages.push({
      id: this._count++,
      payload: ev.data,
      createdAt: new Date()
    });
    this._channelObserver.next(this._dataStore.messages);
    if(this.debug) console.log('Received Message: ' + ev.data);

  }

  onDataChannelOpen() {


    if(this.debug) console.log('Data channel created! The channel is: '+ this.dataChannel.readyState);

    if(this.dataChannel.readyState == 'open') {

      this.isOpen = true;
      this.emitter.emit('open');

    }

  }

  onDataChannelClosed() {
    if(this.debug) console.log('The data channel has been closed!');
  }

  connect() {

    this.sendCandidates();

    this.peerConnection.createOffer((sessionDescription) => {
      if(this.debug) console.log('Sending offer to ' + this.remotePeer);
      this.peerConnection.setLocalDescription(sessionDescription);
      this.sendSignal(sessionDescription.toJSON());
    }, function(err) {
      console.error('Could not create offer for ' + this.remotePeer, err);
    });

  }


  init() {

    var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection ||
                        window.webkitRTCPeerConnection;

    this.peerConnection = new RTCPeerConnection(this.server);
    this.peerConnection.ondatachannel = this.onDataChannel.bind(this);
    this.peerConnection.oniceconnectionstatechange = this.onICEStateChange.bind(this);
    this.dataChannel = this.peerConnection.createDataChannel(this.name, this.conf);
    this.dataChannel.onopen = this.onDataChannelOpen.bind(this);
    this.dataChannel.onmessage = this.onDataChannelMessage.bind(this);
    this.connections[this.remotePeer] = this.peerConnection;

    if(this.debug) console.log('Setting up peer connection with ' + this.remotePeer);

  }

}
