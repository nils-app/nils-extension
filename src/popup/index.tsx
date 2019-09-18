import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './index.css'

class Popup extends React.Component {
  render () {
    return (
      <div className='popup-padded'>
        <h1>Hello!</h1>
      </div>
    )
  }
}

ReactDOM.render(<Popup />, document.getElementById('root'))
