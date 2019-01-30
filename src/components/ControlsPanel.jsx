import React, { Component } from 'react'

const SMALL_DATA_URL =
  'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

const BIG_DATA_URL =
  'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

class ControlsPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchRequest: ''
    }
  }

  changeSearchRequest = event => {
    this.setState({
      searchRequest: event.target.value
    })
  }

  render() {
    return (
      <div className='columns'>
        <div className='column'>
          <div className='field is-grouped'>
            <div className='control'>
              <input
                className='input is-rounded'
                onChange={this.changeSearchRequest}
                value={this.state.searchRequest}
                type='text'
              />
            </div>
            <div className='control'>
              <button
                className='button is-rounded'
                onClick={() => this.props.searchFor(this.state.searchRequest)}
              >
                Найти
              </button>
            </div>
          </div>
        </div>
        <div className='column'>
          <div className='buttons level-right'>
            <button
              className='button is-rounded'
              onClick={() => this.props.setData(SMALL_DATA_URL)}
            >
              Немного данных
            </button>
            <button
              className='button is-rounded'
              onClick={() => this.props.setData(BIG_DATA_URL)}
            >
              Много данных
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ControlsPanel
