import { WFMComponent } from '../../../routes';
import { ComponentConfig } from '../../../types';
import visa from '../../../../public/visa.jpg';
import mastercard from '../../../../public/master-card.jpg';
import pease from '../../../../public/peace.jpg';
import paysys from '../../../../public/pay-sys.jpg';

class Popup extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }

    public handleInput(event: Event): void {
      const target = event.target as HTMLInputElement;

      if(target.classList.contains('popup__cvv')) {
        target.value = target.value.substr(0, 3);
      }

      const cardNumInput = target.classList.contains('popup__card-num');
      if(cardNumInput) {
        const bankCard = document.querySelector('.popup__card-pay');
        target.value = target.value.substr(0, 16);
        if(target.value[0] === '4'){
          if(bankCard) bankCard.innerHTML = ` <img src="${visa}" alt="visa">`;
        } 
        if(target.value[0] === '5') {
          if(bankCard) bankCard.innerHTML = ` <img src="${mastercard}" alt="mastercard">`;
      }  
        if(target.value[0] === '6') {
          if(bankCard) bankCard.innerHTML = ` <img src="${pease}" alt="pease">`;
        }
      }
    }

    public handleClick(event: Event): void {
        const target = event.target as HTMLElement;
        
        const closePopupOverlay = target.classList.contains('popup__overlay');
        if(closePopupOverlay) this.closePopup();
    }

    public handleBlur(event: Event): void {
      const target = event.target as HTMLInputElement;

      if(target.classList.contains('popup__name')) {
        this.validationName(target);
      }

      if(target.classList.contains('popup__phone')) {
        this.validationPhone(target);
      } 

      if(target.classList.contains('popup__address')) {
        this.validationAddress(target);
      } 

      if(target.classList.contains('popup__email')) {
        this.validationEmail(target);
      } 

      if(target.classList.contains('popup__card-num')) {
        // this.validationCardCvv(target);
      } 

      if(target.classList.contains('popup__true')) {
        // this.validationCardCvv(target);
      } 

      if(target.classList.contains('popup__cvv')) {
        this.validationCardCvv(target);
      } 

    }

    private closePopup(): void {
        const popup = document.querySelector('.popup') as HTMLElement;
        popup.classList.remove('active');
    }

    private validationName (elem: HTMLInputElement): void {
      const nameErr = document.querySelector('.error__name') as HTMLLabelElement;
      const nameEl = document.querySelector('.popup__name') as HTMLInputElement;
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

    private validationPhone(elem: HTMLInputElement): void {
      const phoneErr = document.querySelector('.error__phone') as HTMLLabelElement;
      const phoneEl = document.querySelector('.popup__phone') as HTMLInputElement;
      const phoneBlock = document.querySelector('.phone_block') as HTMLDivElement;
      
      if(+elem.value.length < 9 || elem.value[0] !== '+') {
        phoneErr.classList.add('active');
        phoneEl.classList.add('active');
        phoneBlock.classList.add('active');
      } else {
        let phone = elem.value.substring(1);
        if (isNaN(+phone)){
          phoneErr.classList.add('active');
          phoneEl.classList.add('active');
          phoneBlock.classList.add('active');
        }else {
          phoneErr.classList.remove('active');
          phoneEl.classList.remove('active');
          phoneBlock.classList.remove('active');
        }
      }
    }

    private validationAddress (elem: HTMLInputElement): void {
      const addressErr = document.querySelector('.error__address') as HTMLLabelElement;
      const addressEl = document.querySelector('.popup__address') as HTMLInputElement;
      const addressBlock = document.querySelector('.address_block') as HTMLDivElement;
    
      let valueArr = elem.value.split(' ');

      if(valueArr.length < 3) {
        addressErr.classList.add('active');
        addressEl.classList.add('active');
        addressBlock.classList.add('active');
      } else {
        valueArr.forEach(elem => {
          if(elem.length < 5) {
            addressErr.classList.add('active');
            addressEl.classList.add('active');
            addressBlock.classList.add('active');
          } else {
            addressErr.classList.remove('active');
            addressEl.classList.remove('active');
            addressBlock.classList.remove('active');
          }
        });
      }
    }

    private validationEmail(elem: HTMLInputElement): void {
      const emailErr = document.querySelector('.error__email') as HTMLLabelElement;
      const emailEl = document.querySelector('.popup__email') as HTMLInputElement;
      const emailBlock = document.querySelector('.email_block') as HTMLDivElement;

      const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

      if (!isEmailValid(elem.value)) {
        emailErr.classList.add('active');
        emailEl.classList.add('active');
        emailBlock.classList.add('active');
      } else {
        emailErr.classList.remove('active');
        emailEl.classList.remove('active');
        emailBlock.classList.remove('active');
      }

      function isEmailValid(value: string) {
        return EMAIL_REGEXP.test(value);
      }
    }

    private validationCardCvv(elem: HTMLInputElement): void {
      const cvvErr = document.querySelector('.error__cvv') as HTMLLabelElement;
      if(+elem.value.length !== 3) {
        cvvErr.classList.add('active');
      } else {
        if (isNaN(+elem.value)){
          cvvErr.classList.add('active');
        }else {
          cvvErr.classList.remove('active');
        }
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
                      <input class="popup__personal-input popup__name" type="text" placeholder="Name" required>
                      <label class="error error__name">error</label>
                    </div>
                    <div class="phone_block">
                      <input class="popup__personal-input popup__phone" type="tel" placeholder="Phone number" maxlength="13" required>
                      <label class="error error__phone">error</label>
                    </div>
                    <div class="address_block">
                      <input class="popup__personal-input popup__address" type="text" placeholder="Delivery address" required>
                      <label class="error error__address">error</label>
                    </div>
                    <div class="email_block">
                      <input class="popup__personal-input popup__email" type="email" placeholder="E-mail" required>
                      <label class="error error__email">error</label>
                    </div>
                </div>
                <h6 class="popup__title">Credit card details</h6>
                <div class="popup__card">
                    <div class="popup__card-number">
                        <label class="popup__card-pay">
                          <img src="${paysys}" alt="card">
                        </label>
                        <input class="popup__card-num" type="number" placeholder="Card number" required>
                    </div>
                    <label class="popup__card-label">Valid:</label>
                    <input class="popup__card-input popup__true" type="number" placeholder="Valid True" required>
                    <label class="popup__card-label">CVV:</label>
                    <input class="popup__card-input  popup__cvv" type="number" placeholder="Code" maxlength="3" required>
                </div>
                <label class="error error__card-number">Card number - error</label>
                <label class="error error__true">Card valid true - error</label>
                <label class="error error__cvv">Card CVV - error</label>
                <input class="popup__btn" type="submit" value="confirm">
              </form>
            </div>
          </div>
        </div>
    `}
});
