export interface CompanyConfig {
  name: string;
  tagline: string;
  established: number;
  address: string;
  branchAddress: string;
  email: string;
  phones: string[];
  whatsapp: string;
  youtube: string;
  gstin: string;
  website: string;
}

export const companyConfig: CompanyConfig = {
  name: 'All India Fire Solutions',
  tagline: 'Your Safety, Our First Priority.',
  established: 2021,
  address: 'Suriyawan, Netanagar, Near Power House, Bhadohi-221404, Uttar Pradesh, India.',
  branchAddress: 'Shuklaha, Near Tahsil Chauraha, Mirzapur-231001, Uttar Pradesh, India.',
  email: 'allindiafiresolutions@gmail.com',
  phones: ['+91 9580325152', '+91 7571080375'],
  whatsapp: '917571080375',
  youtube: 'https://youtube.com/@allindiafiresolutions',
  gstin: '',
  website: 'https://allindiafiresolutions.com',
};