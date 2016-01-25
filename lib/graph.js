var graphs={};
graphs.UndirectedGraph = function(){
  this.vertices = {};
  this.edges = [];
};

graphs.UndirectedGraph.prototype = {
  addVertex : function(vertex){
              this.vertices[vertex] = [];
            },
  addEdge : function(from,to){
              this.vertices[from].push(to);
              this.vertices[to].push(from);
              this.edges.push([from,to]);
            },
  order : function(){
              return Object.keys(this.vertices).length;
            },
  hasEdgeBetween : function(vertex1,vertex2){
              return this.vertices[vertex2].indexOf(vertex1) > -1 &&  this.vertices[vertex1].indexOf(vertex2) >-1;
            },
  degree : function(vertex){
              return this.vertices[vertex].length;
            },
  size : function(){
              return this.edges.length;
            },
  pathBetween : function(from,to,visiting){
                  visiting = visiting || [];
                  if(from == to){
                    return visiting.concat(from);
                  }
                  if(visiting.indexOf(from) == -1){
                    for(var i = 0; i<this.vertices[from].length ; i++){ 
                      var path = this.pathBetween(this.vertices[from][i],to,visiting.concat(from));
                      if(path[path.length-1] == to) return path;
                    };
                  }
                  return [];
                },
  farthestVertex : function(vertex){
                  var farthestVertex = vertex;
                  var length = 0;
                  for(var i = 0; i < Object.keys(this.vertices).length; i++){
                    var v = Object.keys(this.vertices)[i];
                    var pathLength = this.pathBetween(vertex,v).length;
                    if(length < pathLength){
                      length = pathLength;
                      farthestVertex = v;
                    }
                  };
                  return farthestVertex;
                },                
  allPaths : function(from,to,visited,paths){
               var paths = paths||[];
               var visited = visited ||[];
               if(from == to){
                 return visited.concat(from);
               }
               var adjFrom = this.vertices[from];
               for(var i =0; i<adjFrom.length;i++){
                 if(visited.indexOf(adjFrom[i]) == -1){
                    var path = this.allPaths(adjFrom[i],to,visited.concat(from),paths);
                    if(path[path.length-1] == to) paths.push(path);
                 };
               };
               return paths;
             },               
};









graphs.DirectedGraph = function(){
  this.vertices = {};
  this.edges = [];
};

graphs.DirectedGraph.prototype = {
   addVertex : function(vertex){
              this.vertices[vertex] = [];
            },
  addEdge : function(from,to){
              this.vertices[from].push(to);
              this.edges.push([from,to]);
            },
  order : function(){
              return Object.keys(this.vertices).length;
            },
  hasEdgeBetween : function(from,to){
              return this.vertices[from].indexOf(to) > -1;
            },
  degree : function(vertex){
              return this.vertices[vertex].length;
            },
  size : function(){
              return this.edges.length;
            },
  pathBetween : function(from,to,visiting){
                   visiting = visiting || [];
                  if(from == to){
                    return visiting.concat(from);
                  }
                  if(visiting.indexOf(from) == -1){
                    for(var i = 0; i<this.vertices[from].length ; i++){ 
                      var path = this.pathBetween(this.vertices[from][i],to,visiting.concat(from));
                      if(path[path.length-1] == to) return path;
                    };
                  }
                  return [];
                },
  farthestVertex : function(vertex){
                  var farthestVertex = vertex;
                  var length = 0;
                  for(var i = 0; i < Object.keys(this.vertices).length; i++){
                    var v = Object.keys(this.vertices)[i];
                    var pathLength = this.pathBetween(vertex,v).length;
                    if(length < pathLength){
                      length = pathLength;
                      farthestVertex = v;
                    }

                  };
                  return farthestVertex;
                },
  allPaths : function(from,to,visited,paths){
               var paths = paths||[];
               var visited = visited ||[];
               if(from == to){
                 return visited.concat(from);
               }
               var adjFrom = this.vertices[from];
               for(var i =0; i<adjFrom.length;i++){
                 if(visited.indexOf(adjFrom[i]) == -1){
                    var path = this.allPaths(adjFrom[i],to,visited.concat(from),paths);
                    if(path[path.length-1] == to) paths.push(path);
                 };
               };
               return paths;
             },     
};
module.exports = graphs;


