var graphs = {};
graphs.Edge = function(edge,from,to,weight){
  this.edge = edge;
  this.from = from;
  this.to =to;
  this.weight = weight;
};
graphs.WeightedGraph =function(){
  this.vertices = {};
  this.edges = [];
};

graphs.WeightedGraph.prototype = {
  addVertex :  function(vertex){
                 this.vertices[vertex] = [];
               },
  addEdge : function(edge){
                 this.vertices[edge.from].push(edge);
                 this.vertices[edge.to].push(edge);
                 this.edges.push(edge);
               },
  shortestP :function(source,dest,visited,distances,visitedEdges){
                 visited = visited || []; 
                 visitedEdges = visitedEdges || [];
                  if(!distances){
                    var allVertices = Object.keys(this.vertices);
                    var distances = {}; 
                    allVertices.forEach(function(vertex){distances[vertex] =  Infinity;});
                    distances[source] = 0;
                  };
                  if(source == dest){
                    return visitedEdges;
                  }
                 var connectedEdges = this.vertices[source];
                  for(var i = 0 ; i < connectedEdges.length ;i++){
                     var dis = distances[source] + connectedEdges[i].weight;
                     var adjEdge = connectedEdges[i];
                     var adjVertex = (adjEdge.to==source)?adjEdge.from : adjEdge.to;
                      console.log(visited);
                     if(distances[adjVertex] > dis){
                      distances[adjVertex] = dis;
                      distances[source] = Infinity;
                 if(visited.indexOf(source) == -1){
                      var path = this.shortestPath(adjVertex,dest,visited.concat(source),distances,visitedEdges.concat(adjEdge));
                      if(path) return path;
                     };
                 };
                 };
               },
  dijkstra_algo : function(source){
                  var all_Vertices = Object.keys(this.vertices),all_Edges = this.edges,distances = {},parents = {};
                  all_Vertices.forEach(function(vertex){
                    distances[vertex] =  Infinity;
                    parents[vertex] = undefined;
                  });
                  distances[source] = 0;
                  parents[source] = {dest:source,edge:undefined};
                  var count = all_Vertices.length;
                  for(var i = 0; i <= count;i++){ 
                    if(!all_Edges.length) break;
                    var vertexToBeVisited = all_Vertices.reduce(function(a,b){return distances[a]< distances[b] ? a :b});
                    var adjEdges = this.vertices[vertexToBeVisited].filter(function(adjEdge){return all_Edges.indexOf(adjEdge) >= 0 });
                    adjEdges.forEach(function(adjEdge){
                     var adjVertex = (adjEdge.to==source)?adjEdge.from : adjEdge.to;
                      var dis  = distances[vertexToBeVisited] + adjEdge.weight;
                      if(dis < distances[adjVertex]){
                        distances[adjVertex] = dis;
                        parents[adjVertex] = {dest:vertexToBeVisited,connectedEdge:adjEdge};
                      };
                      all_Edges.splice(all_Edges.indexOf(adjEdge),1);
                    });
                    all_Vertices.splice(all_Vertices.indexOf(vertexToBeVisited),1);
                  };
                      return {distances : distances , parents : parents};
                  },

                  shortestPath : function(source,dest){
                            var parents = this.dijkstra_algo(source).parents;
                            var end = parents[dest];
                            var path = [end.connectedEdge];
                            while(end.dest != source){
                              end = parents[parents[dest].dest];
                              path.push(end.connectedEdge);
                            };
                            return path.reverse();
                        }
};
module.exports = graphs;
