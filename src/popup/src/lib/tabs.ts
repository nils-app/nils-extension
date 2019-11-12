import { fetchResource } from './fetch';

export type TabStatus = {
  status: 'paid' | 'unsupported' | 'blocked',
  amount: number,
  url: string,
};

export const getUrlStatus = async (url: string): Promise<TabStatus> => {
  // talk to our API to figure out the current tabs status
  // mock it for now
  const status: TabStatus = {
    status: 'unsupported',
    amount: 0,
    url,
  };

  try {
    const domain = new URL(url).hostname;
    if (domain.length < 1) {
      console.warn('Invalid domain (empty)');
      return status;
    }
    const data = await fetchResource(`/users/pay`, 'POST', {
      domain,
      amount_nils: 0,
    });
    console.log('Paid!', data);
  } catch (e) {
    console.warn('Failed to send payment', e);
  }

  if (url.match(/https:\/\/(www\.)?google\.com\/*/) == null) {
    status.status = 'paid';
    status.amount = 1;
  }
  if (url.match(/https:\/\/(www\.)?github\.com\/*/) !== null) {
    status.status = 'blocked';
  }
  return status;
};
