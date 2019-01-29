import React, { Component } from 'react'
import Table from './Table'
import ControlPanel from './ControlsPanel'
import SubjectInfo from './SubjectInfo'

const PAGE_SIZE = 30

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [], // поменять на пустой массив
      filterValue: null,
      failedDataFetch: false,
      loading: false
    }

    this.setData = this.setData.bind(this)
    this.setFilter = this.setFilter.bind(this)
  }

  async setData(url) {
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

  getStatus() {
    if (this.state.failedDataFetch) return 'failed'
    if (this.state.loading) return 'loading'

    return 'normal'
  }

  setFilter(value) {
    this.setState({ filterValue: value.toLowerCase() })
  }

  getPagesNum(data) {
    return Math.ceil(data.length / PAGE_SIZE)
  }

  render() {
    const data = this.state.filterValue
      ? this.getFilteredData()
      : this.state.data

    return (
      <div className='container' id='app'>
        <h1 className='is-size-3 has-text-centered'>Таблица на React</h1>
        <hr />
        <ControlPanel setData={this.setData} searchFor={this.setFilter} />
        {/* Key нужен, чтобы сбрасывать состояние таблицы, если меняется набор данных */}
        <Table
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
