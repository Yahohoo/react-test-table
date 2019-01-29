import React from 'react'

const PageControlBtn = props => {
  return (
    <li>
      <button
        className={
          'pagination-link ' + (props.current === props.num ? 'is-current' : '')
        }
        onClick={() => props.handleClick(props.num)}
      >
        {props.num}
      </button>
    </li>
  )
}

export default PageControlBtn
