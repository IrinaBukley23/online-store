import { ComponentConfig, ComponentInterface } from '../../types';

export class Component implements ComponentInterface {
    getTemplate: (params?: { [key: string]: string }) => string;
    selector: string;
    el: HTMLElement | null;
    innerComponents: ComponentInterface[] | null;
    clickSelector: string | undefined;
    detailsSelector: string | undefined;
    cartSelector: string | undefined;
    public getDetails?(e: Event): void;
    public addToCart?(e: Event): void;
    public changeCounter?(e: Event): void;
    public init?(): void;
    public handleClick?(e: Event): void;
    public handleInputChange?(e: Event): void;
    public handleOnInput?(e: Event): void;

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
        // Add input change handler
        const componentElem = this.el;
        if (this.handleInputChange) {
            const inputChangeHandler = this.handleInputChange.bind(this);
            componentElem?.addEventListener('change', inputChangeHandler);
        }

        // Add on input handler
        if (this.handleOnInput) {
            const onInputHandler = this.handleOnInput.bind(this);
            componentElem?.addEventListener('input', onInputHandler);
        }

        // Add click handler

        if (this.handleClick) {
            const clickHandler = this.handleClick.bind(this);
            componentElem?.addEventListener('click', clickHandler);
        }

        const cartSelector = this.cartSelector;
        const detailsSelector = this.detailsSelector;

        const listenerToCartPage = this.addToCart?.bind(this);
        const listenerGetDetails = this.getDetails?.bind(this);

        if (!cartSelector) return;
        if (!listenerToCartPage) return;

        if (!detailsSelector) return;
        if (!listenerGetDetails) return;

        const clickSelector = this.clickSelector;
        const listener = this.handleClick?.bind(this);
        if (!clickSelector) return;
        if (!listener) return;

        const toCartBtns = this.el?.querySelectorAll(cartSelector);
        toCartBtns?.forEach((btn) => {
            if (btn) {
                btn.addEventListener('click', listenerToCartPage);
            }
        });

        const detailsBtn = this.el?.querySelectorAll(detailsSelector);
        detailsBtn?.forEach((btn) => {
            if (btn) {
                btn.addEventListener('click', listenerGetDetails);
            }
        });
    }
}
