import React, { useState, useEffect } from 'react'

import './PathfindingVisualizer.css'
import Node from './Node/Node'

const defaultState = {
  nodes: []
}

const PathfindingVisualizer = () => {
  const [state, updateState] = useState(defaultState)

  // componentDidMount
  useEffect(() => {
    const nodes = []
    for(let row = 0; row < 15; row++){
      const currentRow = []
      for(let col = 0; col < 50; col++){
        const currentNode = {
          row, 
          col,
          isStart: row === 10 && col === 5, 
          isEnd: row === 10 && col === 45
        }
        currentRow.push(currentNode)
      }
      nodes.push(currentRow)
    }
    updateState({ nodes })
  }, [])

  return (
    <div className='grid'>
      { state.nodes.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { isStart, isEnd } = node
              return <Node key={nodeIdx} isStart={isStart} isEnd={isEnd} />
            })}
          </div>
        )
      })}
    </div>
  )
}

export default PathfindingVisualizer