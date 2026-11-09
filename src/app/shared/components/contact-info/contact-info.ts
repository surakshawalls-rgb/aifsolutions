import { Component, inject } from '@angular/core';
import { CompanyConfigService } from '../../../core/services/company-config.service';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  templateUrl: './contact-info.html',
  styleUrls: ['./contact-info.css'],
})
export class ContactInfoComponent {
  protected companyConfig = inject(CompanyConfigService);

  getAddress() {
    return this.companyConfig.getAddress();
  }

  getEmail() {
    return this.companyConfig.getEmail();
  }

  getPhones() {
    return this.companyConfig.getPhones();
  }

  getWhatsAppUrl() {
    return this.companyConfig.getWhatsAppUrl();
  }

  getYouTube() {
    return this.companyConfig.getYouTube();
  }

  getPhoneUrl(phone: string) {
    return this.companyConfig.getPhoneUrl(phone);
  }

  getEmailUrl() {
    return this.companyConfig.getEmailUrl();
  }

  encodeURIComponent(value: string): string {
    return encodeURIComponent(value);
  }
}