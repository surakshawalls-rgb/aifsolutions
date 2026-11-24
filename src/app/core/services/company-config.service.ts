import { Injectable } from '@angular/core';
import { companyConfig, CompanyConfig } from '../models/company.config';

@Injectable({
  providedIn: 'root',
})
export class CompanyConfigService {
  private config: CompanyConfig = companyConfig;

  getConfig(): CompanyConfig {
    return this.config;
  }

  getName(): string {
    return this.config.name;
  }

  getTagline(): string {
    return this.config.tagline;
  }

  getAddress(): string {
    return this.config.address;
  }

  getBranchAddress(): string {
    return this.config.branchAddress;
  }

  getEmail(): string {
    return this.config.email;
  }

  getPhones(): string[] {
    return this.config.phones;
  }

  getWhatsApp(): string {
    return this.config.whatsapp;
  }

  getYouTube(): string {
    return this.config.youtube;
  }

  getGSTIN(): string {
    return this.config.gstin;
  }

  getWebsite(): string {
    return this.config.website;
  }

  getEstablishedYear(): number {
    return this.config.established;
  }

  getWhatsAppUrl(message?: string): string {
    const baseUrl = `https://wa.me/${this.config.whatsapp}`;
    if (message) {
      return `${baseUrl}?text=${encodeURIComponent(message)}`;
    }
    return baseUrl;
  }

  getPhoneUrl(phone: string): string {
    return `tel:${phone.replace(/\s+/g, '')}`;
  }

  getEmailUrl(): string {
    return `mailto:${this.config.email}`;
  }
}