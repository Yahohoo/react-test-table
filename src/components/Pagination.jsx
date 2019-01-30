import React from 'react'
import PageControl from './PageControl'

const Pagination = props => {
  if (props.pagesNum < 2) return null

  const ellipsis = (
    <li>
      <span className='pagination-ellipsis'>&hellip;</span>
    </li>
  )

  const pagesNum = props.pagesNum
  const currentPage = props.currentPage
  const changePage = props.changePage

  const neighs = getNeighbors(currentPage, pagesNum)

  return (
    <nav
      className='pagination is-rounded is-centered'
      role='navigation'
      aria-label='pagination'
    >
      <button
        className='pagination-previous'
        onClick={() => currentPage > 1 && changePage(currentPage - 1)}
      >
        Предыдущая
      </button>
      <ul className='pagination-list'>
        {pagesNum > 1 && (
          <PageControl current={currentPage} num={1} handleClick={changePage} />
        )}
        {pagesNum > 5 && currentPage > 3 && ellipsis}
        {neighs.map(num => (
          <PageControl
            key={num}
            num={num}
            handleClick={changePage}
            current={currentPage}
          />
        ))}
        {pagesNum > 5 && currentPage < pagesNum - 2 && ellipsis}
        {pagesNum > 1 && (
          <PageControl
            current={currentPage}
            num={pagesNum}
            handleClick={changePage}
          />
        )}
      </ul>
      <button
        className='pagination-next'
        onClick={() => currentPage < pagesNum && changePage(currentPage + 1)}
      >
        Следующая
      </button>
    </nav>
  )
}

// Возвращает группу переключателей страниц в виде [current - 1,  current, current + 1]
// Не включает первую и последнюю страницы

const getNeighbors = (currentPage, pagesNum) => {
  const neighs = []

  if (currentPage - 1 > 1) {
    neighs.push(currentPage - 1)
  }

  if (currentPage !== 1 && currentPage !== pagesNum) {
    neighs.push(currentPage)
  }

  if (currentPage + 1 < pagesNum) {
    neighs.push(currentPage + 1)
  }

  return neighs
}

export default Pagination
