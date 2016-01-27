var Graph = function(){
	this.graph = {};
};

Graph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = this.graph[vertex] || [];
	},
	hasEdgeBetween : function(head, tail){
		return this.graph[head].indexOf(tail)>=0;
	},
	order : function(){
		return Object.keys(this.graph).length;
	},
	numberOfEdges : function(){
		var graph = this.graph;
		return Object.keys(graph).reduce(function(size, vertex){
			return size+graph[vertex].length;
		},0);
	},
	pathBetween : function(head, tail, visitedVertices){
		visitedVertices = visitedVertices || [];
		var graph = this.graph;
		if(head == tail)
			return visitedVertices.concat(head);
		for (vertex in graph[head]){
			var nextHead = graph[head][vertex];
			if(visitedVertices.indexOf(nextHead)==-1){
				var path = this.pathBetween(nextHead, tail, visitedVertices.concat(head));
				if(path.length)
					return path;
			}
		};
		return [];
	},
	farthestVertex : function(head){
		var vertices = Object.keys(this.graph);
		var distance = 0;
		var self = this;
		return vertices.reduce(function(farthestVertex, vertex){
			var path = self.pathBetween(head, vertex);
			if(path.length>=distance){
				distance = path.length;
				return vertex;
			}
			return farthestVertex;
		},'');
	},
	allPaths : function(head, tail, visitedVertices, paths){
		visitedVertices = visitedVertices || [];
		paths = paths || [];
		var graph = this.graph;
		if(head == tail)
			return paths.push(visitedVertices.concat(head));
		for (vertex in graph[head]){
			var nextHead = graph[head][vertex];
			if(visitedVertices.indexOf(nextHead)==-1){
				this.allPaths(nextHead, tail, visitedVertices.concat(head), paths);
			}
		};
		return paths;
	}
};

module.exports = Graph;
