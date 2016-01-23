var graphs = {};

graphs.DirectedGraph =  function(){
	this.graph = new Object;
}

graphs.DirectedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = this.graph[vertex] || [];
	},
	addEdge : function(head, tail){
		this.graph[head].push(tail);
	},
	hasEdgeBetween : function(head, tail){
		return this.graph[head].indexOf(tail)>=0;
	},
	order : function(){
		return Object.keys(this.graph).length;
	},
	size : function(){
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
		for( vertex in graph[head]){
			if(graph[head][vertex] == tail)
				return visitedVertices.concat([head,tail]);
		}
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
	}

}

module.exports = graphs;