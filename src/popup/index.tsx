import * as React from "react"
import * as ReactDOM from "react-dom"

import "./index.css"

class Popup extends React.Component {
    render() {
        return (
            <div className="popup-padded">
                <h1>{ chrome.i18n.getMessage("l10nHello") }</h1>
            </div>
        )
    }
}

// --------------

ReactDOM.render(
    <Popup />,
    document.getElementById('root')
)