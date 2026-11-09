import { Injectable } from '@angular/core';

export interface Company {
  name: string;
  tagline: string;
  headOffice: string;
  branchOffice: string;
  phone: string;
  email: string;
  website: string;
  gstin: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private STORAGE_KEY = 'company';

  private defaultCompany: Company = {
    name: 'ALL INDIA FIRE SOLUTIONS',
    tagline: 'Your Safety, Our First Priority',
    headOffice: 'Suriyawan, Netanagar (Near Power House), Bhadohi-221404, U.P.',
    branchOffice: 'Shuklaha (Near Tahsil Chauraha), Mirzapur-231001, U.P.',
    phone: '7571080375',
    email: 'allindiafiresolutions@gmail.com',
    website: 'www.allindiafiresolutions@gmail.com',
    gstin: '09ITDPK5719N2ZY'
  };

  getCompany(): Company {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : this.defaultCompany;
  }

  saveCompany(company: Company): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(company));
  }

  resetCompany(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}