import React, { Component } from 'react'
import Table from './Table'

const SMALL_DATA_URL =
  'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

const BIG_DATA_URL =
  'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.setData.bind(this)

    this.state = {
      data: null,
      failedDataFetch: false,
      loading: false
    }
  }

  async getData(url) {
    var data

    try {
      const response = await fetch(url)
      if (!response.ok) throw Error(response.status)
      data = JSON.parse(response.json())
    } catch (error) {
      console.log(error)
      data = null
    }

    return data
  }
  async setData(url) {
    const data = await this.getData(url)

    var state = {
      data: null,
      failedDataFetch: true
    }

    if (data) {
      state.data = data
      state.failedDataFetch = false
    }

    this.setState(state)
  }

  getTableBody() {
    var tBody = null
    if (this.state.failedDataFetch) {
      tBody = (
        <div className='error'>
          Что-то явно пошло не так и данные не получилось загрузить
        </div>
      )
    } else if (this.state.loading) {
      tBody = <div className='loader'>Я тут загружаюсь как бы :|</div>
    }

    return tBody
  }

  render() {
    return (
      <div className='container' id='app'>
        <h1 className='is-size-3 has-text-centered'>
          Тестовое задание - таблица с данными на React
        </h1>
        <div className='buttons data-controls level-right'>
          <button
            className='button'
            onClick={() => this.setData(SMALL_DATA_URL)}
          >
            Немного данных
          </button>
          <button className='button' onClick={() => this.setData(BIG_DATA_URL)}>
            Много данных
          </button>
        </div>
        <button className='button'>Искать</button>
        <input className='input' type='text' />
        <Table data={this.state.data} tBody={this.getTableBody()} />
      </div>
    )
  }
}
