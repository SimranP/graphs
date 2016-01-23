var _ = require('lodash');
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
                  if(from == to) return visiting.concat(from);
                  for(var i = 0; i<this.vertices[from].length ; i++){
                    if(visiting.indexOf(this.vertices[from][i])==-1)
                      visiting = this.pathBetween(this.vertices[from][i],to,visiting.concat(from));
                  };
                  return _.sortedUniq(visiting);
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
                  if(from == to) return visiting.concat(from);
                  for(var i = 0; i<this.vertices[from].length ; i++){
                    if(visiting.indexOf(this.vertices[from][i])==-1)
                      visiting = this.pathBetween(this.vertices[from][i],to,visiting.concat(from));
                  };
                  return _.sortedUniq(visiting);
                },

};
module.exports = graphs;


