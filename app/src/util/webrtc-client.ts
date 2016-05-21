import { Injectable, EventEmitter } from '@angular/core';

declare let Firebase:any;

@Injectable()
export class DataChannelClient {

  public id: string;
  public key: string;
  public conf: any;
  public db: any;
  public url: string;
  public server: any;
  public remote: any;
  public channel: any;
  public peerConnection: any;
  public hasPulse: boolean;
  public hasChannel: boolean;
  public dataChannel: any;
  public emitter: EventEmitter<any>;
  public connections: any;

  constructor(private _key: number,
              private _id: string,
              private _url: string) {

    var self = this;
    this.id = _id || Math.random().toString().replace('.', ''); // make uuid?
    this.key = _key || '1234'; // prompt from user
    this.url = _url || 'https://synth-io-c7564.firebaseio.com/';
    this.db = new Firebase(this.url);
    this.hasPulse = false;
    this.hasChannel = false;
    this.connections = {};
    this.remote = null;

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

    this.channel.signal.on('child_added', this.handleSignalChannelMessage.bind(self));
    this.channel.announce.on('child_added', this.handleAnnounceChannelMessage.bind(self));

    this.emitter = new EventEmitter();



    this.sendAnnounceChannelMessage();

  }

  sendAnnounceChannelMessage() {
    this.channel.announce.remove(()=>{
      this.channel.announce.push({
        sharedKey: this.key,
        id: this.id
      });
      this.emitter.emit('Announced our sharedKey is ' + this.key);
      this.emitter.emit('Announced our ID is ' + this.id);
    });
  }

  // Handle an incoming message on the announcement channel
  handleAnnounceChannelMessage(snapshot) {
    var message = snapshot.val();
    if (message.id != this.id && message.sharedKey == this.key) {
      this.emitter.emit('Discovered matching announcement from ' + message.id);
      this.remote = message.id;
      this.initiateWebRTCState();
      this.connect();
    }
  }

  /* == Signal Channel Functions ==
   * The signal channels are used to delegate the WebRTC connection between
   * two peers once they have found each other via the announcement channel.
   *
   * This is done on Firebase as well. Once the two peers communicate the
   * necessary information to 'find' each other via WebRTC, the signalling
   * channel is no longer used and the connection becomes peer-to-peer.
   */

  // Send a message to the remote client via Firebase
  sendSignalChannelMessage(message) {
    message.sender = this.id;
    this.db.child('messages').child(this.remote).push(message);
  }

