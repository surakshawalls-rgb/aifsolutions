import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProductDataService } from '../../data-access/products/product-data.service';
import { CompanyConfigService } from '../../core/services/company-config.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section';
import { ContactInfoComponent } from '../../shared/components/contact-info/contact-info';
import { Product, Service, Industry, WhyChooseUs } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, ServiceCardComponent, CtaSectionComponent, ContactInfoComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  private productData = inject(ProductDataService);
  protected companyConfig = inject(CompanyConfigService);
  private platformId = inject(PLATFORM_ID);

  products: Product[] = [];
  featuredProducts: Product[] = [];

  services: Service[] = [
    { id: 'extinguisher-supply', name: 'Fire Extinguisher Supply', description: 'Supply of all types of fire extinguishers including ABC, CO2, Foam, Water, and Clean Agent extinguishers.' },
    { id: 'extinguisher-refilling', name: 'Fire Extinguisher Refilling & Servicing', description: 'Professional refilling, pressure testing, and servicing of all types of fire extinguishers as per IS 2190 standards.' },
    { id: 'hydrant-installation', name: 'Fire Hydrant System Installation', description: 'Complete design, supply, installation, and commissioning of internal and external fire hydrant systems.' },
    { id: 'sprinkler-installation', name: 'Fire Sprinkler System Installation', description: 'Wet, dry, pre-action, and deluge sprinkler systems designed and installed as per NFPA 13 standards.' },
    { id: 'alarm-installation', name: 'Fire Alarm Installation', description: 'Addressable and conventional fire alarm systems with detectors, panels, and notification devices.' },
    { id: 'safety-audits', name: 'Fire Safety Audits', description: 'Comprehensive fire safety audits, risk assessments, and consultancy for compliance with NBC and local regulations.' },
    { id: 'amc', name: 'Annual Maintenance Contracts', description: 'AMC for fire extinguishers, hydrant systems, sprinkler systems, and fire alarm systems.' },
    { id: 'training', name: 'Fire Safety Training', description: 'Basic fire fighting, extinguisher handling, fire evacuation drills, mock fire drills, and safety programs.' },
  ];

  industries: Industry[] = [
    { id: 'residential', name: 'Residential Buildings', icon: 'home' },
    { id: 'offices', name: 'Offices', icon: 'building' },
    { id: 'factories', name: 'Factories & Industries', icon: 'factory' },
    { id: 'hotels', name: 'Hotels & Restaurants', icon: 'hotel' },
    { id: 'hospitals', name: 'Hospitals', icon: 'hospital' },
    { id: 'commercial', name: 'Commercial Buildings', icon: 'building-2' },
    { id: 'education', name: 'Educational Institutions', icon: 'school' },
    { id: 'warehouses', name: 'Warehouses', icon: 'warehouse' },
  ];

  whyChooseUs: WhyChooseUs[] = [
    { id: 'experienced', title: 'Experienced and Certified Professionals', description: 'Our team comprises certified fire safety experts with years of hands-on experience in the industry.' },
    { id: 'iso', title: 'ISO 9001:2015 Certified Company', description: 'We maintain the highest quality standards in all our products and services.' },
    { id: 'comprehensive', title: 'Comprehensive Fire Safety Solutions', description: 'From supply to installation, testing, and maintenance - we provide end-to-end fire protection.' },
    { id: 'prompt', title: 'Prompt Service and Emergency Support', description: 'Quick response times and 24/7 emergency support for critical fire safety needs.' },
    { id: 'quality', title: 'Commitment to Quality and Reliability', description: 'All products are ISI marked, BIS certified, and sourced from trusted manufacturers.' },
    { id: 'satisfaction', title: 'Customer Satisfaction', description: 'Our growing client base across industries is a testament to our service excellence.' },
  ];

  ngOnInit() {
    this.products = this.productData.getProducts();
    this.featuredProducts = this.products.slice(0, 6);
  }

  getCompanyName() {
    return this.companyConfig.getName();
  }

  getTagline() {
    return this.companyConfig.getTagline();
  }

  getEstablishedYear() {
    return this.companyConfig.getEstablishedYear();
  }

    getPhones() {
      return this.companyConfig.getPhones();
    }

    getPhoneUrl(phone: string) {
      return this.companyConfig.getPhoneUrl(phone);
    }

    scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}