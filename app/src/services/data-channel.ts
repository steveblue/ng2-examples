import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

declare let Firebase:any;

@Injectable()
export class DataChannel {

  public id: string;
  public key: string;
  public name: string;
  public conf: any;
  public db: any;
  public url: string;
  public stun: any;
  public remotePeer: any;
  public observer: Observable<any>;
  public channelObserver: Observer<any>;
  public peerConnection: any;
  public hasPulse: boolean;
  public isOpen: boolean;
  public channel: any;
  public channels: any;
  public dataChannel: any;
  public emitter: EventEmitter<any>;
  public connections: any;
  public debug : boolean;
  public isWebSocket: boolean;
  public count : number;
  public store : {
    messages: any
  };

  constructor(private _key: string,
              private _id: string,
              private _url: string) {

    var self = this;
    this.id = _id || Math.random().toString().replace('.', ''); // the username, unique id that makes each peer => make uuid?
    this.key = _key || '1234'; // the room name.
    this.url = _url; // replace with your server name
    this.name = 'channel'; // the name of the channel
    this.db = new Firebase(this.url); // only supports Firebase for now, support for custom web socket server in the future.
    this.count = 0;

    this.hasPulse = false;
    this.isOpen = false;
    this.connections = {};
    this.remotePeer = null;
    this.isWebSocket = false;
    this.debug = false;
    

    this.store = { messages: [] };

    this.stun = {
      iceServers: [{
        url: 'stun:stun.l.google.com:19302'
      }]
    };

    this.conf = {
      ordered: false,
      maxRetransmitTime: 1000
    };


    this.channels = {
      announce: this.db.child('announce'),
      signal: this.db.child('messages').child(this.id)
    };

    this.channels.signal.on('child_added', this.onSignal.bind(self));
    this.channels.announce.on('child_added', this.onAnnounce.bind(self));

    this.emitter = new EventEmitter();
    this.observer = new Observable( observer => this.channelObserver = observer ).share();

    this.sendAnnounce();

  }

  sendAnnounce() {
    
    var RTCPeerConnection =  (<any>window).RTCPeerConnection ||  (<any>window).mozRTCPeerConnection ||
                      (<any>window).webkitRTCPeerConnection;
    var msg = {
        sharedKey: this.key,
        id: this.id,
        method: !RTCPeerConnection ? 'socket' : 'webrtc'
      };
      
    if(!RTCPeerConnection) {
      this.isWebSocket = true;
    }
                       
    this.channels.announce.remove(()=>{
      this.channels.announce.push(msg);
      if(this.debug) console.log('Announced our sharedKey is ' + this.key);
      if(this.debug) console.log('Announced our ID is ' + this.id);
    });
 
  }

  onAnnounce(snapshot) {
    
    var msg = snapshot.val();
    if (msg.id != this.id && msg.sharedKey == this.key) {
      
      if(this.debug) console.log('Discovered matching announcement from ' + msg.id);
      this.remotePeer = msg.id;
      
      if(msg.method === 'webrtc' && this.isWebSocket === false) {
          this.init();
          this.connect();
      } else {
        this.sendSignal({
          id: this.id,
          key: this.key,
          url: this.url,
          type: 'ws-offer'
        });
        if(!this.isOpen) {
          this.initSocket(msg);
        }
      }
       
    }
    
  }
  
  sendSignal(msg) {
    
    msg.sender = this.id;
    this.db.child('messages').child(this.remotePeer).push(msg);
    
  }

