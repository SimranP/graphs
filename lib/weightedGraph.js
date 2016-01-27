var graphs = {};
var Graph = require('./commonGraph')

graphs.WeightedGraph = function(){
	this.graph ={};
};

graphs.WeightedGraph.prototype = new Graph();

graphs.WeightedGraph.prototype.addEdge = function(edge){
	this.graph[edge.head].push(edge);
};

var getVertices = function(graph) {
	return Object.keys(graph);
};

var getEdges = function(graph) {
	return Object.assign({}, graph);
};

var initiateDistances = function (vertices, head) {
	var distances = {};
	for (vertex of vertices)
	distances[vertex] = Infinity;
	distances[head] = 0;
	return distances;
};

var getMinimal = function (distance,vertices) {
	return vertices.reduce(function (minimal,vertex) {
		if(distance[minimal] > distance[vertex] && vertices.indexOf(vertex) >=0)
			return vertex;
		return minimal;
	});
};

var removeExecuted = function(edges, vertices, vertexToRemove) {
	delete edges[vertexToRemove];
	vertices.splice(vertices.indexOf(vertexToRemove),1);
};

var getPath = function (parent, head, tail, path) {
	path = path || [];
	if(parent[tail] == tail) return path.reverse();
	return getPath(parent, head, parent[tail].head, path.concat(parent[tail]));
};

graphs.WeightedGraph.prototype.shortestPath = function(head, tail) {
	var vertices = getVertices(this.graph);
	var edges = getEdges(this.graph);
	var distance = initiateDistances(vertices,head);
	var parent = {};
	parent[head] = head;
	while (vertices.length){
		var currentVertex = getMinimal(distance,vertices);
		edges[currentVertex].forEach(function (edge) {
			var newDistance = distance[currentVertex] + edge.weight;
			if(distance[edge.tail] > newDistance){
				distance[edge.tail] = newDistance;
				parent[edge.tail] = edge;
			};
		});
		removeExecuted(edges,vertices,currentVertex);
	};
	return getPath(parent, head, tail);
};

graphs.Edge = function(edge, head, tail, weight){
	this.edge = edge;
	this.head = head;
	this.tail = tail;
	this.weight = weight;
};

module.exports = graphs;
