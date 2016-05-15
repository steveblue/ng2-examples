export class Meter {
  position: any;
  level: any;
  playhead: any;
  isVisible: boolean;
  val: number;
  index: number;
  constructor(private height: number, private i: number) {
    
    this.position = {
        x: 0,
        y: 0
    };
    
    this.val = 0;
    
    this.isVisible = false;
    
    this.index = i;
    
    this.level = {
      color: 'rgba(255,255,255,1.0)',
      stroke : 6,
      val: 0,
      points: [{
        x: 0,
        y: height
      },
      {
        x: 0,
        y: height
      }]
    };
    
    this.playhead = {
      color: 'rgba(255,255,255,0.3)',
      stroke : 6,
      points: [{
        x: 0,
        y: 0
      },
      {
        x: 0,
        y: height
      }]
    };
  };
  
}