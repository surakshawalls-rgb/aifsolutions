import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnquiryDataService } from '../../data-access/enquiries/enquiry-data.service';
import { ProductDataService } from '../../data-access/products/product-data.service';
import { CompanyConfigService } from '../../core/services/company-config.service';
import { EnquiryFormData, EnquiryType, enquiryTypeOptions, Product } from '../../core/models';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './enquiry.html',
  styleUrls: ['./enquiry.css'],
})
export class EnquiryComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private enquiryData = inject(EnquiryDataService);
  private productData = inject(ProductDataService);
  private companyConfig = inject(CompanyConfigService);

  enquiryForm: FormGroup;
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal<string | null>(null);
  prefilledProduct = signal<Product | null>(null);

  enquiryTypes = enquiryTypeOptions;
  products = this.productData.getProducts();

  constructor() {
    this.enquiryForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email: ['', [Validators.email]],
      company: [''],
      city: [''],
      state: [''],
      enquiryType: ['product-enquiry', Validators.required],
      productService: [''],
      quantity: [null, [Validators.min(1)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {
    // Check for prefilled product from query params
    this.route.queryParams.subscribe(params => {
      if (params['product']) {
        const product = this.productData.getProductById(params['product']);
        if (product) {
          this.prefilledProduct.set(product);
          this.enquiryForm.patchValue({
            productService: product.name,
            enquiryType: 'product-enquiry',
          });
        }
      }
      if (params['type']) {
        this.enquiryForm.patchValue({ enquiryType: params['type'] });
      }
    });
  }

  get f() {
    return this.enquiryForm.controls;
  }

  onSubmit() {
    if (this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const formData: EnquiryFormData = this.enquiryForm.value;

    // Simulate API call
    setTimeout(async () => {
      try {
        const result = await this.enquiryData.submitEnquiry(formData);
        if (result.success) {
          this.submitSuccess.set(true);
          this.enquiryForm.reset({
            enquiryType: 'product-enquiry',
          });
          // Scroll to success message
          setTimeout(() => {
            const successEl = document.getElementById('submit-success');
            successEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        } else {
          this.submitError.set(result.message);
        }
      } catch {
        this.submitError.set('Failed to submit enquiry. Please try again or contact us via WhatsApp.');
      } finally {
        this.isSubmitting.set(false);
      }
    }, 1000);
  }

  onWhatsAppEnquiry() {
    if (this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();
      return;
    }

    const formData: EnquiryFormData = this.enquiryForm.value;
    const message = this.enquiryData.generateWhatsAppMessage(formData);
    const url = this.enquiryData.getWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  getCompanyName() {
    return this.companyConfig.getName();
  }

  getTagline() {
    return this.companyConfig.getTagline();
  }

  getPhones() {
    return this.companyConfig.getPhones();
  }

  getEmail() {
    return this.companyConfig.getEmail();
  }

  getAddress() {
    return this.companyConfig.getAddress();
  }

  getWhatsAppUrl() {
    return this.companyConfig.getWhatsAppUrl();
  }

  getPhoneUrl(phone: string) {
    return this.companyConfig.getPhoneUrl(phone);
  }

  getEmailUrl() {
    return this.companyConfig.getEmailUrl();
  }
}