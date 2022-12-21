import { ConfigPage } from '../../types';

export class Component {
  template: string;

  selector: string;

  el: HTMLElement | null;

  constructor(config: ConfigPage) {
    this.template = config.template;
    this.selector = config.selector;
    this.el = null;
  }

  render(): void {
    this.el = document.querySelector(this.selector);
    if (!this.el) throw new Error(`Component with selector ${this.selector} wasn't found`);
    this.el.innerHTML = this.template;
  }
}
