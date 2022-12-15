export class Component {
  template: any;

  selector: string;

  constructor(config: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-sequences
    this.template = config.template,
    this.selector = config.selector;
  }

  render(): void {
    (document.querySelector(this.selector) as HTMLElement).innerHTML = this.template;
  }
}
