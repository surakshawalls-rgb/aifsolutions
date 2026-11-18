import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductDataService } from '../../data-access/products/product-data.service';
import { CompanyConfigService } from '../../core/services/company-config.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section';
import { ContactInfoComponent } from '../../shared/components/contact-info/contact-info';
import { Product } from '../../core/models';

interface SolutionTile {
  name: string;
  image?: string;
  link: string;
  query?: Record<string, string>;
}

interface Pillar {
  title: string;
  text: string;
}

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, CtaSectionComponent, ContactInfoComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  private productData = inject(ProductDataService);
  protected companyConfig = inject(CompanyConfigService);

  featuredProducts: Product[] = [];
  productCount = 0;

  // Quick-jump chips shown right under the hero (like "Application Areas")
  applicationAreas = [
    'Homes', 'Offices', 'Factories', 'Hotels & Restaurants', 'Hospitals',
    'Warehouses', 'Schools', 'Commercial Buildings',
  ];

  // "Our Hallmark" - four pillars
  pillars: Pillar[] = [
    {
      title: 'Complete Fire Safety Portfolio',
      text: 'Extinguishers, suppression products, hydrants, sprinklers, alarms and accessories, all under one roof.',
    },
    {
      title: 'Quality You Can Trust',
      text: 'ISI marked, BIS certified products from trusted manufacturers, built to perform when it matters.',
    },
    {
      title: 'End-to-End Solutions',
      text: 'Supply, installation, testing, refilling and maintenance. You never need to look elsewhere.',
    },
    {
      title: 'Prompt Support',
      text: 'Quick response times and emergency support for your critical fire safety needs.',
    },
  ];

  // "Our Full Spectrum Fire Solutions" - tiles
  solutions: SolutionTile[] = [
    { name: 'Fire Extinguishers', image: 'assets/images/products/abc-extinguisher.svg', link: '/collections-products' },
    { name: 'Fire Suppression', image: 'assets/images/products/fire-stop.svg', link: '/collections-products' },
    { name: 'Fire Balls', image: 'assets/images/products/fire-ball.svg', link: '/collections-products' },
    { name: 'Hydrant Systems', image: 'assets/images/products/fire-hydrant.svg', link: '/collections-products' },
    { name: 'Sprinkler Systems', image: 'assets/images/products/fire-sprinkler.svg', link: '/collections-products' },
    { name: 'Alarm Solutions', image: 'assets/images/products/fire-alarm.svg', link: '/collections-products' },
    { name: 'Safety Equipment', image: 'assets/images/products/fire-bucket.svg', link: '/collections-products' },
    { name: 'Services & AMC', link: '/enquiry', query: { type: 'amc' } },
  ];

  // "Solutions for a wide variety of applications"
  applications = [
    { name: 'Homes', text: 'Compact, easy-to-use protection for families.' },
    { name: 'Offices', text: 'Keep people, records and equipment safe.' },
    { name: 'Factories', text: 'Heavy-duty systems for industrial risk.' },
    { name: 'Hotels & Restaurants', text: 'Kitchen and guest-area fire protection.' },
    { name: 'Hospitals', text: 'Reliable systems where lives depend on it.' },
    { name: 'Warehouses', text: 'Protect stock and large open spaces.' },
  ];

  stats: Stat[] = [];

  ngOnInit() {
    const all = this.productData.getProducts();
    this.productCount = all.length;
    this.featuredProducts = all.slice(0, 3);
    this.stats = [
      { value: String(this.companyConfig.getEstablishedYear()), label: 'Serving customers since' },
      { value: `${all.length}+`, label: 'Fire safety products' },
      { value: '8', label: 'Professional services' },
      { value: '24/7', label: 'Emergency support' },
    ];
  }

  getPhones() {
    return this.companyConfig.getPhones();
  }

  getPhoneUrl(phone: string) {
    return this.companyConfig.getPhoneUrl(phone);
  }
}