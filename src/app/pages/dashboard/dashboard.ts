import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ ADD RouterModule
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  company?: {
    name: string;
    tagline: string;
    headOffice: string;
    phone: string;
    email: string;
    gstin?: string;
  };

  ngOnInit() {
    const data = localStorage.getItem('company');
    if (data) {
      this.company = JSON.parse(data);
    }
  }
}