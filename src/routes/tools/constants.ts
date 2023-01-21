import { PromoCodesText } from "../../types";

const promocodesDescription: PromoCodesText = {
    rs: 'Rolling Scopes School - 10%', 
    epm: 'EPAM Systems - 10%' 
  }

const minNameLength = 3;
const minAddressLength = 5;
const cardNumberLength = 16;
const maxLength = 2;
const CVVLength = 3;

export { 
    promocodesDescription, 
    minNameLength, 
    minAddressLength, 
    cardNumberLength, 
    maxLength, 
    CVVLength 
};
