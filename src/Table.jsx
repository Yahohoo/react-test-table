import React, { Component } from 'react'
import TableRow from './TableRow'

class Table extends Component {
  constructor(props) {
    super(props)
    const pages = props.data ? Math.ceil(props.data.length / 30) : 1
    this.state = {
      pages,
      currentPage: 1
    }
  }
  render() {
    var tBody = this.props.tBody
    
    if (!this.props.tBody) {
        tBody = this.props.data.map(row => TableRow(row))
    }    

    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Почта</th>
              <th>Телефон</th>
            </tr>
          </thead>
          <tbody /* ошибка и загрузка */>
            <tBody />
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
