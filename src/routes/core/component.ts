import { ComponentConfig, ComponentInterface, EventsObject } from '../../types';

export class Component implements ComponentInterface {
    template: string;
    selector: string;
    el: HTMLElement | null;
    innerComponents: ComponentInterface[] | null;
    clickSelector: string | undefined;
    clickAction!: string;

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

        if (this.innerComponents) this.initInnerComponents();

        this._initEvents();
    }

    initInnerComponents(): void {
        if (this.innerComponents) this.innerComponents.forEach((component) => component.render());
    }

    _initEvents(): void {
        const clickSelector = this.clickSelector;
        if (!clickSelector) return;

        const clickAction = this.clickAction;
        const elems = this.el?.querySelectorAll(clickSelector);
        console.log(clickAction)
        elems?.forEach((elem) => {
            elem?.addEventListener('click', clickAction);
        });
    }
}