import { WFMComponent } from '../../../../routes';
import { ComponentConfig, Product } from '../../../../types';
import { productsData } from '../../../../data/productsData';

export class DualSliderTemplate extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }

    public init(): void {
        function controlFromInput(fromSlider: HTMLInputElement, fromInput: HTMLInputElement, toInput: HTMLInputElement, controlSlider: HTMLInputElement): void {
            const [from, to] = getParsed(fromInput, toInput);
            fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
            if (from > to) {
                fromSlider.value = to;
                fromInput.value = to;
            } else {
                fromSlider.value = from;
            }
        }

        function controlToInput(toSlider: HTMLInputElement, fromInput: HTMLInputElement, toInput: HTMLInputElement, controlSlider: HTMLInputElement): void {
            const [from, to] = getParsed(fromInput, toInput);
            fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
            setToggleAccessible(toInput);
            if (from <= to) {
                toSlider.value = to;
                toInput.value = to;
            } else {
                toInput.value = from;
            }
        }

        function controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromInput: HTMLInputElement): void {
            const [from, to] = getParsed(fromSlider, toSlider);
            fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
            if (from > to) {
                fromSlider.value = to;
                fromInput.value = to;
            } else {
                fromInput.value = from;
            }
        }

        function controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLInputElement): void {
            const [from, to] = getParsed(fromSlider, toSlider);
            fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
            setToggleAccessible(toSlider);
            if (from <= to) {
                toSlider.value = to;
                toInput.value = to;
            } else {
                toInput.value = from;
                toSlider.value = from;
            }
        }

        function getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement): string[] {
            const from = currentFrom.value
            const to = currentTo.value
            return [from, to];
        }

        function fillSlider(from: HTMLInputElement, to: HTMLInputElement, sliderColor: string, rangeColor: string, controlSlider: HTMLInputElement): void {
            const rangeDistance = +to.max - +to.min;
            const fromPosition = +from.value - +to.min;
            const toPosition = +to.value - +to.min;
            controlSlider.style.background = `linear-gradient(
                  to right,
                  ${sliderColor} 0%,
                  ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
                  ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
                  ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
                  ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
                  ${sliderColor} 100%)`;
        }

        const setToggleAccessible = (currentTarget: HTMLInputElement): void => {
            const toSlider = document.querySelector(`${this.selector} #toSlider`) as HTMLInputElement;
            if (Number(currentTarget.value) <= 0 ) {
                toSlider.style.zIndex = '2';
            } else {
                toSlider.style.zIndex = '0';
            }
        }

        const fromSlider = document.querySelector(`${this.selector} #fromSlider`) as HTMLInputElement;
        const toSlider = document.querySelector(`${this.selector} #toSlider`) as HTMLInputElement;
        const fromInput = document.querySelector(`${this.selector} #fromInput`) as HTMLInputElement;
        const toInput = document.querySelector(`${this.selector} #toInput`) as HTMLInputElement;
        fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
        setToggleAccessible(toSlider);

        fromSlider.oninput = (): void => controlFromSlider(fromSlider, toSlider, fromInput);
        toSlider.oninput = (): void => controlToSlider(fromSlider, toSlider, toInput);
        fromInput.oninput = (): void => controlFromInput(fromSlider, fromInput, toInput, toSlider);
        toInput.oninput = (): void => controlToInput(toSlider, fromInput, toInput, toSlider);
    }
}
