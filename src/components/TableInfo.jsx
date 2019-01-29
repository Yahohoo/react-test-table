import React from 'react'

const TableInfo = props => {
  var bodyContent = null

  switch (props.status) {
    case 'failed':
      bodyContent = (
        <div className='table-info has-text-warning is-size-3'>
          Данные не получилось загрузить
        </div>
      )
      break

    case 'loading':
      bodyContent = (
        <div className='table-info'>
          <div className='lds-roller'>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      )
      break

    case 'empty':
      bodyContent = (
        <div className='table-info has-text-info is-size-3'>
          Пока нет данных для отображения
        </div>
      )
      break

    default:
      bodyContent = (
        <div className='table-info has-text-danger is-size-3'>
          Что-то пошло не так
        </div>
      )
  }

  return (
    <tr>
      <td colSpan='5'>{bodyContent}</td>
    </tr>
  )
}

export default TableInfo
