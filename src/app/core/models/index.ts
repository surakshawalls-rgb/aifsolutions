export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  imageUrl: string;
  category: string;
  features?: string[];
  specifications?: Record<string, string>;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface EnquiryFormData {
  fullName: string;
  mobileNumber: string;
  email?: string;
  company?: string;
  city?: string;
  state?: string;
  enquiryType: EnquiryType;
  productService?: string;
  quantity?: number;
  message: string;
}

export type EnquiryType =
  | 'product-enquiry'
  | 'installation'
  | 'refilling-servicing'
  | 'amc'
  | 'fire-safety-audit'
  | 'other';

export const enquiryTypeOptions: { value: EnquiryType; label: string }[] = [
  { value: 'product-enquiry', label: 'Product Enquiry' },
  { value: 'installation', label: 'Installation' },
  { value: 'refilling-servicing', label: 'Refilling & Servicing' },
  { value: 'amc', label: 'Annual Maintenance Contract' },
  { value: 'fire-safety-audit', label: 'Fire Safety Audit' },
  { value: 'other', label: 'Other' },
];

export interface Industry {
  id: string;
  name: string;
  icon?: string;
  imageUrl?: string;
}

export interface WhyChooseUs {
  id: string;
  title: string;
  description: string;
  icon?: string;
}