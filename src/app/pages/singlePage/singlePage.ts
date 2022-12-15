import { WFMComponent } from '../../../routes/index';

class SinglePage extends WFMComponent {
    constructor(config: any) {
        super(config)
    }
} 

export const singlePage = new SinglePage({
    selector: 'single',
    template: '<h1>Single page</h1>'
});
