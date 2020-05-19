const dijkstra = (grid, startNode, endNode) => {
  const visitedNodesInOrder = []
  //if(!startNode || !endNode || startNode === endNode) return false // edge case for when there is no startNode or endNode or if both are the same node

  startNode.distance = 0
  const unvisitedNodes = getAllNodes(grid);
 // console.log(unvisitedNodes)

  while(!!unvisitedNodes.length){
    //debugger
    sortNodesByDistance(unvisitedNodes)


    const closestNode = unvisitedNodes.shift() // nodes are getting passed by reference from state for some reason and it can be mutated outside of the setState function. Need to look into why
    const copy = { ...closestNode }
    //closestNode.isVisited = true
    copy.isVisited = true
    visitedNodesInOrder.push(copy)
    if(closestNode === endNode) return visitedNodesInOrder
    updateNeighbors(closestNode, grid)
  }
  return visitedNodesInOrder
}

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

const updateNeighbors = (node, grid) => {
 const neighbors = getNeighbors(node, grid)
 for(const neighbor of neighbors){
   neighbor.distance = node.distance + 1
 }
}

const getNeighbors = (node, grid) => {
  const neighbors = []
  const { col, row } = node
  if(row > 0) neighbors.push(grid[row - 1][col])
  if(row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if(col > 0) neighbors.push(grid[row][col - 1])
  if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  return neighbors
}

const getAllNodes = grid => {
  const nodes = []
  for(const row of grid){
    for(const node of row){
      nodes.push(node)
    }
  }
  return nodes
}

export default dijkstra