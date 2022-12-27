import { WFMComponent } from '../../../../routes';
import { ComponentConfig, Product } from '../../../../types';
import { productsData } from '../../../../data/productsData';

class DualSlider extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }

    init() {
        function controlFromInput(fromSlider, fromInput, toInput, controlSlider): void {
            const [from, to] = getParsed(fromInput, toInput);
            fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
            if (from > to) {
                fromSlider.value = to;
                fromInput.value = to;
            } else {
                fromSlider.value = from;
            }
        }

        function controlToInput(toSlider: HTMLInputElement, fromInput: HTMLInputElement, toInput: HTMLInputElement, controlSlider: HTMLInputElement) {
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

        function controlFromSlider(fromSlider, toSlider, fromInput) {
            const [from, to] = getParsed(fromSlider, toSlider);
            fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
            if (from > to) {
                fromSlider.value = to;
                fromInput.value = to;
            } else {
                fromInput.value = from;
            }
        }

        function controlToSlider(fromSlider, toSlider, toInput) {
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

        function getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
            const from = parseInt(currentFrom.value, 10);
            const to = parseInt(currentTo.value, 10);
            return [from, to];
        }

        function fillSlider(from: HTMLInputElement, to: HTMLInputElement, sliderColor: string, rangeColor: string, controlSlider: HTMLInputElement) {
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

        function setToggleAccessible(currentTarget: HTMLInputElement): void {
            const toSlider = document.querySelector('#toSlider') as HTMLInputElement;
            if (Number(currentTarget.value) <= 0 ) {
                toSlider.style.zIndex = '2';
            } else {
                toSlider.style.zIndex = '0';
            }
        }

        const fromSlider = document.querySelector('#fromSlider') as HTMLInputElement;
        const toSlider = document.querySelector('#toSlider') as HTMLInputElement;
        const fromInput = document.querySelector('#fromInput') as HTMLInputElement;
        const toInput = document.querySelector('#toInput') as HTMLInputElement;
        fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
        setToggleAccessible(toSlider);

        fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
        toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
        fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
        toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
    }
}

export const dualSlider = new DualSlider({
    selector: 'dual-slider',
    innerComponents: null,
    template: `
            <div class="sliders_control">
                <input id="fromSlider" type="range" value="10" min="0" max="100"/>
                <input id="toSlider" type="range" value="40" min="0" max="100"/>
            </div>
            <div class="form_control">
                <div class="form_control_container">
                    <div class="form_control_container__time">Min</div>
                    <input class="form_control_container__time__input" type="number" id="fromInput" value="10" min="0" max="100"/>
                </div>
                <div class="form_control_container">
                    <div class="form_control_container__time">Max</div>
                    <input class="form_control_container__time__input" type="number" id="toInput" value="40" min="0" max="100"/>
                </div>
            </div>
    `,
});
