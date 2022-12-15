import { WFMComponent } from '../../../routes/index';

class HomePage extends WFMComponent {
    constructor(config: any) {
        super(config)
    }
} 

export const homePage = new HomePage({
    selector: 'home',
    template: `
        <h1>Home page</h1>
        <div><h4>App components works!!!</h4></div>
    `
});
