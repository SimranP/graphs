var graphs = {};

graphs.DirectedGraph =  function(){
	this.graph = new Object;
}

graphs.DirectedGraph.prototype = {
	addVertex : function(vertex){
		console.log(this.graph);
		this.graph[vertex] = this.graph[vertex] || [];
	},
	addEdge : function(head, tail){
		this.graph[head].push(tail);
	},
	hasEdgeBetween : function(head, tail){
		return this.graph[head].indexOf(tail)>=0;
	}

}

module.exports = graphs;