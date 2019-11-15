export type User = {
  uuid: string,
  email?: string,
  balance: number,
  transferwise_id: number | null,
  currency: string | null,
  created_on: Date,
};

export type Transaction = {
  uuid: string,
  domain: string,
  amount_nils: number,
  created_on: Date,
};

export type AppState = {
  auth: {
    checked: boolean,
    loggedIn: boolean,
    user: User | null,
    csrf: string | null,
  },
  transactions: {
    checked: boolean,
    errors: any,
    data: Transaction[],
  },
  offline: boolean,
};

export type Action = {
  type: string,
  payload?: any,
};

export type AppContext = {
  state: AppState,
  dispatch: React.Dispatch<Action>,
};