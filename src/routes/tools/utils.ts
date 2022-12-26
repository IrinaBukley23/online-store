import { Route } from '../../types';

const wfm = {
  delay(ms = 1000): Promise<any> {
    return new Promise((resolve: any, _reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },
  isUndefined(d: Route | any): boolean {
    return typeof d === 'undefined';
  },

};

export { wfm };
