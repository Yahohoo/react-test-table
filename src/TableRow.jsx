import React from 'react'

const TableRow = props => {
  return (
    <tr>
      <td>{props.row.id}</td>
      <td>{props.row.firstName}</td>
      <td>{props.row.lastName}</td>
      <td>{props.row.email}</td>
      <td>{props.row.phone}</td>
    </tr>
  )
}

export default TableRow
