import React from 'react'
import ColHead from './ColHead'

const TableHead = props => {
  const heads = props.colons.map(col => (
    <ColHead
      key={col.field}
      field={col.field}
      reverse={col.reverse}
      setSortProps={props.setSortProps}
    />
  ))

  return (
    <thead>
      <tr>{heads}</tr>
    </thead>
  )
}

export default TableHead
