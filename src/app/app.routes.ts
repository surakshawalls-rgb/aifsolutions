import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout';
import { HomeComponent } from './features/home/home';
import { HomeTempComponent } from './features/home-temp/home-temp';
import { AboutComponent } from './features/about/about';
import { ContactComponent } from './features/contact/contact';
import { ProductsComponent } from './features/products/products';
import { EnquiryComponent } from './features/enquiry/enquiry';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'home-temp', component: HomeTempComponent },
      { path: 'about-us', component: AboutComponent },
      { path: 'contact-us', component: ContactComponent },
      { path: 'collections-products', component: ProductsComponent },
      { path: 'enquiry', component: EnquiryComponent },
    ]
  },
  // Legacy routes - redirect to new routes
  { path: 'dashboard', redirectTo: 'home' },
  { path: 'company', redirectTo: 'about-us' },
  { path: 'invoice', redirectTo: 'enquiry' },
  { path: 'invoices', redirectTo: 'collections-products' },
];