import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EnquiryDataService } from '../../data-access/enquiries/enquiry-data.service';
import { ProductDataService } from '../../data-access/products/product-data.service';
import { CompanyConfigService } from '../../core/services/company-config.service';
import { EnquiryFormData, EnquiryType, enquiryTypeOptions, Product } from '../../core/models';

/** One extra question that is shown only for some enquiry types. */
interface ExtraField {
  key: string;
  label: string;
  type: 'select' | 'text' | 'number';
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

/** Everything that changes in the form when the enquiry type changes. */
interface TypeConfig {
  detailsTitle: string;        // heading of step 2
  detailsHint: string;         // small text under step 2 heading
  requirementTitle: string;    // heading of step 3
  locationLabel: string;       // label of the "city" field
  companyRequired: boolean;
  showProduct: boolean;
  productLabel: string;
  productPlaceholder: string;
  productRequired?: boolean;
  productCategories?: string[];   // limit the product list to these categories
  productExtraOption?: string;    // extra choice at the end of the list, e.g. "Not sure"
  showQuantity: boolean;
  quantityLabel: string;
  quantityRequired: boolean;
  fields: ExtraField[];
  messageLabel: string;
  messagePlaceholder: string;
  messageRequired: boolean;
}

const BUILDING_TYPES = [
  'Home / Apartment', 'Office', 'Factory / Industry', 'Hotel / Restaurant', 'Hospital',
  'School / College', 'Warehouse', 'Shop / Showroom', 'Other',
];

const TYPE_CONFIGS: Record<EnquiryType, TypeConfig> = {
  'product-enquiry': {
    detailsTitle: 'Your details',
    detailsHint: 'So we know who to send the price quote to.',
    requirementTitle: 'Product details',
    locationLabel: 'City',
    companyRequired: false,
    showProduct: true,
    productLabel: 'Product',
    productPlaceholder: 'Select a product (optional)',
    showQuantity: true,
    quantityLabel: 'Quantity',
    quantityRequired: false,
    fields: [],
    messageLabel: 'Message / requirements',
    messagePlaceholder: 'Tell us the capacity, specifications or any other details you need...',
    messageRequired: true,
  },
  'installation': {
    detailsTitle: 'Contact & site details',
    detailsHint: 'Tell us who we should contact and where the system will be installed.',
    requirementTitle: 'Installation details',
    locationLabel: 'Site city',
    companyRequired: false,
    showProduct: true,
    productLabel: 'System to install',
    productPlaceholder: 'Not sure yet - need guidance',
    productCategories: ['Fire Suppression Systems', 'Fire Detection & Alarm', 'Fire Suppression'],
    showQuantity: false,
    quantityLabel: '',
    quantityRequired: false,
    fields: [
      { key: 'buildingType', label: 'Type of building', type: 'select', options: BUILDING_TYPES, required: true },
      { key: 'area', label: 'Approx. built-up area (sq ft)', type: 'number', placeholder: 'e.g. 5000' },
      { key: 'timeline', label: 'When do you need it?', type: 'select', options: ['Immediately', 'Within 1 month', 'In 1-3 months', 'Just planning'] },
    ],
    messageLabel: 'Anything else we should know?',
    messagePlaceholder: 'Floors, existing systems, access to the site, special risks... (optional)',
    messageRequired: false,
  },
  'refilling-servicing': {
    detailsTitle: 'Contact & location',
    detailsHint: 'We will use this to arrange collection or a site visit.',
    requirementTitle: 'Servicing details',
    locationLabel: 'City',
    companyRequired: false,
    showProduct: true,
    productLabel: 'Type of extinguisher',
    productPlaceholder: 'Select extinguisher type',
    productRequired: true,
    productCategories: ['Fire Extinguishers'],
    productExtraOption: 'Not sure / mixed types',
    showQuantity: true,
    quantityLabel: 'Number of extinguishers',
    quantityRequired: true,
    fields: [
      { key: 'capacity', label: 'Capacity', type: 'select', options: ['1-2 kg', '4-6 kg', '9 kg', 'Mixed / not sure'] },
      { key: 'serviceMode', label: 'Service preference', type: 'select', options: ['Pick-up from my site', 'I will drop them off', 'Not sure'] },
    ],
    messageLabel: 'Anything else we should know?',
    messagePlaceholder: 'Expiry or last refill date, condition of cylinders... (optional)',
    messageRequired: false,
  },
  'amc': {
    detailsTitle: 'Organization details',
    detailsHint: 'Maintenance contracts are set up for a business or building.',
    requirementTitle: 'Maintenance contract details',
    locationLabel: 'City',
    companyRequired: true,
    showProduct: true,
    productLabel: 'Main product / system',
    productPlaceholder: 'Select (optional)',
    productCategories: ['Fire Extinguishers', 'Fire Suppression Systems', 'Fire Detection & Alarm'],
    showQuantity: true,
    quantityLabel: 'Approx. number of units / extinguishers',
    quantityRequired: false,
    fields: [
      { key: 'buildingType', label: 'Type of premises', type: 'select', options: BUILDING_TYPES, required: true },
      { key: 'coverage', label: 'Systems to cover', type: 'select', options: ['Fire extinguishers', 'Hydrant system', 'Sprinkler system', 'Fire alarm system', 'Complete fire safety system'], required: true },
      { key: 'duration', label: 'Contract duration', type: 'select', options: ['1 year', '2 years', '3 years'] },
    ],
    messageLabel: 'Anything else we should know?',
    messagePlaceholder: 'Current vendor, number of locations, special requirements... (optional)',
    messageRequired: false,
  },
  'fire-safety-audit': {
    detailsTitle: 'Organization details',
    detailsHint: 'Tell us whose premises should be audited.',
    requirementTitle: 'Audit details',
    locationLabel: 'City of premises',
    companyRequired: true,
    showProduct: false,
    productLabel: '',
    productPlaceholder: '',
    showQuantity: false,
    quantityLabel: '',
    quantityRequired: false,
    fields: [
      { key: 'buildingType', label: 'Type of premises', type: 'select', options: BUILDING_TYPES, required: true },
      { key: 'purpose', label: 'Purpose of audit', type: 'select', options: ['Routine safety check', 'Fire NOC / renewal', 'Insurance requirement', 'New building', 'After an incident'], required: true },
      { key: 'area', label: 'Approx. built-up area (sq ft)', type: 'number', placeholder: 'e.g. 20000' },
      { key: 'floors', label: 'Number of floors', type: 'number', placeholder: 'e.g. 4' },
    ],
    messageLabel: 'Anything else we should know?',
    messagePlaceholder: 'Existing fire safety systems, known concerns... (optional)',
    messageRequired: false,
  },
  'other': {
    detailsTitle: 'Your details',
    detailsHint: 'So we know how to reach you.',
    requirementTitle: 'Your message',
    locationLabel: 'City',
    companyRequired: false,
    showProduct: false,
    productLabel: '',
    productPlaceholder: '',
    showQuantity: false,
    quantityLabel: '',
    quantityRequired: false,
    fields: [
      { key: 'subject', label: 'Subject', type: 'text', placeholder: 'What is this about?', required: true },
    ],
    messageLabel: 'How can we help?',
    messagePlaceholder: 'Describe your question or requirement...',
    messageRequired: true,
  },
};

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
  private enquiryData = inject(EnquiryDataService);
  private productData = inject(ProductDataService);
  private companyConfig = inject(CompanyConfigService);

