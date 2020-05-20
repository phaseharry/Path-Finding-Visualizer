import React from 'react'

import './Node.css'

const Node = props => {
  const { row, col, isStart, isEnd, isVisited, isWall, handleMouseDown, handleMouseEnter, handleMouseUp } = props

  const specialNodeClass = isEnd ? 'node-end' : isStart ? 'node-start' : isVisited ? 'node-visited' : isWall ? 'node-wall' : ''

  return (
    <div 
      className={`node ${specialNodeClass}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={e => handleMouseUp()}
    >
    </div>
  )
}

export default Node