import { PromoCodesText, Route } from '../../types';

const wfm = {
  delay(ms = 1000): Promise<any> {
    return new Promise((resolve: any, _reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },
  isUndefined(d: Route): boolean {
    return typeof d === 'undefined';
  },

};

const promocodesDescription: PromoCodesText = {
  rs: 'Rolling Scopes School - 10%', 
  epm: 'EPAM Systems - 10%' 
}

export { wfm, promocodesDescription };
