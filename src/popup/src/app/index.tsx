import React, { useEffect, useState } from "react";
import { browser } from "webextension-polyfill-ts";
import { Table } from "react-bootstrap";

import { TabStatus, getUrlStatus } from "../lib/tabs";
import useCheckLogin from "../lib/checkAuth";
import { useStateValue } from "../store/state";
import { BackgroundApi } from '../../../background/types';

export default () => {
  const { state } = useStateValue();
  const [ tabStatus, setTabStatus ] = useState<TabStatus | null>(null);

  useCheckLogin();

  useEffect(() => {
    let isSubscribed = true;
    browser.tabs.query({ active: true, currentWindow: true }).then(
      tabs => {
        if (tabs.length < 1 || !tabs[0].url) {
          if (isSubscribed) {
            setTabStatus(null);
          }
          return;
        }
        getUrlStatus(tabs[0].url).then((status) => {
          if (isSubscribed) {
            setTabStatus(status);
          }
        });
      },
      (e) => {
        console.warn(e);
        if (isSubscribed) {
          setTabStatus(null);
        }
      }
    );
    return () => isSubscribed = false;
  }, []);

  if (!state.auth.checked) {
    // Loading
    return (
      <div className='loading'>
        Loading...
      </div>
    );
  }

  if (state.auth.checked && !state.auth.user) {
    // Loading
    return (
      <div className='loading'>
        Log In
      </div>
    );
  }

  return (
    <>
      <a className='section' href="http://localhost:3000/dashboard" title='Top up your account now'>
        <small className='text-muted'>Balance</small><br/>
        { state.auth.user ? state.auth.user.balance : 0 } Nils
        <span className="right text-muted">
          Top Up
        </span>
      </a>
      { tabStatus !== null && (
        <section>
          <p>{ tabStatus.status }</p>
          { tabStatus.status === 'paid' && (
            <>
              <p>Amount: { tabStatus.amount }</p>
              <p>{ tabStatus.created_on }</p>
            </>
          ) }
        </section>
      ) }
      <section>
        <div className='mb-2 text-muted'>Previous payments</div>
        <div className="table-wrapper">
          <Table bordered striped size='sm'>
            <thead>
              <tr>
                <th>Domain</th>
                <th>Amount</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>socialgorithm.org</td>
                <td>1</td>
                <td>4h</td>
              </tr>
              <tr>
                <td>github.com</td>
                <td>1</td>
                <td>6h</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};
