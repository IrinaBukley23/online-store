export class Module {
  components: any;
  bootstrapComponent: any;

  constructor(config: any) {
    this.components = config.components;
    this.bootstrapComponent = config.bootstrap;
  }

  start(): void {
    this.initComponents();
  }

  initComponents(): void {
    this.bootstrapComponent.render();
    this.components.forEach((c: any): void => c.render());
  }
}
