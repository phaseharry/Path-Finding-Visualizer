import React, { useState, useEffect, Fragment } from 'react'

import './PathfindingVisualizer.css'
import Node from './Node/Node'

import dijkstra from '../algorithms/dijkstra'

const START_NODE = {
  row: 10,
  col: 15
}

const END_NODE = {
  row: 10,
  col: 35
}

const defaultState = {
  grid: [[]],
  mouseIsPressed: false
}

const PathfindingVisualizer = () => {
  const [grid, updateGrid] = useState(defaultState.grid)
  const [mouseIsPressed, updateMouse] = useState(defaultState.mouseIsPressed)
  // componentDidMount
  useEffect(() => {
    updateGrid(getInitialGrid())
  }, [])

  const animateDijkstra = (visitedNodesInOrder) => {
    for(let i = 0; i < visitedNodesInOrder.length; i++){
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

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE.row][START_NODE.col]
    const endNode = grid[END_NODE.row][END_NODE.col]
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode)
    //console.log(visitedNodesInOrder)
    animateDijkstra(visitedNodesInOrder)
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
                const { isStart, isEnd, isVisited, isWall } = node
                return (
                  <Node 
                    key={nodeIdx} 
                    isStart={isStart} 
                    isEnd={isEnd} 
                    isVisited={isVisited}  
                    isWall={isWall}
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