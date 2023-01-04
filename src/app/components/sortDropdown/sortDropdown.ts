import { ComponentConfig } from '../../../types';
import { WFMComponent } from '../../../routes';

class SortDropdown extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const sortDropdown = new SortDropdown({
    selector: 'sort-dropdown',
    innerComponents: null,
    getTemplate: (options) => `
                <div class="dropdown">
                  <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown button
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div>
    `});
