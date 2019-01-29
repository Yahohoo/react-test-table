import React from 'react'

const SubjectInfo = props => {
  const subject = props.subject
  const address = subject.address

  return (
    <div className='card subject-info'>
      <div className='card-header'>
        <div className='card-header-title'>
          Выбран пользователь {subject.firstName}
        </div>
      </div>
      <div className='card-content'>
        <div className='content'>
          <h4>Описание</h4>
          {subject.description}
          <hr />
          <h4>Адрес</h4>
          Улица: <b>{address.streetAddress}</b> <br />
          Город: <b>{address.city}</b> <br />
          Провинция/штат: <b>{address.state}</b> <br />
          Индекс: <b>{address.zip}</b> <br />
        </div>
      </div>
    </div>
  )
}

export default SubjectInfo
