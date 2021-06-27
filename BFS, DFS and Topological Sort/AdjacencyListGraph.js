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
    // all the adjacent vertex of the vertex with which it is called.
    // The variable "stack" is used for keeping an ordering of nodes, for applications such as
    // topological sort.
    DFSUtil(vert, visited, stack = []) {

        visited[vert] = true;
        
        console.log(vert);
    
        const neighbours = this.AdjList.get(vert);
    
        for (let i in neighbours) {

            const neighbour = neighbours[i];

            if (!visited[neighbour])

                // Because of recursion, we know the algorithm will check nodes closer to the root
                // after traversing the depths of the graph; as function calls get popped off the call
                // stack, the algorithm works its way back to the root.
                this.DFSUtil(neighbour, visited, stack);
        }

        stack.push(vert)
    }

    bfs(startingNode) {
  
        // table of visited nodes
        const visited = {};
    
        const q = new Queue();
    
        // add the starting node to the queue
        visited[startingNode] = true;
        q.enqueue(startingNode);
    
        // loop until the queue is empty
        while (!q.isEmpty()) {

            // get the next element from the queue
            const getQueueElement = q.dequeue();
    
            console.log(getQueueElement);
    
            // get the list of neighbours for the node
            const get_List = this.AdjList.get(getQueueElement);
    
            // loop through the list and add the element to the
            // queue if it has not been visited yet
            for (var i in get_List) {

                var neighbour = get_List[i];
    
                if (!visited[neighbour]) {

                    visited[neighbour] = true;
                    q.enqueue(neighbour);
                }
            }
        }
    }

    /* A Topological Sort or topological ordering of a directed graph is a linear ordering of its vertices
    such that for every directed edge UV from vertex u to vertex v, u comes before v in the ordering.

    Obviously, this only makes sense in directed graphs. Also, the graph must be acyclic (no directed cycles).

    There are many places where topological sort makes a lot of sense. For example, let's say you're 
    following a recipe. There are steps which must occur before other steps, but there are also some steps which 
    can be performed in parallel. Similarly, during college when selecting courses, there are some
    prerequisites for more advanced courses which themselves may be prerequisites for further courses.

    Example

    *       CS101  CS102
    *       /       \ /
    *      CS204    CS340
    *       \      /| \
    *       CS380   | CS410
    *          \    | /
    *           CS540

    In the above graph, consider if you want to take the courses on a certain level. You'll first have to take 
    all the courses it is connected to from the level above it. 

    These are some possible topological sorts for the graph:

    CS101 -> CS204 -> CS102 -> CS340 -> CS410 -> CS380 -> CS540
    CS102 -> CS101 -> CS340 -> CS204 -> CS410 -> CS380 -> CS540

    Below is a topological sort algorithm using Depth First Search.
    */

    topologicalSort() {
        const visited = {}
        const stack = []

        // For every unvisited node in the graph, call the DFS helper 
        this.AdjList.forEach(node => {
            if (!visited[node]) {
                this.DFSUtil(node, visited, stack)
            }
        })

        // Since the deepest nodes will be pushed to the stack first, we want to pop each item off
        // the stack to get a topological ordering.
        while (stack.length) {
            console.log(stack.pop())
        }
    }
}