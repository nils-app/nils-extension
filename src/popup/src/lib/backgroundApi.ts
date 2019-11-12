import { browser } from "webextension-polyfill-ts";

export const getBackgroundApi = async (): Promise<BackgroundApi> => {
  return new Promise((resolve, reject) => {
    browser.runtime.getBackgroundPage(async (backgroundWindow: any) => {
      if (!backgroundWindow.nils) {
        reject(null);
      }
      const backgroundApi: BackgroundApi = backgroundWindow.nils;
      resolve(backgroundApi);
    });
  });
};