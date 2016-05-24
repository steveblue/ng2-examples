
declare let THREE:any;
declare let Promise:any;

export class Scene {
  
  public landscape: any;
  
  constructor() {

     this.landscape =  [

          [0, 0, 0],
          [0, 1, 0],
          [0, 1, 1]

     ];
    
    }
    
    fetch (path: string) {
      
      var terrainLoader = new THREE.TerrainLoader();

      return new Promise(function(res,rej){
        terrainLoader.load(path, function(data) {
          res([data, path]);
        });
      });

    }
    
} 