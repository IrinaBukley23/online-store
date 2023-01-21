import { WFMComponent } from '../../../routes';
import { ComponentConfig, CartItem } from '../../../types';
import visa from '../../../../public/visa.jpg';
import mastercard from '../../../../public/master-card.jpg';
import pease from '../../../../public/peace.jpg';
import paysys from '../../../../public/pay-sys.jpg';
import { cardProviderCoder } from '../../../enum';
import { cardNumberLength, CVVLength, minAddressLength, minNameLength, maxLength } from '../../../routes/tools/constants';
import { EMAIL_REGEXP } from '../../../routes/tools/rexExp';

class Popup extends WFMComponent {

    constructor(config: ComponentConfig) {
        super(config);
    }

    isOpenPopup = false

    public handleInput(event: Event): void {
      const target = event.target as HTMLInputElement;

      if(target.classList.contains('popup__cvv')) {
        target.value = target.value.substr(0, 3);
      }

      const cardNumInput = target.classList.contains('popup__card-num');
      if(cardNumInput) {
        const bankCard = document.querySelector('.popup__card-pay') as HTMLElement;
        target.value = target.value.substr(0, 16);
        switch (target.value) {
          case cardProviderCoder.VISA: 
            bankCard.innerHTML = ` <img src="${visa}" alt="visa">`;
            break;
          case cardProviderCoder.MASTERCARD:
            bankCard.innerHTML = ` <img src="${mastercard}" alt="mastercard">`;
            break;
          case cardProviderCoder.PEACE:
            bankCard.innerHTML = ` <img src="${pease}" alt="pease">`;
            break;
          default:
            bankCard.innerHTML = ` <img src="${paysys}" alt="pease">`;
        }
        const cardNumInput = document.querySelector('.popup__card-num') as HTMLInputElement;

        cardNumInput.value.split(/\d{4}/).filter(item => item !== '').join(' ');
      }

      if(target.classList.contains('month') || target.classList.contains('year')) {
        target.value = target.value.substr(0, 2);
      }

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
        this.validationCardNumber(target);
      } 

      if(target.classList.contains('popup__true')) {
        this.validationCardTrue(target);
      } 

