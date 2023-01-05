import { WFMComponent } from '../../../routes';
import { ComponentConfig } from '../../../types';

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
                <h6>Personal details</h6>
                <input type="text" placeholder="Name">
                <input type="tel" placeholder="Phone number">
                <input type="text" placeholder="Delivery address">
                <input type="email" placeholder="E-mail">
                <h6>Credit card details</h6>
                <div class="popup__card">
                    <label><img src="" alt="card"></label>
                    <input type="number" placeholder="Card number">
                    <label>Valid:</label>
                    <input type="number" placeholder="Valid True">
                    <label>CVV:</label>
                    <input type="number" placeholder="Code">
                </div>
                <input type="submit" value="confirm">
              </form>
            </div>
          </div>
        </div>
    `}
});
