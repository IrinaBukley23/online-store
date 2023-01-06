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

    public handleClick(event: Event): void {
        const target = event.target as HTMLElement;
        
        const closePopupOverlay = target.classList.contains('popup__overlay');
        if(closePopupOverlay) this.closePopup();
    }

    public handleBlur(event: Event): void {
      const target = event.target as HTMLInputElement;

      if(target.classList.contains('popup_name')) {
        this.validationName(target);
      }

      if(target.classList.contains('popup__phone')) {
        this.validationPhone(target);
      } 

      if(target.classList.contains('popup__address')) {
        // this.validationPerson(target, '.error__address', '.popup__address', '.address_block');
      } 

      if(target.classList.contains('popup__email')) {
        // this.validationPerson(target, '.error__email', '.popup__email', '.email_block');
      } 
    }

    private closePopup() {
        const popup = document.querySelector('.popup') as HTMLElement;
        popup.classList.remove('active');
    }

    private validationName (elem: HTMLInputElement) {
      const nameErr = document.querySelector('.error__name') as HTMLLabelElement;
      const nameEl = document.querySelector('.popup_name') as HTMLInputElement;
      const nameBlock = document.querySelector('.name_block') as HTMLDivElement;
    
      let valueArr = elem.value.split(' ');

      if(valueArr.length < 2) {
        nameErr.classList.add('active');
        nameEl.classList.add('active');
        nameBlock.classList.add('active');
      } else {
        valueArr.forEach(elem => {
          if(elem.length < 3) {
            nameErr.classList.add('active');
            nameEl.classList.add('active');
            nameBlock.classList.add('active');
          } else {
            nameErr.classList.remove('active');
            nameEl.classList.remove('active');
            nameBlock.classList.remove('active');
          }
        });
      }
      
    }

    private validationPhone(elem: HTMLInputElement) {
      const phoneErr = document.querySelector('.error__phone') as HTMLLabelElement;
      const phoneEl = document.querySelector('.popup__phone') as HTMLInputElement;
      const phoneBlock = document.querySelector('.phone_block') as HTMLDivElement;
      
      if(+elem.value.length < 9 || elem.value[0] !== '+') {
        let phone = elem.value.substring(1);
    
        console.log(!isNaN(Number(phone)), phone)
        if(!phone) {
          phoneErr.classList.add('active');
          phoneEl.classList.add('active');
          phoneBlock.classList.add('active');
        }else{
          phoneErr.classList.remove('active');
          phoneEl.classList.remove('active');
          phoneBlock.classList.remove('active');
        }
        phoneErr.classList.add('active');
        phoneEl.classList.add('active');
        phoneBlock.classList.add('active');
      } else {
        phoneErr.classList.remove('active');
        phoneEl.classList.remove('active');
        phoneBlock.classList.remove('active');
      }
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
                    <div class="name_block">
                      <input class="popup__personal-input popup_name" type="text" placeholder="Name">
                      <label class="error error__name">error</label>
                    </div>
                    <div class="phone_block">
                      <input class="popup__personal-input popup__phone" type="tel" placeholder="Phone number" maxlength="13">
                      <label class="error error__phone">error</label>
                    </div>
                    <div class="address_block">
                      <input class="popup__personal-input popup__address" type="text" placeholder="Delivery address">
                      <label class="error error__address">error</label>
                    </div>
                    <div class="email_block">
                      <input class="popup__personal-input popup__email" type="email" placeholder="E-mail">
                      <label class="error error__email">error</label>
                    </div>
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
