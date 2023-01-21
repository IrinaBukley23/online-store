import { ComponentConfig, ComponentInterface } from '../../types';

export class Component implements ComponentInterface {
    getTemplate: (params?: { [key: string]: string }) => string;
    selector: string;
    el: HTMLElement | null;
    innerComponents: ComponentInterface[] | null;
    clickSelector: string | undefined;
    public init?(): void;
    public handleClick?(e: Event): void;
    public handleInputChange?(e: Event): void;
    public handleInput?(e: Event): void;
    public handleBlur?(e: Event): void;

    constructor(config: ComponentConfig) {
        this.getTemplate = config.getTemplate;
        this.selector = config.selector;
        this.el = null;
        this.innerComponents = config.innerComponents;
    }

    render(params?: { [key: string]: string }): void {
        const [_, id] = window.location.hash.split('/');
        const template = this.getTemplate(id ? { id } : params);
        this.el = document.querySelector(this.selector);
        if (!this.el) throw new Error(`Component with selector ${this.selector} wasn't found`);
        this.el.innerHTML = template;

        if (this.innerComponents) this.initInnerComponents();

        if (this.init) this.init();
        this._initEvents();
    }

    initInnerComponents(): void {
        if (this.innerComponents) this.innerComponents.forEach((component) => component.render());
    }

    _initEvents(): void {
        const componentElem = this.el;
        
        if (this.handleInputChange) {
            const inputChangeHandler = this.handleInputChange.bind(this);
            componentElem?.addEventListener('change', inputChangeHandler);
        }

        if (this.handleInput) {
            const inputHandler = this.handleInput.bind(this);
            componentElem?.addEventListener('input', inputHandler);
        }

        if (this.handleClick) {
            const clickHandler = this.handleClick.bind(this);
            componentElem?.addEventListener('click', clickHandler);
        }

        if (this.handleBlur) {
            const blurHandler = this.handleBlur.bind(this);
            componentElem?.addEventListener('focusout', blurHandler);
        }
    }
}
