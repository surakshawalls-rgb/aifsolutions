import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CompanyConfigService } from '../../../core/services/company-config.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class FooterComponent {
  private companyConfig = inject(CompanyConfigService);

  currentYear = new Date().getFullYear();

  footerLinks = [
    { path: '/home', label: 'Home' },
    { path: '/about-us', label: 'About Us' },
    { path: '/contact-us', label: 'Contact Us' },
    { path: '/collections-products', label: 'Products' },
    { path: '/enquiry', label: 'Enquiry' },
    { path: '/privacy-policy', label: 'Privacy Policy' },
    { path: '/terms-conditions', label: 'Terms & Conditions' },
  ];

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

  getYouTubeUrl() {
      return this.companyConfig.getYouTube();
  }

  getPhoneUrl(phone: string) {
    return this.companyConfig.getPhoneUrl(phone);
  }

  getEmailUrl() {
    return this.companyConfig.getEmailUrl();
  }
}