      if(target.classList.contains('popup__cvv')) {
        this.validationCardCvv(target);
      } 
    }

    public handleClick(event: Event): void {
        const target = event.target as HTMLElement;
        
        const closePopupOverlay = target.classList.contains('popup__overlay');
        if(closePopupOverlay) this.closePopup();

        if(target.classList.contains('popup__btn')) {
          const nameValidity = document.querySelector('.popup__name') as HTMLInputElement;
          const phoneValidity = document.querySelector('.popup__phone') as HTMLInputElement;
          const addressValidity = document.querySelector('.popup__address') as HTMLInputElement;
          const emailValidity = document.querySelector('.popup__email') as HTMLInputElement;
          const cardNumValidity = document.querySelector('.popup__card-num') as HTMLInputElement;
          const trueValidity = document.querySelector('.popup__true') as HTMLInputElement;
          const cvvValidity = document.querySelector('.popup__cvv') as HTMLInputElement;
          
          const isValid = !this.validationName(nameValidity) && !this.validationEmail(emailValidity) && !this.validationPhone(phoneValidity) && !this.validationAddress(addressValidity) && !this.validationCardNumber(cardNumValidity) && !this.validationCardTrue(trueValidity) && !this.validationCardCvv(cvvValidity);
          if(isValid) {
            const content = document.querySelector('.popup__content') as HTMLElement;
            const form = document.querySelector('.popup__content form') as HTMLFormElement;

            if(form) form.innerHTML = '';

            if(content) content.innerHTML = `<h3 class="order__message"> Thanks for your order. You will redirect to the store after 3 sec.<h3>`;

            setTimeout(() => {
              this.closePopup();
            }, 3000);

            const cartArr: CartItem[] = [];
            localStorage.setItem('cart', JSON.stringify(cartArr));
            localStorage.setItem('totalSum', '0');
            localStorage.setItem('totalCounter', '0');

            const headerTotalCounterEl = document.querySelector('.header__count') as HTMLElement;
            headerTotalCounterEl.innerHTML = `0`;

            const headerTotalSumEl = document.querySelector('.header__sum p span') as HTMLElement;
            headerTotalSumEl.innerHTML = `0`;

            const cartEl = document.querySelector('.cart') as HTMLElement;
            cartEl.innerHTML = `<h3>Cart is empty</h3>`;
          } else {
            this.validationName(nameValidity);
            this.validationPhone(phoneValidity);
            this.validationAddress(addressValidity);
            this.validationEmail(emailValidity);
            this.validationCardNumber(cardNumValidity);
            this.validationCardTrue(trueValidity);
            this.validationCardCvv(cvvValidity);
          }
        } 
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
        this.validationCardNumber(target);
      } 

      if(target.classList.contains('popup__true')) {
        this.validationCardTrue(target);
      } 

      if(target.classList.contains('popup__cvv')) {
        this.validationCardCvv(target);
      } 
    }

    private closePopup(): void {
      const popup = document.querySelector('.popup') as HTMLElement;
      popup.classList.remove('active');
    }

    private validationName (elem: HTMLInputElement): boolean {
      const nameErr = document.querySelector('.error__name') as HTMLLabelElement;
      const nameEl = document.querySelector('.popup__name') as HTMLInputElement;
      const nameBlock = document.querySelector('.name_block') as HTMLDivElement;
    
      const valueArr = elem.value.split(' ');

      if(valueArr.length < maxLength) {
        nameErr.classList.add('active');
        nameEl.classList.add('active');
        nameBlock.classList.add('active');
        this.isOpenPopup = true;
      } else {
        valueArr.forEach(elem => {
          if(elem.length < CVVLength) {
            nameErr.classList.add('active');
            nameEl.classList.add('active');
            nameBlock.classList.add('active');
            this.isOpenPopup = true;
          } else {
            nameErr.classList.remove('active');
            nameEl.classList.remove('active');
            nameBlock.classList.remove('active');
            this.isOpenPopup = false;
          }
        });
      }
      return this.isOpenPopup;
    }

    private validationPhone(elem: HTMLInputElement): boolean {
      const phoneErr = document.querySelector('.error__phone') as HTMLLabelElement;
      const phoneEl = document.querySelector('.popup__phone') as HTMLInputElement;
      const phoneBlock = document.querySelector('.phone_block') as HTMLDivElement;
      
      if(Number(elem.value.length) < cardNumberLength || elem.value[0] !== '+') {
        phoneErr.classList.add('active');
        phoneEl.classList.add('active');
        phoneBlock.classList.add('active');
        this.isOpenPopup = true;
      } else {
        const phone = elem.value.substring(1);
        if (isNaN(Number(phone))){
          phoneErr.classList.add('active');
          phoneEl.classList.add('active');
          phoneBlock.classList.add('active');
          this.isOpenPopup = true;
        }else {
          phoneErr.classList.remove('active');
          phoneEl.classList.remove('active');
          phoneBlock.classList.remove('active');
          this.isOpenPopup = false;
        }
      }
      return this.isOpenPopup;
    }

    private validationAddress (elem: HTMLInputElement): boolean {
      const addressErr = document.querySelector('.error__address') as HTMLLabelElement;
      const addressEl = document.querySelector('.popup__address') as HTMLInputElement;
      const addressBlock = document.querySelector('.address_block') as HTMLDivElement;
    
      const valueArr = elem.value.split(' ');

      if(valueArr.length < minNameLength) {
        addressErr.classList.add('active');
        addressEl.classList.add('active');
        addressBlock.classList.add('active');
        this.isOpenPopup = true;
      } else {
        valueArr.forEach(elem => {
          if(elem.length < minAddressLength) {
            addressErr.classList.add('active');
            addressEl.classList.add('active');
            addressBlock.classList.add('active');
            this.isOpenPopup = true;
          } else {
            addressErr.classList.remove('active');
            addressEl.classList.remove('active');
            addressBlock.classList.remove('active');
            this.isOpenPopup = false;
          }
        });
      }
      return this.isOpenPopup;
    }

    private validationEmail(elem: HTMLInputElement): boolean {
      const emailErr = document.querySelector('.error__email') as HTMLLabelElement;
      const emailEl = document.querySelector('.popup__email') as HTMLInputElement;
      const emailBlock = document.querySelector('.email_block') as HTMLDivElement;

      if (!isEmailValid(elem.value)) {
        emailErr.classList.add('active');
        emailEl.classList.add('active');
        emailBlock.classList.add('active');
        this.isOpenPopup = true;
      } else {
        emailErr.classList.remove('active');
        emailEl.classList.remove('active');
        emailBlock.classList.remove('active');
        this.isOpenPopup = false;
      }

      function isEmailValid(value: string) {
        return EMAIL_REGEXP.test(value);
      }
      return this.isOpenPopup;
    }

    private validationCardNumber(elem: HTMLInputElement): boolean {
      const cardNumErr = document.querySelector('.error__card-number') as HTMLLabelElement;

      if (elem.value.length < cardNumberLength) {
        cardNumErr.classList.add('active');
        this.isOpenPopup = true;
      } else {
        cardNumErr.classList.remove('active');
        this.isOpenPopup = false;
      }
      return this.isOpenPopup;
    }

    private validationCardTrue(elem: HTMLInputElement): boolean {
      const cardNumErr = document.querySelector('.error__true') as HTMLLabelElement;

      if (elem.value.length < maxLength) {
        cardNumErr.classList.add('active');
        this.isOpenPopup = true;
      } else {
        cardNumErr.classList.remove('active');
        this.isOpenPopup = false;
      }
      return this.isOpenPopup;
    }

    private validationCardCvv(elem: HTMLInputElement): boolean {
      const cvvErr = document.querySelector('.error__cvv') as HTMLLabelElement;
      if(Number(elem.value.length) !== CVVLength) {
        cvvErr.classList.add('active');
      } else {
        if (isNaN(Number(elem.value))){
          cvvErr.classList.add('active');
          this.isOpenPopup = true;
        }else {
          cvvErr.classList.remove('active');
          this.isOpenPopup = false;
        }
      }
      return this.isOpenPopup;
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
                    <input class="popup__card-input popup__true month" type="number" placeholder="Valid True" required> <span> / </span>
                    <input class="popup__card-input popup__true year" type="number" placeholder="Valid True" required>
                    <label class="popup__card-label">CVV:</label>
                    <input class="popup__card-input  popup__cvv" type="number" placeholder="Code" maxlength="3" required>
                    <p class="popup__card-label_true">month<span> / </span>year</p>
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
