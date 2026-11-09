import { Injectable } from '@angular/core';
import { EnquiryFormData, EnquiryType, enquiryTypeOptions } from '../../core/models';

@Injectable({
  providedIn: 'root',
})
export class EnquiryDataService {
  private enquiries: (EnquiryFormData & { submittedAt?: string })[] = [];

  getEnquiryTypes() {
    return enquiryTypeOptions;
  }

  async submitEnquiry(data: EnquiryFormData): Promise<{ success: boolean; message: string }> {
    // In a real implementation, this would save to Supabase
    // For now, we'll store locally and return success
    this.enquiries.push({ ...data, submittedAt: new Date().toISOString() });
    console.log('Enquiry submitted:', data);
    return { success: true, message: 'Enquiry submitted successfully!' };
  }

  getEnquiries(): (EnquiryFormData & { submittedAt?: string })[] {
    return this.enquiries;
  }

  generateWhatsAppMessage(data: EnquiryFormData): string {
    const lines = [
      `*New Enquiry from AIFireSolutions Website*`,
      ``,
      `*Name:* ${data.fullName}`,
      `*Mobile:* ${data.mobileNumber}`,
      data.email ? `*Email:* ${data.email}` : '',
      data.company ? `*Company:* ${data.company}` : '',
      data.city ? `*City:* ${data.city}` : '',
      data.state ? `*State:* ${data.state}` : '',
      `*Enquiry Type:* ${this.getEnquiryTypeLabel(data.enquiryType)}`,
      data.productService ? `*Product/Service:* ${data.productService}` : '',
      data.quantity ? `*Quantity:* ${data.quantity}` : '',
      `*Message:* ${data.message}`,
    ].filter(Boolean);

    return lines.join('\n');
  }

  private getEnquiryTypeLabel(type: EnquiryType): string {
    const option = enquiryTypeOptions.find(o => o.value === type);
    return option?.label || type;
  }

  getWhatsAppUrl(message: string): string {
    return `https://wa.me/917571080375?text=${encodeURIComponent(message)}`;
  }
}