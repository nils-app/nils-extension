import React from 'react';
import classNames from 'classnames';

import { TabStatus } from '../../lib/tabs';
import styles from './index.module.scss';

type Props = {
  tabStatus: TabStatus | null,
};

export default (props: Props) => {
  const { tabStatus } = props;

  if (tabStatus === null || !tabStatus.url) {
    return null;
  }

  let statusBg = 'bg-info';
  if (tabStatus) {
    switch (tabStatus.status) {
      case 'paid':
        statusBg = 'bg-success';
        break;
      case 'blocked':
        statusBg = 'bg-danger';
        break;
    }
  }

  let actions = null;
  if (tabStatus.status === 'unsupported') {
    actions = (
      <>
        Yours? <a href="#">Claim Domain</a>
      </>
    );
  } else if (tabStatus.status === 'paid') {
    actions = (
      <>
        <a href="#">Undo</a> | <a href="#">Change</a> | <a href="#" className={ styles.danger }>Block</a>
      </>
    );
  }

  return (
    <section className='text-center'>
        <div className={ classNames('shadow-sm', styles.statusBtn, statusBg)}>
          { tabStatus.status === 'unsupported' && (
            <>
              { tabStatus.url } is not registered
            </>
          ) }
          { tabStatus.status === 'paid' && (
            <>
              Paid <b>{ tabStatus.amount } Nils</b> to { tabStatus.url }!
            </>
          ) }
          { tabStatus.status === 'blocked' && (
            <>
              { tabStatus.url } is blocked
            </>
          ) }
        </div>
        <div className={ styles.actions }>
          { actions }
        </div>
      </section>
  );
};