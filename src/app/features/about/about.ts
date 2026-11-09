import { Component, inject } from '@angular/core';
import { CompanyConfigService } from '../../core/services/company-config.service';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section';
import { ContactInfoComponent } from '../../shared/components/contact-info/contact-info';
import { Service } from '../../core/models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ServiceCardComponent, CtaSectionComponent, ContactInfoComponent],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class AboutComponent {
  protected companyConfig = inject(CompanyConfigService);

  services: Service[] = [
    { id: 'extinguishers', name: 'Fire Extinguishers', description: 'CO2, ABC, Foam, Water, Clean Agent and more. All ISI marked and BIS certified.' },
    { id: 'refilling', name: 'Fire Extinguisher Refilling & Servicing', description: 'Professional refilling, pressure testing, and servicing as per IS 2190 standards.' },
    { id: 'hydrant', name: 'Fire Hydrant & Sprinkler Systems', description: 'Complete design, supply, installation, and commissioning of hydrant and sprinkler systems.' },
    { id: 'alarm', name: 'Fire Alarm Systems & Panels', description: 'Addressable and conventional fire alarm systems with detectors, panels, and notification devices.' },
    { id: 'detectors', name: 'Smoke Detectors & Manual Call Points (MCP)', description: 'Optical smoke detectors, heat detectors, multi-sensor detectors, and manual call points.' },
    { id: 'suppression', name: 'Specialized Fire Suppression Systems', description: 'Water Mist, Foam, Chemical, and Kitchen Fire Suppression systems for special hazards.' },
    { id: 'pump-sets', name: 'Fire Pump Sets, Installation & Maintenance', description: 'Electric and diesel fire pump sets with jockey pumps for pressure maintenance.' },
    { id: 'water-tanks', name: 'Fire Water Storage Tanks & Pump Testing', description: 'Design and installation of fire water storage tanks with regular pump testing.' },
    { id: 'amc', name: 'Annual Maintenance Contracts (AMC)', description: 'Comprehensive AMC for extinguishers, hydrant systems, sprinkler systems, and alarm systems.' },
    { id: 'exit-lighting', name: 'Emergency Exit Lighting & Fire Safety Signage', description: 'Installation of photoluminescent signs, emergency lights, and evacuation route markers.' },
    { id: 'training', name: 'Training & Awareness', description: 'Basic Fire Fighting, Extinguisher Handling, Fire Evacuation Drills, Mock Fire Drills and Safety Programs.' },
    { id: 'audits', name: 'Fire Safety Audits, Risk Assessment & Consultancy', description: 'Comprehensive audits, risk assessments, and consultancy for NBC and local compliance.' },
    { id: 'design', name: 'Fire Protection System Design & Building NOC Approval', description: 'Complete system design and assistance with building NOC approval from fire department.' },
  ];

  getCompanyName() {
    return this.companyConfig.getName();
  }

  getTagline() {
    return this.companyConfig.getTagline();
  }

  getEstablishedYear() {
    return this.companyConfig.getEstablishedYear();
  }
}