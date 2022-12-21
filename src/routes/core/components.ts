import { ComponentConfig } from '../../types';

export class Component implements Component {
    template: string;
    selector: string;
    el: HTMLElement | null;
    innerComponents: null | Component[];

    constructor(config: ComponentConfig) {
        this.template = config.template;
        this.selector = config.selector;
        this.el = null;
        this.innerComponents = config.innerComponents;
    }

    render(): void {
        this.el = document.querySelector(this.selector);
        if (!this.el) throw new Error(`Component with selector ${this.selector} wasn't found`);
        this.el.innerHTML = this.template;

        this.initInnerComponents();
    }

    initInnerComponents(): void {
        if (this.innerComponents) this.innerComponents.forEach((component) => component.render);
    }
}