  enquiryForm: FormGroup;
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal<string | null>(null);
  prefilledProduct = signal<Product | null>(null);

  enquiryTypes = enquiryTypeOptions;

  // Short helper text shown under each enquiry-type tile
  typeHints: Record<string, string> = {
    'product-enquiry': 'Prices and availability',
    'installation': 'New system set-up',
    'refilling-servicing': 'Refill, test & service',
    'amc': 'Yearly maintenance plans',
    'fire-safety-audit': 'Risk & compliance review',
    'other': 'Anything else',
  };

  products = this.productData.getProducts();

  // The selected type decides which fields the form shows
  currentType = signal<EnquiryType>('product-enquiry');
  cfg = computed<TypeConfig>(() => TYPE_CONFIGS[this.currentType()] ?? TYPE_CONFIGS['other']);

  // Product list shown in step 3: filtered by enquiry type and grouped by category
  productGroups = computed(() => {
    const cats = this.cfg().productCategories;
    const list = cats ? this.products.filter(p => cats.includes(p.category)) : this.products;
    const groups = new Map<string, Product[]>();
    list.forEach(p => groups.set(p.category, [...(groups.get(p.category) ?? []), p]));
    return [...groups].map(([category, items]) => ({ category, items }));
  });

  // The product currently selected (used for the preview card)
  private selectedProductName = signal('');
  selectedProduct = computed(() => this.products.find(p => p.name === this.selectedProductName()) ?? null);

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
      extra: this.fb.group({}),   // type-specific questions are added here
    });

    this.applyType('product-enquiry');

    // Keep the product preview card in sync with the dropdown
    this.enquiryForm.get('productService')!.valueChanges.subscribe((name: string | null) => {
      this.selectedProductName.set(name ?? '');
    });

    // Re-shape the form every time the person picks a different enquiry type
    this.enquiryForm.get('enquiryType')!.valueChanges.subscribe((type: EnquiryType) => {
      this.applyType(type);
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
      if (params['type'] && TYPE_CONFIGS[params['type'] as EnquiryType]) {
        this.enquiryForm.patchValue({ enquiryType: params['type'] });
      }
    });
  }

  get f() {
    return this.enquiryForm.controls;
  }

  private get extraGroup(): FormGroup {
    return this.enquiryForm.get('extra') as FormGroup;
  }

  /** Is the type-specific field with this key invalid and touched? */
  extraInvalid(key: string): boolean {
    const c = this.extraGroup.get(key);
    return !!c && c.invalid && c.touched;
  }

  /** Rebuild validators and extra controls for the chosen enquiry type. */
  private applyType(type: EnquiryType) {
    const cfg = TYPE_CONFIGS[type] ?? TYPE_CONFIGS['other'];
    this.currentType.set(TYPE_CONFIGS[type] ? type : 'other');

    // 1. extra (type-specific) controls
    const extra = this.extraGroup;
    Object.keys(extra.controls).forEach(key => extra.removeControl(key));
    cfg.fields.forEach(field =>
      extra.addControl(field.key, new FormControl('', field.required ? [Validators.required] : [])),
    );

    // 2. shared controls: validators depend on the type
    const c = this.enquiryForm.controls;
    c['company'].setValidators(cfg.companyRequired ? [Validators.required] : []);
    c['quantity'].setValidators(
      cfg.quantityRequired ? [Validators.required, Validators.min(1)] : [Validators.min(1)],
    );
    c['productService'].setValidators(cfg.productRequired ? [Validators.required] : []);
    c['message'].setValidators(
      cfg.messageRequired ? [Validators.required, Validators.minLength(10)] : [Validators.minLength(10)],
    );

    // 3. clear values of fields that are hidden for this type
    // keep the selected product only if it is still offered for this type
    const current: string = c['productService'].value ?? '';
    const product = this.products.find(p => p.name === current);
    const productAllowed =
      cfg.showProduct &&
      (!current ||
        current === cfg.productExtraOption ||
        (!!product && (!cfg.productCategories || cfg.productCategories.includes(product.category))));
    if (!productAllowed) {
      c['productService'].setValue('', { emitEvent: false });
      this.selectedProductName.set('');
    }
    if (!cfg.showQuantity) c['quantity'].setValue(null, { emitEvent: false });

    ['company', 'quantity', 'productService', 'message'].forEach(name => c[name].updateValueAndValidity({ emitEvent: false }));
  }

  /** Turns the form into the data we send. Type-specific answers are added to the message. */
  private buildPayload(): EnquiryFormData {
    const { extra, ...rest } = this.enquiryForm.value;
    const cfg = this.cfg();
    const lines = cfg.fields
      .map(field => (extra?.[field.key] ? `${field.label}: ${extra[field.key]}` : ''))
      .filter(Boolean);
    const typed = (rest.message ?? '').trim();
    const parts = [typed, lines.length ? `${cfg.requirementTitle}:\n${lines.join('\n')}` : ''].filter(Boolean);
    return { ...rest, message: parts.join('\n\n') || cfg.requirementTitle } as EnquiryFormData;
  }

  onSubmit() {
    if (this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const formData = this.buildPayload();

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

    const message = this.enquiryData.generateWhatsAppMessage(this.buildPayload());
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