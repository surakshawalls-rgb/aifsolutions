import { Component, inject } from '@angular/core';
import { ProductDataService } from '../../data-access/products/product-data.service';
import { CompanyConfigService } from '../../core/services/company-config.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section';
import { ContactInfoComponent } from '../../shared/components/contact-info/contact-info';
import { Product } from '../../core/models';

@Component({
  selector: 'app-home-temp',
  standalone: true,
  imports: [ProductCardComponent, CtaSectionComponent, ContactInfoComponent],
  templateUrl: './home-temp.html',
  styleUrls: ['./home-temp.css'],
})
export class HomeTempComponent {
  private productData = inject(ProductDataService);
  protected companyConfig = inject(CompanyConfigService);

  products: Product[] = this.productData.getProducts();
  featuredProducts: Product[] = this.products.slice(0, 4);

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

  getWhatsAppUrl() {
    return this.companyConfig.getWhatsAppUrl();
  }

  getPhoneUrl(phone: string) {
    return this.companyConfig.getPhoneUrl(phone);
  }
}