import React, { Component } from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody'
import Pagination from './Pagination'
import SubjectInfo from './SubjectInfo'

// Можно получить и из данных
const FIELDS = ['id', 'firstName', 'lastName', 'email', 'phone']

const PAGE_SIZE = 20

class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 1,
      selectedRow: null
    }
  }

  getPageData() {
    const pageNum = this.state.currentPage
    const startIdx = (pageNum - 1) * PAGE_SIZE

    return this.props.data.slice(startIdx, startIdx + PAGE_SIZE)
  }

  changePage = num => {
    this.setState({ currentPage: num })
  }

  changeSelected = row => {
    this.setState({ selectedRow: row })
  }

  getColons() {
    return FIELDS.map(field => {
      var reverse

      if (field === this.props.sortProps.sortCol) {
        reverse = this.props.sortProps.reverseSort
      } else {
        reverse = false
      }

      return { field, reverse }
    })
  }

  render() {
    const data = this.getPageData()
    const colons = this.getColons()

    const status =
      !data.length && this.props.status === 'normal'
        ? 'empty'
        : this.props.status

    return (
      <div>
        <table className='table is-fullwidth is-bordered is-narrow is-hoverable'>
          {Boolean(data.length) && (
            <TableHead
              colons={colons}
              setSortProps={this.props.sortProps.sort}
            />
          )}
          <TableBody
            status={status}
            data={data}
            rowClickHandler={this.changeSelected}
          />
        </table>
        <Pagination
          pagesNum={this.props.pagesNum}
          currentPage={this.state.currentPage}
          changePage={this.changePage}
        />
        {this.state.selectedRow && (
          <SubjectInfo subject={this.state.selectedRow} />
        )}
      </div>
    )
  }
}

export default Table
