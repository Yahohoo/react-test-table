import React from 'react'

const TableRow = props => {
  const row = props.row

  return (
    <tr onClick={() => props.clickHandler(row)}>
      <td>{row.id}</td>
      <td>{row.firstName}</td>
      <td>{row.lastName}</td>
      <td>{row.email}</td>
      <td>{row.phone}</td>
    </tr>
  )
}

export default TableRow
