var graphs = {};
var Graph = require('./graph').Graph;

graphs.WeightedGraph = function(){
	this.graph ={};
};

graphs.WeightedGraph.prototype = new Graph();

graphs.WeightedGraph.prototype.addEdge = function(edge){
	this.graph[edge.head].push(edge);
};

var allPaths = function(head, tail, paths, path){
	path = path || [];
	var vertex = this.graph[head];
	for (var i = 0; i < vertex.length; i++) {
		if(vertex[i].tail == tail){
			var newPath = path.concat(vertex[i]);
			newPath.pathLength = (path.pathLength || 0) + vertex[i].length;			
			paths.push(newPath);
		}
		else{
			var newPath = path.concat(vertex[i]);
			newPath.pathLength = (path.pathLength || 0) + vertex[i].length;
			allPaths.apply(this,[vertex[i].tail, tail, paths, newPath]);
		}
	};
	return paths;
}

graphs.WeightedGraph.prototype.shortestPath = function(head, tail){
	var paths = [];
	allPaths.apply(this,[head, tail, paths])	
	var shortestPath =  paths.reduce(function(shortestPath, path){
		return shortestPath.pathLength>path.pathLength ? path : shortestPath;
	});
	return shortestPath;
}

graphs.Edge = function(edge, head, tail, length){
	this.edge = edge;
	this.head = head;
	this.tail = tail;
	this.length = length;
}

module.exports = graphs;
