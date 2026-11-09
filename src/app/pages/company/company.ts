import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService, Company } from '../../services/company.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company.html',
  styleUrls: ['./company.css']
})
export class CompanyComponent implements OnInit {

  companyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    const company: Company = this.companyService.getCompany();

    this.companyForm = this.fb.group({
      name: [{ value: company.name, disabled: true }],      // 🔒 locked
      tagline: [{ value: company.tagline, disabled: true }],// 🔒 locked
      gstin: [{ value: company.gstin, disabled: true }],    // 🔒 locked

      headOffice: [company.headOffice],
      branchOffice: [company.branchOffice],
      phone: [company.phone],
      email: [company.email],
      website: [company.website]
    });
  }

  save(): void {
    const updatedCompany: Company = {
      ...this.companyService.getCompany(),
      ...this.companyForm.getRawValue() // includes disabled fields
    };

    this.companyService.saveCompany(updatedCompany);
    alert('Company details saved successfully');
  }
}