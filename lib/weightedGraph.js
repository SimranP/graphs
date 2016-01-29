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

var findMinimumDistanceVertex = function(distances,all_Vertices){
  var vertexToBeVisited = all_Vertices.reduce(function(a,b){return distances[a]< distances[b] ? a :b});
  return vertexToBeVisited;
};

var fillInitialValuesIn = function(all_Vertices,source,distances,parents){
   all_Vertices.forEach(function(vertex){
      distances[vertex] =  Infinity;
      parents[vertex] = undefined;
    });
    distances[source] = 0;
    parents[source] = {dest:source,edge:undefined};
};

var extractAdjEdges = function(vertices,vertex,all_Edges){
 return  vertices[vertex].filter(function(adjEdge){
   return all_Edges.indexOf(adjEdge) >= 0;
 });
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
  dijkstra_algo : function(source){
                  var all_Vertices = Object.keys(this.vertices),all_Edges = this.edges,distances = {},parents = {};
                  fillInitialValuesIn(all_Vertices,source,distances,parents);
                  while(all_Vertices.length){ 
                    var vertexToBeVisited = findMinimumDistanceVertex(distances,all_Vertices);
                    var adjEdges =  extractAdjEdges(this.vertices,vertexToBeVisited,all_Edges);                  
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
