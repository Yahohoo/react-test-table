import React from 'react'
import TableRow from './TableRow'
import TableInfo from './TableInfo'

const TableBody = props => {
  if (props.status !== 'normal') {
    return <tbody>{<TableInfo status={props.status} />}</tbody>
  }

  const rows = props.data.map(row => (
    /*
      значения поля id в данных повторяются,
      поэтому соединяем с номером, для меньшей вероятности коллизии 
    */
    <TableRow
      key={row.id + row.phone}
      clickHandler={props.rowClickHandler}
      row={row}
    />
  ))

  return <tbody>{rows}</tbody>
}

export default TableBody
