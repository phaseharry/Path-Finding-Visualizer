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
  grid: []
}

const PathfindingVisualizer = () => {
  const [state, updateState] = useState(defaultState)

  // componentDidMount
  useEffect(() => {
    updateState({ grid: getInitialGrid() })
    console.log('componentdidmount')
  }, [])

  const animateDijkstra = (visitedNodesInOrder) => {
    for(let i = 0; i < visitedNodesInOrder.length; i++){
      setTimeout(() => {
        const node = visitedNodesInOrder[i]
        const newGrid = state.grid.slice() // getting a copy of the entire grid
        const newNode = {
          ...node,
          isVisited: true
        }
        newGrid[node.row][node.col] = newNode
       
        updateState({ grid: newGrid })
      }, 10 * i)
    }
  }

  const visualizeDijkstra = () => {
    const { grid } = state
    const startNode = grid[START_NODE.row][START_NODE.col]
    const endNode = grid[END_NODE.row][END_NODE.col]
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode)
    //console.log(visitedNodesInOrder)
    animateDijkstra(visitedNodesInOrder)
  }

  return (
    <Fragment>
      <button onClick={visualizeDijkstra}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className='grid'>
        { state.grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { isStart, isEnd, isVisited } = node
                return <Node key={nodeIdx} isStart={isStart} isEnd={isEnd} isVisited={isVisited} />
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

export default PathfindingVisualizer