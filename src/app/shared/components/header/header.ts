import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CompanyConfigService } from '../../../core/services/company-config.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  private companyConfig = inject(CompanyConfigService);

  isMenuOpen = signal(false);
  isScrolled = signal(false);

  navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/about-us', label: 'About Us' },
    { path: '/collections-products', label: 'Products' },
    { path: '/enquiry', label: 'Enquiry' },
    { path: '/contact-us', label: 'Contact Us' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  getCompanyName() {
    return this.companyConfig.getName();
  }

  getTagline() {
    return this.companyConfig.getTagline();
  }

  getPhone() {
    return this.companyConfig.getPhones()[0];
  }

  getPhoneUrl() {
    return this.companyConfig.getPhoneUrl(this.getPhone());
  }

  getWhatsAppUrl() {
    return this.companyConfig.getWhatsAppUrl();
  }
}