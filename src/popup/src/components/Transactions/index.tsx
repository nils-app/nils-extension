import React, { useEffect } from "react";
import Timespan from 'readable-timespan';
import classNames from 'classnames';

import { useStateValue } from "../../store/state";
import { fetchResource } from "../../lib/fetch";
import { Transaction } from "../../store/types";

import styles from './index.module.scss';

const timespan = new Timespan({
  millisecond: 'm',
  second: 's',
  minute: 'm',
  hour: 'h',
  day: 'd',
  week: 'w',
  month: 'm',
  year: 'y',
  now: 'now',
  space: false,
  pluralize: false,
});

export default () => {
  const { state, dispatch } = useStateValue();

  useEffect(() => {
    fetchResource('/users/transactions', 'GET').then((transactions: Transaction[]) => {
      dispatch({
        type: 'transactions',
        payload: transactions,
      });
    });
  }, []);

  if (!state.transactions.checked || !state.transactions.data) {
    return (
      <span className="text-muted">
        Loading...
      </span>
    );
  }

  const now = new Date();

  return (
    <>
      { state.transactions.data.map(transaction => {
        const amount = Math.round(transaction.amount_nils);
        const domain = (
          <b><a href={ `https://${transaction.domain}` }>{ transaction.domain }</a></b>
        );
        const created_on = new Date(transaction.created_on);
        let when = timespan.parse(now.getTime() - created_on.getTime());
        return (
          <p key={ transaction.uuid }>
            <span title={ created_on.toLocaleString() } className={ classNames(styles.time, styles.textMuted) }>{ when }</span> { amount } Nils <span className={ styles.textMuted }>to</span> { domain }
          </p>
        );
      }) }
    </>
  );
};