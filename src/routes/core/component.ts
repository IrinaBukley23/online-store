import { ComponentConfig, ComponentInterface, EventsObject } from '../../types';

export class Component implements ComponentInterface {
    template: string;
    selector: string;
    el: HTMLElement | null;
    innerComponents: ComponentInterface[] | null;
    events?: () => { [key: string]: string };

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
        if (!this.events) return;

        const events: EventsObject = this.events();

        Object.keys(events).forEach((key): void => {
            const listenerTypeAndSelector = key.split(' ');
            const [eventType, targetSelector] = listenerTypeAndSelector;

            const targetElements = this.el?.querySelectorAll(targetSelector);

            targetElements?.forEach((elem) => {
                elem?.addEventListener(eventType, this[events[key]].bind(this));
            });
        });
    }
}
