import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule],     // ✅ REQUIRED
  templateUrl: './invoices.html',
  styleUrls: ['./invoices.css']
})
export class Invoices implements OnInit {

  invoices: any[] = [];

  ngOnInit() {
    const data = localStorage.getItem('invoices');
    if (data) {
      this.invoices = JSON.parse(data);
    }
  }
}