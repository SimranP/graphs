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
	}

}

module.exports = graphs;