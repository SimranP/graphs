var graphs=require('../lib/weightedGraph');
var assert=require('chai').assert;
var ld=require('lodash');

var denseGraph=function() {
	var g=new graphs.WeightedGraph();
	var vertices=['A','B','C','D','E','F','G','H','I','J'];

	vertices.forEach(function(vertex){
		g.addVertex(vertex);
	});

	for (var i = 0; i < vertices.length-1; i++) {
		var from=vertices[i];
		for (var j = i+1; j < vertices.length; j++) {
			var edge = new graphs.Edge(from+vertices[j],from,vertices[j],1);
			g.addEdge(edge);
			var returnEdge = new graphs.Edge(vertices[j]+from,vertices[j],from,1);
			g.addEdge(returnEdge);
		}
	}
	return g;
};

var complexGraph = function(){
	var g = new graphs.WeightedGraph();
	var vertices=['A','B','C','D','E','F'];
	vertices.forEach(function(vertex){
		g.addVertex(vertex);
	});
	var edges = {	AB : new graphs.Edge('AB','A','B',10),
					AC : new graphs.Edge('AC','A','C',9),
					AE : new graphs.Edge('AE','A','E',14),
					BD : new graphs.Edge('BD','B','D',10),
					CD : new graphs.Edge('CD','C','D',8),
					CE : new graphs.Edge('CE','C','E',4),
					DF : new graphs.Edge('DF','D','F',2),
					EF : new graphs.Edge('EF','E','F',7),
					CF : new graphs.Edge('CF','C','F',5),
	};
	for (var i = 0; i < vertices.length; i++) {
		for (var j = 0; j < vertices.length; j++) {
			var edge = vertices[i]+vertices[j];
			edges[edge] && g.addEdge(edges[edge]);
		};
	};
	return g;
};

describe("shortest path",function(){
	it("should choose the only path when only one path exists",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');

		var e1=new graphs.Edge("e1",'A','B',1);
		g.addEdge(e1);

		var path=g.shortestPath('A','B');
		assert.equal(1,path.length);
		assert.deepEqual(e1,path[0]);
	});

	it("should choose the path with least weight when more than one path exists",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'B','C',1);
		var e3=new graphs.Edge("e1",'A','C',1);
		g.addEdge(e1);
		g.addEdge(e2);
		g.addEdge(e3);

		var path=g.shortestPath('A','C');
		assert.equal(1,path.length);
		assert.deepEqual(e3,path[0]);
	});

	it("should choose the path with least weight when more than one path exists even if the path has more vertices",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'B','C',1);
		var e3=new graphs.Edge("e1",'A','C',3);
		g.addEdge(e1);
		g.addEdge(e2);
		g.addEdge(e3);

		var path=g.shortestPath('A','C');
		assert.equal(2,path.length);
		assert.deepEqual(e1,path[0]);
		assert.deepEqual(e2,path[1]);
	});

	it("should choose the path with least weight when multiple edges exist between two vertices",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'A','B',2);
		g.addEdge(e1);
		g.addEdge(e2);

		var path=g.shortestPath('A','B');
		assert.equal(1,path.length);
		assert.deepEqual(e1,path[0]);
	});
	it("should give the shortest path for a dense graph", function(){
		this.timeout(10000)
		var g=denseGraph();
		var path = g.shortestPath('A','B');
		var vertices=['A','B','C','D','E','F','G','H','I','J'];
		var edges = ['AB','CB'];
		assert.equal(path.length,1);
		for (var i = 0; i < path.length; i++) {
			assert.equal(path[i].edge,edges[i]);
		};
	});
	it("should give the shortest path for given complex graph",function(){
		var g = complexGraph();		
		var shortAB = g.shortestPath('A','B');
		assert.equal(shortAB.length,1);
		assert.equal(shortAB[0].edge, 'AB');

		var shortAC = g.shortestPath('A','C');
		assert.equal(shortAC.length,1);
		assert.equal(shortAC[0].edge, 'AC');

		var shortAF = g.shortestPath('A','F');
		assert.equal(shortAF.length,2);
		assert.equal(shortAF[0].edge, 'AC');
		assert.equal(shortAF[1].edge, 'CF')

		var shortAD = g.shortestPath('A','D');
		assert.equal(shortAD.length,2);
		assert.equal(shortAD[0].edge, 'AC');
		assert.equal(shortAD[1].edge, 'CD');

	});
	it("should work for multi-graph",function(){
			var g = new graphs.WeightedGraph();
		var vertices=['A','B','C','D'];
		vertices.forEach(function(vertex){
			g.addVertex(vertex);
		});
		var AB = new graphs.Edge('AB','A','B',10);
		var AC = new graphs.Edge('AC','A','C',9);
		var BD = new graphs.Edge('BD','B','D',10);
		var CD = new graphs.Edge('CD','C','D',8);
		var AB1 = new graphs.Edge('AB1','A','B',5);

		g.addEdge(AB1);
		g.addEdge(AC);
		g.addEdge(BD);
		g.addEdge(CD);
		g.addEdge(AB);

		assert.deepEqual(g.shortestPath('A','D'),[AB1,BD]);
	});
});
