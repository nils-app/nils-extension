import React, { useEffect } from "react";
import { Table } from "react-bootstrap";

import { useStateValue } from "../../store/state";
import { fetchResource } from "../../lib/fetch";
import { Transaction } from "../../store/types";

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

  return (
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
          { state.transactions.data.map(transaction => (
            <tr key={ transaction.uuid }>
              <td>
                { transaction.domain }
              </td>
              <td>
                { transaction.amount_nils }
              </td>
              <td>
                { transaction.created_on }
              </td>
            </tr>
          )) }
        </tbody>
      </Table>
    </div>
  );
};