  onOffer(msg) {
    
    var RTCSessionDescription = (<any>window).RTCSessionDescription ||  (<any>window).mozRTCSessionDescription;
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
      if(this.debug) console.error('Could not create offer', err);
    });
    
  }

  onAnswerSignal(msg) {
    
    var RTCSessionDescription =  (<any>window).RTCSessionDescription ||  (<any>window).mozRTCSessionDescription;
    if(this.debug) console.log('Handling answer from '+ this.remotePeer);
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg));
    
  }

  onCandidateSignal(msg) {
    var candidate = new  (<any>window).RTCIceCandidate(msg);
    if(this.debug) console.log('Adding candidate to peerConnection: '+ this.remotePeer);
    this.peerConnection.addIceCandidate(candidate);
  }

  onSignal(snapshot) {

    var msg = snapshot.val();
    var sender = msg.sender;
    var type = msg.type;

    if(!this.isOpen) {
      if(this.debug) console.log('Received a \'' + type + '\' signal from ' + sender + ' of type ' + type);
      if(type == 'message') {
        this.onWebSocketMessage(msg);
      }
      if(type == 'ws-offer') {
        if(!this.isOpen) {
          this.initSocket(msg);
        }
      }
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
  
  onDataChannelOpen() {
    


    if(this.debug) console.log('Data channel created! The channel is: '+ this.channel.readyState);

    if(this.channel.readyState == 'open') {

      this.isOpen = true;
      this.emitter.emit('open');

    }
    

  }

  onDataChannelClosed() {
    
    if(this.debug) console.log('The data channel has been closed!');
    
  }
  

  onDataChannelMessage(ev) {
    
    this.store.messages.push({
      id: this.count++,
      data: JSON.parse(ev.data),
      sender: this.remotePeer,
      createdAt: new Date()
    });
    this.channelObserver.next(this.store.messages);
    if(this.debug) console.log('Received Message: ' + ev.data);

  }
  
  onWebSocketMessage(ev) {

    this.store.messages.push({
      id: this.count++,
      data: JSON.parse(ev.data),
      sender: ev.sender,
      createdAt: new Date()
    });
  
    this.channelObserver.next(this.store.messages);
    if(this.debug) console.log('Received Message: ' + ev.data);
    
  }
  
  onWebSocketSignal(snapshot) {

    var msg = snapshot.val();
    var sender = msg.sender;
    var type = msg.type;

    if( sender === this.remotePeer ) {
      if(this.debug) console.log('Received a \'' + type + '\' signal from ' + sender + ' of type ' + type);
      if(type == 'message') {
        this.onWebSocketMessage(msg);
      }
      if(type == 'ws-offer') {
        this.initSocket(msg);
      }
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

  
  sendSocketMessage(data: any) {
    
     let msg = {
       type: 'message',
       sender: this.id,
       data: data
     }
     
     if(this.debug) console.log('Sending WebSocket message from: '+msg.sender+ ' to: '+this.remotePeer);
     this.db.child('messages').child(this.remotePeer).push(msg);
     
  }
  
  createWebSocketChannel() {
    
    return {
      send: this.sendSocketMessage.bind(this)
    }
    
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

    var RTCPeerConnection =  (<any>window).RTCPeerConnection ||  (<any>window).mozRTCPeerConnection ||
                         (<any>window).webkitRTCPeerConnection;

    this.peerConnection = new RTCPeerConnection(this.stun);
    this.peerConnection.ondatachannel = this.onDataChannel.bind(this);
    this.peerConnection.oniceconnectionstatechange = this.onICEStateChange.bind(this);
    this.channel = this.peerConnection.createDataChannel(this.name, this.conf);
    this.channel.onopen = this.onDataChannelOpen.bind(this);
    this.channel.onmessage = this.onDataChannelMessage.bind(this);
    this.connections[this.remotePeer] = this.peerConnection;

    if(this.debug) console.log('Setting up peer connection with ' + this.remotePeer);

  }
  
  initSocket(conf: any) {
    
    this.remotePeer = conf.id;
    
    if(!this.isOpen) {
      
      this.isOpen = true;
      this.emitter.emit('open');
      
      this.channel = this.createWebSocketChannel();  
      this.channels.websocket = this.db.child('messages').child(this.id);
      this.channels.websocket.on('child_added', this.onWebSocketSignal.bind(this));

      this.hasPulse = true;
      if(this.debug) console.log('Client has pulse');
      if(this.debug) console.log('Setting up websocket connection with ' + this.remotePeer);
    }

  }

}
