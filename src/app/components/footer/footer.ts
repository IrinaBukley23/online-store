import { WFMComponent } from '../../../routes';
import { ConfigPage } from '../../../types';
import './footer.scss';
import githubLogo from '../../../assets/images/github-logo.svg';
import RSLogo from '../../../assets/images/rs_school.svg';

class Footer extends WFMComponent {
    constructor(config: ConfigPage) {
        super(config);
    }
}

export const footer = new Footer({
    selector: 'app-footer',
    template: `
      <div class="footer__rs-logo">
        <img src="${RSLogo}" alt="rsschool-logo" width="130">
      </div>
      <div class="footer__year">2022</div>
      <div class="footer__links">
        <div class="footer__links-github">
          <img src="${githubLogo}" alt="github-logo" width="24">
          <a href="https://github.com/IrinaBukley23">Irina Bukley</a>
        </div>
        <div class="footer__links-github">
          <img src="${githubLogo}" alt="github-logo" width="24">
          <a href="https://github.com/dementeyolga">Olga Dementey</a>
        </div>
      </div>
    `,
});
