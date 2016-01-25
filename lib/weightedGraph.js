var graphs = {};
var Graph = require('./graph').Graph;

graphs.WeightedGraph = function(){
	this.graph ={};
};

graphs.WeightedGraph.prototype = new Graph();

graphs.WeightedGraph.prototype.addEdge = function(edge){
	this.graph[edge.head].push(edge);
};

var allPaths = function(head, tail, paths, path, visitedVertices){
	paths = paths || [];
	path = path || [];
	visitedVertices = visitedVertices || [];
	var vertex = this.graph[head];
	for (var i = 0; i < vertex.length; i++) {
		var newPath = path.concat(vertex[i]);
		newPath.pathLength = (path.pathLength || 0) + vertex[i].length;	
		if(vertex[i].tail == tail)		
			paths.push(newPath)
		else if(visitedVertices.indexOf(vertex[i].tail)==-1){
			visitedVertices.push(vertex[i].tail);	
			allPaths.apply(this,[vertex[i].tail,tail, paths, newPath, visitedVertices]);
		};
	};
	return paths;
};

graphs.WeightedGraph.prototype.shortestPath = function(head, tail){
	var paths = allPaths.apply(this,[head, tail]);
	return paths.reduce(function(shortestPath, path){
		return shortestPath.pathLength>path.pathLength ? path : shortestPath;
	});
};

graphs.Edge = function(edge, head, tail, length){
	this.edge = edge;
	this.head = head;
	this.tail = tail;
	this.length = length;
};

module.exports = graphs;
