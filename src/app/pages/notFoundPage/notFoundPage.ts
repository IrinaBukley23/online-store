import { WFMComponent } from '../../../routes/index';

class NotFoundPage extends WFMComponent {
    constructor(config: any) {
        super(config)
    }
} 

export const notFoundPage = new NotFoundPage({
    selector: 'notFound',
    template: `
        <h1>Not found page</h1>
        <a href="#">Back to main page</a>
    `
});
