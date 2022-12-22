import { Route } from '../../types';

const wfm = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delay(ms = 1000): Promise<any> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new Promise((resolve: any) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    },
    isUndefined(d: Route): boolean {
        return typeof d === 'undefined';
    },
};

export { wfm };
