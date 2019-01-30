import React, { Component } from 'react'
import Table from './Table'
import ControlPanel from './ControlsPanel'
import SubjectInfo from './SubjectInfo'

const PAGE_SIZE = 30

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      sortCol: null,
      reverseSort: false,
      filterValue: null,
      failedDataFetch: false,
      loading: false
    }
  }

  setData = async url => {
    this.setState({ data: [] })

    const data = await this.fetchData(url)

    var state = {
      failedDataFetch: true
    }

    if (data) {
      state.data = data
      state.failedDataFetch = false
    }

    this.setState(state)
  }

  setFilter = async value => {
    this.setState({ filterValue: value.toLowerCase() })
  }

  async fetchData(url) {
    var data
    this.setState({ loading: true })

    try {
      const response = await fetch(url)
      if (!response.ok) throw Error(response.status)

      data = await response.json()
    } catch (error) {
      data = null
    } finally {
      this.setState({ loading: false })
    }

    return data
  }

  getFilteredData() {
    /* Фильтрация идет в том числе по всем полям, кроме адреса */
    const value = this.state.filterValue

    return this.state.data.filter(item => {
      const rowValues = Object.values(item).filter(
        val => !(val instanceof Object)
      )

      return rowValues.some(row => {
        return String(row)
          .toLowerCase()
          .includes(value)
      })
    })
  }

  getSortedData() {
    const field = this.state.sortCol

    const data = this.state.filterValue
      ? this.getFilteredData()
      : this.state.data

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

  getStatus() {
    if (this.state.failedDataFetch) return 'failed'
    if (this.state.loading) return 'loading'

    return 'normal'
  }

  getPagesNum(data) {
    return Math.ceil(data.length / PAGE_SIZE)
  }

  render() {
    const data = this.getSortedData()

    const sortProps = {
      sortCol: this.state.sortCol,
      reverseSort: this.state.reverseSort,
      sort: this.setSortProps
    }

    return (
      <div className='container' id='app'>
        <h1 className='is-size-3 has-text-centered'>Таблица на React</h1>
        <hr />
        <ControlPanel setData={this.setData} searchFor={this.setFilter} />
        {/* Key нужен, чтобы сбрасывать состояние таблицы, если меняется набор данных */}
        <Table
          sortProps={sortProps}
          key={Date.now()}
          pagesNum={this.getPagesNum(data)}
          status={this.getStatus()}
          data={data}
        />
        {this.state.subject && <SubjectInfo subject={this.state.subject} />}
      </div>
    )
  }
}

export default App
