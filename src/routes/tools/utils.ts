import { Route } from '../../types';

const wfm = {
  isUndefined(d: Route): boolean {
    return typeof d === 'undefined';
  },
};

export { wfm };
