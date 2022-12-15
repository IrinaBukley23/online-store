import { WFMComponent } from '../routes';

class AppComponent extends WFMComponent {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: any) {
    super(config);
  }
}

export const appComponent = new AppComponent({
  selector: 'app-root',
  template: `
    <div>
        <h4>App components works!!!</h4>
        <h6>Does it work???</h6>
    </div>
  `,
});
