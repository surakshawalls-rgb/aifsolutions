import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice';

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-invoice.html'
})
export class CreateInvoice {

  invoiceNo = '';
  gstType: 'IGST' | 'CGST' = 'IGST';
  otherCharges = 0;

  items = [
    { name: '', hsn: '', qty: 1, rate: 0 }
  ];

  constructor(private invoiceService: InvoiceService) {
    this.invoiceNo = this.invoiceService.getNextInvoiceNo();
  }

  addItem() {
    this.items.push({
      name: '',
      hsn: '',
      qty: 1,
      rate: 0
    });
  }

  get subTotal(): number {
    return this.items.reduce(
      (total, item) => total + (item.qty * item.rate),
      0
    );
  }

  get gstAmount(): number {
    return this.subTotal * 0.18;
  }

  get grandTotal(): number {
    return this.subTotal + this.gstAmount + Number(this.otherCharges);
  }
}