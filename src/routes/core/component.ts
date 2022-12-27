import { ComponentConfig, ComponentInterface } from '../../types';

export class Component implements ComponentInterface {
    template: string;
    selector: string;
    el: HTMLElement | null;
    innerComponents: ComponentInterface[] | null;
    clickSelector: string | undefined;
    public handleClick?(e: Event): void;
    public handleInputChange?(e: Event): void;

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
        // Add input change handler
        const componentElem = this.el;
        if (this.handleInputChange) {
            const inputChangeHandler = this.handleInputChange.bind(this);
            componentElem?.addEventListener('change', inputChangeHandler);
        }

        const clickSelector = this.clickSelector;
        const eventClick = 'click';
        const listener = this.handleClick?.bind(this);
        if (!clickSelector) return;
        if (!listener) return;

        const elems = this.el?.querySelectorAll(clickSelector);
        elems?.forEach((elem) => {
            if (elem) {
                elem.addEventListener(eventClick, listener);
            }
        });
    }
}