  // Handle a WebRTC offer request from a remote client
  handleOfferSignal(message) {
    this.hasPulse = true;
    this.emitter.emit('Client has pulse');
    this.remote = message.sender;
    this.initiateWebRTCState();
    this.startSendingCandidates();
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(message));
    this.peerConnection.createAnswer((sessionDescription) => {
      this.emitter.emit('Sending answer to ' + message.sender);
      this.peerConnection.setLocalDescription(sessionDescription);
      this.sendSignalChannelMessage(sessionDescription.toJSON());
    }, function(err) {
      console.error('Could not create offer', err);
    });
  }

  // Handle a WebRTC answer response to our offer we gave the remote client
  handleAnswerSignal(message) {
    this.emitter.emit('Handling answer from '+ this.remote);
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(message));
  }

  // Handle an ICE candidate notification from the remote client
  handleCandidateSignal(message) {
    var candidate = new RTCIceCandidate(message);
    this.emitter.emit('Adding candidate to peerConnection: '+ this.remote);
    this.peerConnection.addIceCandidate(candidate);
  }

  // This is the general handler for a message from our remote client
  // Determine what type of message it is, and call the appropriate handler
  handleSignalChannelMessage(snapshot) {
    var message = snapshot.val();
    var sender = message.sender;
    var type = message.type;

    if(!this.hasChannel) {
      this.emitter.emit('Received a \'' + type + '\' signal from ' + sender + ' of type ' + type);
      if (type == 'offer') {
        this.handleOfferSignal(message);
      }
      else if (type == 'answer') {
        this.handleAnswerSignal(message);
      }
      else if (type == 'candidate' && this.hasPulse) {
        this.handleCandidateSignal(message);
      }
    }

  }

  /* == ICE Candidate Functions ==
   * ICE candidates are what will connect the two peers
   * Both peers must find a list of suitable candidates and exchange their list
   * We exchange this list over the signalling channel (Firebase)
   */

  // Add listener functions to ICE Candidate events
  startSendingCandidates() {
    this.peerConnection.onicecandidate = this.handleICECandidate.bind(this);
  }

  // This is how we determine when the WebRTC connection has ended
  // This is most likely because the other peer left the page
  handleICEConnectionStateChange() {
    if (this.peerConnection.iceConnectionState == 'disconnected') {
      this.emitter.emit('Client disconnected!');
      this.sendAnnounceChannelMessage();
    }
  }

  // Handle ICE Candidate events by sending them to our remote
  // Send the ICE Candidates via the signal channel
  handleICECandidate(event) {
    var candidate = event.candidate;
    if (candidate) {
      candidate = candidate.toJSON();
      candidate.type = 'candidate';
      this.emitter.emit('Sending candidate to ' + this.remote);
      this.sendSignalChannelMessage(candidate);
    } else {
      this.emitter.emit('All candidates sent');
    }
  }

  /* == Data Channel Functions ==
   * The WebRTC connection is established by the time these functions run
   * The hard part is over, and these are the functions we really want to use
   *
   * The functions below relate to sending and receiving WebRTC messages over
   * the peer-to-peer data channels
   */

  // This is our receiving data channel event
  // We receive this channel when our peer opens a sending channel
  // We will bind to trigger a handler when an incoming message happens
  handleDataChannel(event) {
    console.log(event);
    event.channel.onmessage = this.handleDataChannelMessage.bind(this);
  }

  // This is called on an incoming message from our peer
  // You probably want to overwrite this to do something more useful!
  handleDataChannelMessage(event) {
    console.log(event.data);
    this.emitter.emit('Recieved Message: ' + event.data);
    //document.write(event.data + '<br />');
  }

  // This is called when the WebRTC sending data channel is offically 'open'
  handleDataChannelOpen() {
    this.hasChannel = true;
    this.emitter.emit('Data channel created! The channel is: '+ this.dataChannel.readyState);

    if(this.dataChannel.readyState == 'open') {
      // this.dataChannel.send('hello '+ this.remote);
      // this.dataChannel.send('world '+ this.id);
    }
  }

  // Called when the data channel has closed
  handleDataChannelClosed() {
    this.emitter.emit('The data channel has been closed!');
  }

  // Function to offer to start a WebRTC connection with a peer
  connect() {
    this.hasPulse = true;
    this.emitter.emit('Client has pulse');

    this.startSendingCandidates();

    this.peerConnection.createOffer((sessionDescription) => {
      this.emitter.emit('Sending offer to ' + this.remote);
      this.peerConnection.setLocalDescription(sessionDescription);
      this.sendSignalChannelMessage(sessionDescription.toJSON());
    }, function(err) {
      console.error('Could not create offer', err);
    });


  }

  // Function to initiate the WebRTC peerconnection and dataChannel
  initiateWebRTCState() {

    this.peerConnection = new webkitRTCPeerConnection(this.server);
    this.peerConnection.ondatachannel = this.handleDataChannel.bind(this);
    this.peerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChange.bind(this);
    this.dataChannel = this.peerConnection.createDataChannel('synth-io', {
        ordered: false, //no guaranteed delivery, unreliable but faster
        maxRetransmitTime: 1000, //milliseconds
    });
    this.dataChannel.onopen = this.handleDataChannelOpen.bind(this);
    this.dataChannel.onmessage = this.handleDataChannelMessage.bind(this);
    this.connections[this.remote] = this.peerConnection;

    this.emitter.emit('Setting up peer connection with ' + this.remote);


  }

}
