import { WFMComponent } from '../../../routes';
import { ComponentConfig } from '../../../types';
import visa from '../../../../public/visa.jpg';
import mastercard from '../../../../public/masret-card.jpg';
import pease from '../../../../public/peace.jpg';
import paysys from '../../../../public/pay-sys.jpg';

class Popup extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }

}

export const popup = new Popup({
    selector: 'popup',
    innerComponents: null,
    getTemplate() {
      return `
        <div class="popup"> 
          <div class="popup__overlay">
            <div class="popup__content">
              <form>
                <h6 class="popup__title">Personal details</h6>
                <div class="popup__personal">
                    <input class="popup__personal-input" type="text" placeholder="Name">
                    <label class="error">error</label>
                    <input class="popup__personal-input" type="tel" placeholder="Phone number">
                    <label class="error">error</label>
                    <input class="popup__personal-input" type="text" placeholder="Delivery address">
                    <label class="error">error</label>
                    <input class="popup__personal-input" type="email" placeholder="E-mail">
                    <label class="error">error</label>
                </div>
                <h6 class="popup__title">Credit card details</h6>
                <div class="popup__card">
                    <div class="popup__card-number">
                        <label class="popup__card-pay"><img src="${paysys}" alt="card"></label>
                        <input class="popup__card-num" type="number" placeholder="Card number">
                    </div>
                    <label class="popup__card-label">Valid:</label>
                    <input class="popup__card-input" type="number" placeholder="Valid True">
                    <label class="popup__card-label">CVV:</label>
                    <input class="popup__card-input" type="number" placeholder="Code">
                </div>
                <label class="error">Card number - error</label>
                <label class="error">Card valid true - error</label>
                <label class="error">Card CVV - error</label>
                <input class="popup__btn" type="submit" value="confirm">
              </form>
            </div>
          </div>
        </div>
    `}
});
