import { browser } from "webextension-polyfill-ts";

import { BackgroundApi } from '../../../background/types';

export const getBackgroundApi = async (): Promise<BackgroundApi> => {
  return new Promise((resolve, reject) => {
    browser.runtime.getBackgroundPage().then((backgroundWindow: any) => {
      if (!backgroundWindow.nils) {
        reject(null);
      }
      const backgroundApi: BackgroundApi = backgroundWindow.nils;
      resolve(backgroundApi);
    });
  });
};