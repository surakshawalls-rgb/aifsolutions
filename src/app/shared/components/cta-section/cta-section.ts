import { Component, input, inject } from '@angular/core';
import { CompanyConfigService } from '../../../core/services/company-config.service';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  templateUrl: './cta-section.html',
  styleUrls: ['./cta-section.css'],
})
export class CtaSectionComponent {
  private companyConfig = inject(CompanyConfigService);

  title = input('Your Safety, Our Commitment');
  subtitle = input('Protect your people, property and business with reliable fire safety solutions.');
  primaryButtonText = input('Request a Quote');
  primaryButtonLink = input('/enquiry');
  secondaryButtonText = input('Contact Us');
  secondaryButtonLink = input('/contact-us');
  showWhatsApp = input(true);
  whatsappText = input('WhatsApp Us');
  variant = input<'primary' | 'secondary' | 'outline'>('primary');

  getWhatsAppUrl() {
    return this.companyConfig.getWhatsAppUrl();
  }
}