import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InvoiceService {

  getFinancialYear(date = new Date()): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return month >= 4
      ? `${year}-${(year + 1).toString().slice(2)}`
      : `${year - 1}-${year.toString().slice(2)}`;
  }

  getNextInvoiceNo(): string {
    const fy = this.getFinancialYear();
    const key = `invoice-counter-${fy}`;
    const last = Number(localStorage.getItem(key) || 0) + 1;
    localStorage.setItem(key, String(last));
    return `${String(last).padStart(3, '0')}/${fy}`;
  }
}