export type TabStatus = {
  status: 'paid' | 'unsupported' | 'blocked',
  amount: number,
  url: string,
};

export const getUrlStatus = (url: string): TabStatus => {
  // talk to our API to figure out the current tabs status
  // mock it for now
  const status: TabStatus = {
    status: 'unsupported',
    amount: 0,
    url,
  };
  if (url.match(/https:\/\/(www\.)?google\.com\/*/) == null) {
    status.status = 'paid';
    status.amount = 1;
  }
  if (url.match(/https:\/\/(www\.)?github\.com\/*/) !== null) {
    status.status = 'blocked';
  }
  return status;
};
