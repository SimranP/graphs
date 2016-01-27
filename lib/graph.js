var Graph = require('./commonGraph.js')

var graphs = {};

graphs.DirectedGraph =  function(){
	this.graph = {};
};

graphs.DirectedGraph.prototype = new Graph();

graphs.DirectedGraph.prototype.addEdge = function(head, tail){
	this.graph[head] && this.graph[head].push(tail);
};

graphs.DirectedGraph.prototype.size = function(){
	return this.numberOfEdges();
};

graphs.UndirectedGraph =  function(){
	this.graph = {};
}

graphs.UndirectedGraph.prototype = new Graph();

graphs.UndirectedGraph.prototype.addEdge = function(head, tail){
	this.graph[head].push(tail);
	if(!this.graph[tail])
		this.graph[tail] = [];
	this.graph[tail].push(head);
};

graphs.UndirectedGraph.prototype.size = function(){
	return this.numberOfEdges()/2;
};

module.exports = graphs;