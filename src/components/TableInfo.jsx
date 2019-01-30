import React from 'react'

const TableInfo = props => {
  var bodyContent = null

  switch (props.status) {
    case 'failed':
      bodyContent = loadingFailedMessage
      break

    case 'loading':
      bodyContent = loadingInProcessMessage
      break

    case 'empty':
      bodyContent = noDataMessage
      break

    default:
      bodyContent = unexpectedProblemMessage
  }

  return (
    <tr>
      <td colSpan='5'>{bodyContent}</td>
    </tr>
  )
}

const loadingFailedMessage = (
  <div className='table-info has-text-warning is-size-3'>
    Данные не получилось загрузить
  </div>
)

const loadingInProcessMessage = (
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

const noDataMessage = (
  <div className='table-info has-text-info is-size-3'>
    Пока нет данных для отображения
  </div>
)

const unexpectedProblemMessage = (
  <div className='table-info has-text-danger is-size-3'>
    Что-то пошло не так
  </div>
)

export default TableInfo
