import { ComponentConfig, Product } from '../../../../types';
import { DualSliderTemplate} from './dualSliderTemplate'
import { productsData } from '../../../../data/productsData';

class DualSliderStock extends DualSliderTemplate {
    private products: Product[];
    constructor(config: ComponentConfig) {
        super(config);
        this.products = productsData.products;
    }

    public render(): void {
        const min = this.getMinValue();
        const max = this.getMaxValue();
        super.render({ min, max })
    }

    public getMinValue(): string {
        const stock = this.products.map(product => product.stock);
        const min = Math.min(...stock);

        return String(min);
    }

    public getMaxValue(): string {
        const stock = this.products.map(product => product.stock);
        const max = Math.max(...stock);

        return String(max);
    }
}

export const dualSliderStock = new DualSliderStock({
    selector: 'dual-slider-stock',
    innerComponents: null,
    getTemplate: (options) => `
            <h5 class="dual-slider__title">In Stock</h5>
            <div class="sliders_control">
                <input id="fromSlider" type="range" value="${options?.min}" min="${options?.min}" max="${options?.max}"/>
                <input id="toSlider" type="range" value="${options?.max}" min="${options?.min}" max="${options?.max}"/>
            </div>
            <div class="form_control">
                <div class="form_control_container">
                    <div class="form_control_container__time">Min</div>
                    <input class="form_control_container__time__input" type="number" id="fromInput" value="${options?.min}" min="${options?.min}" max="${options?.max}"/>
                </div>
                <div class="form_control_container">
                    <div class="form_control_container__time">Max</div>
                    <input class="form_control_container__time__input" type="number" id="toInput" value="${options?.max}" min="${options?.min}" max="${options?.max}"/>
                </div>
            </div>
    `});
