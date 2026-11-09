import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductDataService } from '../../data-access/products/product-data.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section';
import { Product } from '../../core/models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, ProductCardComponent, CtaSectionComponent],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductsComponent {
  private productData = inject(ProductDataService);

  searchTerm = signal('');
  selectedCategory = signal('');

  allProducts = this.productData.getProducts();
  categories = this.productData.getCategories();

  filteredProducts = computed(() => {
    let products = this.allProducts;
    const search = this.searchTerm().toLowerCase().trim();
    const category = this.selectedCategory();

    if (search) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.shortDescription.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
      );
    }

    if (category) {
      products = products.filter(p => p.category === category);
    }

    return products;
  });

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory.set(target.value);
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedCategory.set('');
  }
}