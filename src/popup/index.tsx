import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
import { browser } from 'webextension-polyfill-ts';

import { getUrlStatus, TabStatus } from '../lib/tab';

import './index.css';

type State = {
  tabStatus: TabStatus,
};

class Popup extends React.Component {
  state: State = {
    tabStatus: null,
  };

  getCurrentTab () {
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      if (tabs.length < 1) {
        console.log(' no tab!');
        return null;
      }
      this.setState({
        tabStatus: getUrlStatus(tabs[0].url),
      });
    }, () => {
      this.setState({
        tabStatus: null,
      });
    });
  }

  componentDidMount () {
    this.getCurrentTab();
  }

  renderTabStatus () {
    let content = 'Unsupported';
    let className = 'unsupported';

    if (this.state.tabStatus) {
      const { status, amount } = this.state.tabStatus;
      className = status;
      if (status === 'blocked') {
        content = 'Blocked';
      } else if (status === 'paid') {
        content = `Paid! ${amount}`;
      } else {
        content = 'Unsupported';
      }
    }

    console.log('status', this.state.tabStatus);

    return (
      <div className={classnames('status', className)}>
        {content}
      </div>
    );
  }

  render () {
    return (
      <div className='popup-padded'>
        {this.renderTabStatus()}
        <div>
          <h2>Balance:</h2>
          <p>100 Nils</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById('root'));
