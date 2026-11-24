import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductDataService } from '../../data-access/products/product-data.service';
import { CompanyConfigService } from '../../core/services/company-config.service';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section';
import { Product } from '../../core/models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, RouterLink, CtaSectionComponent],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductsComponent {
  private productData = inject(ProductDataService);
  protected companyConfig = inject(CompanyConfigService);

  /**
   * Product images are left blank for now.
   * When your photos are ready, set this to true and each card will
   * show product.imageUrl (set in product-data.service.ts) instead of the blank space.
   */
  showImages = false;

  searchTerm = signal('');
  selectedCategory = signal('');

  allProducts = this.productData.getProducts();
  categories = this.productData.getCategories();

  // How many products each category has (for the sidebar)
  categoryCounts = this.categories.map(name => ({
    name,
    count: this.allProducts.filter(p => p.category === name).length,
  }));

  // Products matching the search box and selected category
  filteredProducts = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const category = this.selectedCategory();
    return this.allProducts.filter(p => {
      const matchesCategory = !category || p.category === category;
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search) ||
        p.shortDescription.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  });

  // The same products grouped under their category heading
  sections = computed(() => {
    const groups = new Map<string, Product[]>();
    this.filteredProducts().forEach(p => groups.set(p.category, [...(groups.get(p.category) ?? []), p]));
    return [...groups].map(([category, items]) => ({ category, items }));
  });

  onSearchChange(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedCategory.set('');
  }

  /** First few specifications, shown as short "Label: value" lines on each card. */
  specLines(product: Product, max = 3) {
    return Object.entries(product.specifications ?? {})
      .slice(0, max)
      .map(([label, value]) => ({ label, value }));
  }

  whatsAppUrl(product: Product) {
    return this.companyConfig.getWhatsAppUrl(`Hello! I would like a quote for: ${product.name}`);
  }

  getPhones() {
    return this.companyConfig.getPhones();
  }

  getPhoneUrl(phone: string) {
    return this.companyConfig.getPhoneUrl(phone);
  }
}