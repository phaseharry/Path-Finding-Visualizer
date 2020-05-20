import React, { useState, useEffect, Fragment } from 'react'

import './PathfindingVisualizer.css'
import Node from './Node/Node'

import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra'

const START_NODE = {
  row: 10,
  col: 15
}

const END_NODE = {
  row: 10,
  col: 35
}

const defaultState = {
  grid: [],
  mouseIsPressed: false
}

const PathfindingVisualizer = () => {
  const [grid, updateGrid] = useState(defaultState.grid)
  const [mouseIsPressed, updateMouse] = useState(defaultState.mouseIsPressed)
  // componentDidMount
  useEffect(() => {
    updateGrid(getInitialGrid())
  }, [])
  
  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for(let i = 0; i <= visitedNodesInOrder.length; i++){
      if(i === visitedNodesInOrder.length){
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder)
        }, 50 * i)
          return
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i]
        const newGrid = grid.slice() // getting a copy of the entire grid
        const newNode = {
          ...node,
          isVisited: true
        }
        newGrid[node.row][node.col] = newNode
       
        updateGrid(newGrid)
      }, 50 * i)
    }
  }

  const animateShortestPath = nodesInShortestPathOrder => {
    for(let i = 0; i < nodesInShortestPathOrder.length; i++){
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i]
        node.isShortestPath = true
        const gridCopy = grid.slice()
        gridCopy[node.row][node.col] = node
        updateGrid(gridCopy)
      }, 50 * i)
    }
  }

  const visualizeDijkstra = () => {
    const gridCopy = hardcopyGrid(grid)
    const startNode = gridCopy[START_NODE.row][START_NODE.col]
    const endNode = gridCopy[END_NODE.row][END_NODE.col]
    const visitedNodesInOrder = dijkstra(gridCopy, startNode, endNode)
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode)
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
  }

  // handles the initial mouse down and setting state to true so continually hovering over nodes with mouse pressed will make 'walls'
  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWallToggled(grid, row, col)
    updateGrid(newGrid)
    updateMouse(true)
  }
  
  const handleMouseEnter = (row, col) => {
    if(!mouseIsPressed) return // breakout of function if mouse is not pressed
    const newGrid = getNewGridWallToggled(grid, row, col)
    updateGrid(newGrid)
  }
  
  const handleMouseUp = () => {
    updateMouse(false)
  }

  return (
    <Fragment>
      <button onClick={visualizeDijkstra}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className='grid'>
        { grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { isStart, isEnd, isVisited, isShortestPath, isWall } = node
                return (
                  <Node 
                    key={nodeIdx} 
                    isStart={isStart} 
                    isEnd={isEnd} 
                    isVisited={isVisited}  
                    isWall={isWall}
                    isShortestPath={isShortestPath}
                    handleMouseDown={handleMouseDown} 
                    handleMouseEnter={handleMouseEnter} 
                    handleMouseUp={handleMouseUp}
                    row={rowIdx}
                    col={nodeIdx}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </Fragment>
  )
}

const hardcopyGrid = grid => {
  const gridCopy = JSON.parse(JSON.stringify(grid)) // need to do a hardcopy of the state so we don't modify the nodes dijkstra's is still running
  for(let row = 0; row < gridCopy.length; row++){
    for(let col = 0; col < gridCopy[row].length; col++){
      gridCopy[row][col].distance = Infinity // Infinity gets set to null when you stringify and then parse it
    }
  }
  return gridCopy
}

const getInitialGrid = () => {
  const nodes = []
  for(let row = 0; row < 15; row++){
    const currentRow = []
    for(let col = 0; col < 50; col++){
      currentRow.push(createNode(row, col))
    }
    nodes.push(currentRow)
  }
  return nodes
}

const createNode = (row, col) => {
  return {
    row, 
    col,
    isStart: row === START_NODE.row && col === START_NODE.col, 
    isEnd: row === END_NODE.row && col === END_NODE.col,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isShortestPath: false,
    previousNode: null
  }
}

const getNewGridWallToggled = (grid, row, col) => {
  const newGrid = grid.slice()
  const node = newGrid[row][col]
  const newNode = {
    ...node,
    isWall: !node.isWall
  }
  newGrid[row][col] = newNode
  return newGrid
}


export default PathfindingVisualizer