import { PromoCodesText, Route } from '../../types';

const wfm = {
  isUndefined(d: Route): boolean {
    return typeof d === 'undefined';
  },
};

const promocodesDescription: PromoCodesText = {
  rs: 'Rolling Scopes School - 10%', 
  epm: 'EPAM Systems - 10%' 
}

export { wfm, promocodesDescription };
