// A graph implementation using an Adjacency List

class Graph {

    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    // add vertex to the graph
    addVertex(v) {
        // initialize the adjacent list with a null array
        this.AdjList.set(v, []);
    }

    // add edge to the graph
    addEdge(v, w) {
        // get the list for vertex v and put the
        // vertex w denoting edge between v and w
        this.AdjList.get(v).push(w);
    
        // Since graph is undirected,
        // add an edge from w to v also
        this.AdjList.get(w).push(v);
    }

    // Prints the vertex and adjacency list
    printGraph() {

        // get all the vertices
        const get_keys = this.AdjList.keys();
    
        // iterate over the vertices
        for (let i of get_keys) {
            // great the corresponding adjacency list
            // for the vertex
            const get_values = this.AdjList.get(i);
            let conc = "";
    
            // iterate over the adjacency list
            // concatenate the values into a string
            for (let j of get_values)
                conc += j + " ";
    
            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }


    // Depth-First Search with Recursion

    // Main DFS method
    dfs(startingNode) {
        const visited = {};
    
        this.DFSUtil(startingNode, visited);
    }
    
    // Recursive function which process and explore
    // all the adjacent vertex of the vertex with which it is called
    DFSUtil(vert, visited) {

        visited[vert] = true;
        
        console.log(vert);
    
        const neighbours = this.AdjList.get(vert);
    
        for (let i in neighbours) {

            const neighbour = neighbours[i];

            if (!visited[neighbour])

                // Because of recursion, we know the algorithm will check nodes closer to the root
                // after traversing the depths of the graph; as function calls get popped off the call
                // stack, the algorithm works its way back to the root.
                this.DFSUtil(neighbour, visited);
        }
    }


}