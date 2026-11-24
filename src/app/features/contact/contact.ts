import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CompanyConfigService } from '../../core/services/company-config.service';
import { EnquiryDataService } from '../../data-access/enquiries/enquiry-data.service';

type FormTab = 'enquiry' | 'partner';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private enquiryData = inject(EnquiryDataService);
  protected companyConfig = inject(CompanyConfigService);

  activeTab = signal<FormTab>('enquiry');
  isSubmitting = signal(false);
  submitted = signal(false);
  submitError = signal<string | null>(null);

  partnerTypes = ['Dealer', 'Distributor', 'Installation Partner', 'Service Partner'];

  enquiryForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: [''],
    email: ['', [Validators.email]],
    address: [''],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  partnerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    company: [''],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    email: ['', [Validators.email]],
    city: [''],
    partnerType: ['', Validators.required],
    message: [''],
  });

  setTab(tab: FormTab) {
    this.activeTab.set(tab);
    this.submitted.set(false);
    this.submitError.set(null);
  }

  showError(form: 'enquiry' | 'partner', field: string): boolean {
    const group: FormGroup = form === 'enquiry' ? this.enquiryForm : this.partnerForm;
    const c = group.get(field);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  async submitEnquiry() {
    if (this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();
      return;
    }
    const v = this.enquiryForm.getRawValue();
    await this.send({
      fullName: `${v.firstName} ${v.lastName}`.trim(),
      mobileNumber: v.phone,
      email: v.email || undefined,
      enquiryType: 'product-enquiry',
      message: v.address ? `${v.message}\n\nAddress: ${v.address}` : v.message,
    });
    this.enquiryForm.reset();
  }

  async submitPartner() {
    if (this.partnerForm.invalid) {
      this.partnerForm.markAllAsTouched();
      return;
    }
    const v = this.partnerForm.getRawValue();
    await this.send({
      fullName: v.name,
      mobileNumber: v.phone,
      email: v.email || undefined,
      company: v.company || undefined,
      city: v.city || undefined,
      enquiryType: 'other',
      message: `Trade partner sign-up. Interested as: ${v.partnerType}.${v.message ? ' ' + v.message : ''}`,
    });
    this.partnerForm.reset({ partnerType: '' });
  }

  private async send(data: Parameters<EnquiryDataService['submitEnquiry']>[0]) {
    this.isSubmitting.set(true);
    this.submitError.set(null);
    try {
      const res = await this.enquiryData.submitEnquiry(data);
      this.submitted.set(res.success);
      if (!res.success) this.submitError.set(res.message);
    } catch {
      this.submitError.set('Something went wrong. Please try again or call us.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  mapsUrl(address: string): string {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address);
  }
}