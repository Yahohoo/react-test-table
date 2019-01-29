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
      sortCol: null,
      reverseSort: false,
      currentPage: 1,
      selected: null
    }
  }

  getPageData() {
    const pageNum = this.state.currentPage
    const startIdx = (pageNum - 1) * PAGE_SIZE

    return this.props.data.slice(startIdx, startIdx + PAGE_SIZE)
  }

  getSortedData() {
    const field = this.state.sortCol
    const data = this.getPageData()

    if (!field) return data

    const reverse = this.state.reverseSort

    data.sort((a, b) => {
      if (a[field] === b[field]) return 0

      var res = a[field] > b[field] ? 1 : -1
      if (reverse) res = -res

      return res
    })

    return data
  }

  setSortProps = (sortCol, reverseSort) => {
    this.setState({ sortCol, reverseSort: !reverseSort })
  }

  changePage = num => {
    this.setState({ currentPage: num })
  }

  changeSelected = row => {
    this.setState({ selected: row })
  }

  getColons() {
    return FIELDS.map(field => {
      var reverse

      if (field === this.state.sortCol) {
        reverse = this.state.reverseSort
      } else {
        reverse = false
      }

      return { field, reverse }
    })
  }

  render() {
    const data = this.getSortedData()
    const colons = this.getColons()

    const status =
      !data.length && this.props.status === 'normal'
        ? 'empty'
        : this.props.status

    return (
      <div>
        <table className='table is-fullwidth is-bordered is-narrow is-hoverable'>
          {data && (
            <TableHead colons={colons} setSortProps={this.setSortProps} />
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
        {this.state.selected && <SubjectInfo subject={this.state.selected} />}
      </div>
    )
  }
}

export default Table
