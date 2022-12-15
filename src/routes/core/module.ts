export class Module {
  components: any;

  constructor(config: any) {
    this.components = config.components;
  }

  start(): void {
    this.initComponents();
  }

  initComponents(): void {
    this.components.forEach((c: any): void => c.render());
  }
}
