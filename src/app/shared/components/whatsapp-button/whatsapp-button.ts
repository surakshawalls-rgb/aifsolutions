import { Component, inject } from '@angular/core';
import { CompanyConfigService } from '../../../core/services/company-config.service';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  templateUrl: './whatsapp-button.html',
  styleUrls: ['./whatsapp-button.css'],
})
export class WhatsAppButtonComponent {
  private companyConfig = inject(CompanyConfigService);

  getWhatsAppUrl() {
    return this.companyConfig.getWhatsAppUrl();
  }
}