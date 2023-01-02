import { ComponentConfig, ComponentInterface } from '../../types';

export class Component implements ComponentInterface {
    getTemplate: (params?: {[key: string]: string}) => string;
    selector: string;
    el: HTMLElement | null;
    innerComponents: ComponentInterface[] | null;
    clickSelector: string | undefined;
    public handleClick?(e: Event): void;
    public handleInputChange?(e: Event): void;
    public handleInput?(e: Event): void;

    constructor(config: ComponentConfig) {
        this.getTemplate = config.getTemplate;
        this.selector = config.selector;
        this.el = null;
        this.innerComponents = config.innerComponents;
    }

    render(): void {
        const [_, id] = window.location.hash.split('/');
        const template = this.getTemplate(id ? { id } : {});

        this.el = document.querySelector(this.selector);
        if (!this.el) throw new Error(`Component with selector ${this.selector} wasn't found`);
        this.el.innerHTML = template;
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

        // Add input handler
        if (this.handleInput) {
            const inputHandler = this.handleInput.bind(this);
            componentElem?.addEventListener('input', inputHandler);
        }

        // Add click handler
        if(this.handleClick) {
            const clickHandler = this.handleClick.bind(this);
            componentElem?.addEventListener('click', clickHandler)
        }
    }
}
