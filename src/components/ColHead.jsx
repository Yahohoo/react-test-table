import React from 'react'

const ColHead = props => {
  const reverse = props.reverse
  const field = props.field

  return (
    <th onClick={() => props.setSortProps(field, reverse)}>
      <div className='col-head'>
        <span className='col-name'>{field}</span>
        <span classNadme='col-control'>{reverse ? '↓' : '↑'}</span>
      </div>
    </th>
  )
}

export default ColHead
