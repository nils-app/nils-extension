import { fetchResource } from './fetch';
// import { sha256 } from './hash';

export type TabStatus = {
  status: 'paid' | 'unsupported' | 'blocked',
  amount: number,
  url: string,
  created_on: Date | null,
};

export const getUrlStatus = async (url: string): Promise<TabStatus> => {
  // talk to our API to figure out the current tabs status
  // mock it for now
  const domain = new URL(url).hostname;
  const status: TabStatus = {
    status: 'unsupported',
    amount: 0,
    url: domain,
    created_on: null,
  };

  try {
    if (domain.length < 1) {
      return status;
    }
    // TODO: Hash domain
    const domainHash = domain;
    // const domainHash = await sha256(domain);
    // console.log('hashed', domainHash);
    const data = await fetchResource(`/users/pay`, 'POST', {
      domain: domainHash,
      amount_nils: 0,
    });
    console.log('Paid!', data);

    // TODO: detect blocked domains

    status.status = 'paid';
    status.amount = data.amount_nils;
    status.created_on = data.created_on;
  } catch (e) {
    if (e.status === 404) {
      // domain not registered
      console.log('Domain not registered');
      return status;
    }
    console.warn('Failed to send payment', e);
  }

  return status;
};
