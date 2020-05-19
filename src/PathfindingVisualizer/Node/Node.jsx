import React, { useState } from 'react'

import './Node.css'

export const DEFAULT_NODE = {
  row: 0,
  col: 0
}

const Node = props => {
  const { isStart, isEnd, isVisited } = props
  const { nodeState, updateState } = useState({})

  const specialNodeClass = isEnd ? 'node-end' : isStart ? 'node-start' : isVisited ? 'node-visited' : ''


  return <div className={`node ${specialNodeClass}`}></div>
}

export default Node