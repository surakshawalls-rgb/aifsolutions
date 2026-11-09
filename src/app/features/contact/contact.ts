import { Component, inject } from '@angular/core';
import { CompanyConfigService } from '../../core/services/company-config.service';
import { ContactInfoComponent } from '../../shared/components/contact-info/contact-info';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactInfoComponent, CtaSectionComponent],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class ContactComponent {
  protected companyConfig = inject(CompanyConfigService);

  getCompanyName() {
    return this.companyConfig.getName();
  }

  getTagline() {
    return this.companyConfig.getTagline();
  }

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

    getWhatsAppUrlWithMessage(message: string): string {
      return this.companyConfig.getWhatsAppUrl(message);
    }
  }