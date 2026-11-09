import { Injectable } from '@angular/core';
import { Product } from '../../core/models';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  private products: Product[] = [
    {
      id: 'abc-extinguisher',
      name: 'ABC Type Fire Extinguisher',
      shortDescription: 'Multi-purpose dry powder extinguisher suitable for Class A, B, and C fires. Ideal for homes, offices, and vehicles.',
      longDescription: 'The ABC Type Fire Extinguisher uses monoammonium phosphate dry chemical powder that effectively extinguishes Class A (ordinary combustibles), Class B (flammable liquids), and Class C (electrical equipment) fires. It is the most versatile extinguisher for general fire protection.',
          imageUrl: 'assets/images/products/abc-extinguisher.svg',
      category: 'Fire Extinguishers',
      features: [
        'Effective on Class A, B, and C fires',
        'Non-conductive - safe on electrical equipment',
        'Available in 1kg, 2kg, 4kg, 6kg, 9kg capacities',
        'ISI marked and BIS certified',
        '5-year warranty on cylinder',
      ],
      specifications: {
        'Agent': 'Monoammonium Phosphate (ABC Powder)',
        'Operating Temperature': '-30°C to +60°C',
        'Working Pressure': '15 bar',
        'Test Pressure': '35 bar',
        'Discharge Time': '8-20 seconds (depending on size)',
        'Range': '3-6 meters',
      },
    },
    {
      id: 'co2-extinguisher',
      name: 'CO2 Type Fire Extinguisher',
      shortDescription: 'Carbon dioxide extinguisher for Class B and electrical fires. Leaves no residue, ideal for server rooms and electrical panels.',
      longDescription: 'The CO2 Type Fire Extinguisher uses carbon dioxide gas to displace oxygen and cool the fire. It leaves no residue, making it perfect for sensitive electronic equipment, server rooms, laboratories, and electrical panels.',
          imageUrl: 'assets/images/products/co2-extinguisher.svg',
      category: 'Fire Extinguishers',
      features: [
        'Effective on Class B and electrical fires',
        'Leaves no residue',
        'Non-conductive and non-corrosive',
        'Available in 2kg, 3kg, 4.5kg, 6.5kg capacities',
        'ISI marked and BIS certified',
      ],
      specifications: {
        'Agent': 'Carbon Dioxide (CO2)',
        'Operating Temperature': '-20°C to +60°C',
        'Working Pressure': '56 bar',
        'Test Pressure': '250 bar',
        'Discharge Time': '8-30 seconds (depending on size)',
        'Range': '2-3 meters',
      },
    },
    {
      id: 'foam-extinguisher',
      name: 'Foam Type Fire Extinguisher',
      shortDescription: 'Aqueous film forming foam (AFFF) extinguisher for Class A and B fires. Forms a blanket over flammable liquids.',
      longDescription: 'The Foam Type Fire Extinguisher uses AFFF (Aqueous Film Forming Foam) that creates a blanket over flammable liquid fires, preventing re-ignition. Effective on Class A (solid materials) and Class B (flammable liquids) fires.',
          imageUrl: 'assets/images/products/foam-extinguisher.svg',
      category: 'Fire Extinguishers',
      features: [
        'Effective on Class A and B fires',
        'Forms sealing film over flammable liquids',
        'Prevents re-ignition',
        'Available in 2L, 3L, 6L, 9L capacities',
        'ISI marked and BIS certified',
      ],
      specifications: {
        'Agent': 'AFFF Foam Concentrate (3% or 6%)',
        'Operating Temperature': '+5°C to +60°C',
        'Working Pressure': '15 bar',
        'Test Pressure': '35 bar',
        'Discharge Time': '15-40 seconds (depending on size)',
        'Range': '4-8 meters',
      },
    },
    {
      id: 'water-extinguisher',
      name: 'Water Type Fire Extinguisher',
      shortDescription: 'Water-based extinguisher for Class A fires only. Environmentally friendly and cost-effective for ordinary combustible materials.',
      longDescription: 'The Water Type Fire Extinguisher uses water as the extinguishing agent, making it environmentally friendly and suitable for Class A fires involving wood, paper, textiles, and other ordinary combustible materials.',
          imageUrl: 'assets/images/products/water-extinguisher.svg',
      category: 'Fire Extinguishers',
      features: [
        'Effective on Class A fires only',
        'Environmentally friendly',
        'No chemical residue',
        'Available in 3L, 6L, 9L capacities',
        'ISI marked and BIS certified',
      ],
      specifications: {
        'Agent': 'Water with additives',
        'Operating Temperature': '+5°C to +60°C',
        'Working Pressure': '15 bar',
        'Test Pressure': '35 bar',
        'Discharge Time': '30-60 seconds (depending on size)',
        'Range': '6-10 meters',
      },
    },
    {
      id: 'fire-stop',
      name: 'Fire Stop',
      shortDescription: 'Automatic fire suppression device that activates at high temperatures. Compact and maintenance-free for small enclosed spaces.',
      longDescription: 'Fire Stop is an automatic fire suppression device designed for small enclosed spaces like electrical panels, server cabinets, and engine compartments. It activates automatically when temperature reaches a preset threshold.',
          imageUrl: 'assets/images/products/fire-stop.svg',
      category: 'Fire Suppression',
      features: [
        'Automatic activation at 68°C/79°C/93°C',
        'No power supply required',
        'Maintenance-free for 5 years',
        'Compact design for tight spaces',
        'Environmentally friendly agent',
      ],
      specifications: {
        'Activation Temperature': '68°C / 79°C / 93°C options',
        'Agent': 'HFC-227ea / FK-5-1-12',
        'Coverage Volume': 'Up to 0.5 m³ per unit',
        'Operating Life': '5 years',
        'Mounting': 'Bracket or adhesive',
      },
    },
    {
      id: 'fire-ball',
      name: 'Fire Ball',
      shortDescription: 'Self-activating fire extinguishing ball that bursts on contact with flames. Simple throw-and-extinguish operation.',
      longDescription: 'The Fire Ball is a revolutionary fire safety device that automatically activates within 3-5 seconds of contact with flames. Simply throw it into the fire - it bursts and disperses extinguishing powder over a 3m radius.',
          imageUrl: 'assets/images/products/fire-ball.svg',
      category: 'Fire Suppression',
      features: [
        'Auto-activates in 3-5 seconds',
        'Throw-and-extinguish simplicity',
        'Covers 3-meter radius',
        '5-year shelf life',
        'Non-toxic ABC powder',
        'Loud alarm (120dB) on activation',
      ],
      specifications: {
        'Agent': 'ABC Dry Powder (1.3kg)',
        'Activation Time': '3-5 seconds',
        'Coverage Radius': '3 meters',
        'Weight': '1.3 kg',
        'Dimensions': '150mm diameter',
        'Shelf Life': '5 years',
      },
    },
    {
      id: 'fire-bucket',
      name: 'Fire Bucket with Stand',
      shortDescription: 'Traditional fire bucket with sand, mounted on a sturdy stand. Essential for construction sites and industrial areas.',
      longDescription: 'The Fire Bucket with Stand is a classic fire safety equipment consisting of a red painted metal bucket filled with fire sand, mounted on a sturdy metal stand. Required by safety regulations for construction sites, petrol pumps, and industrial facilities.',
          imageUrl: 'assets/images/products/fire-bucket.svg',
      category: 'Fire Safety Equipment',
      features: [
        'Heavy-duty metal construction',
        'Red powder-coated finish',
        'Includes fire sand',
        'Sturdy floor/wall mount stand',
        'Complies with factory safety norms',
      ],
      specifications: {
        'Bucket Capacity': '9 liters',
        'Material': 'Mild Steel (MS)',
        'Finish': 'Red Powder Coating',
        'Stand Height': '900mm',
        'Includes': 'Bucket, Stand, Fire Sand',
      },
    },
    {
      id: 'fire-alarm-system',
      name: 'Fire Alarm System',
      shortDescription: 'Complete addressable and conventional fire alarm systems with detectors, panels, and notification devices.',
      longDescription: 'Our Fire Alarm Systems include both addressable and conventional configurations with smoke detectors, heat detectors, manual call points, sounders, and control panels. Designed for early detection and warning in buildings of all sizes.',
          imageUrl: 'assets/images/products/fire-alarm.svg',
      category: 'Fire Detection & Alarm',
      features: [
        'Addressable and conventional options',
        'Smoke, heat, and multi-sensor detectors',
        'Manual call points (break glass)',
        'Sounders and beacon notification',
        'Control panels with zone indication',
        'Battery backup included',
        'Complies with IS 2189 / NFPA 72',
      ],
      specifications: {
        'System Types': 'Addressable / Conventional',
        'Detector Types': 'Optical Smoke, Heat, Multi-sensor',
        'Panel Capacity': '1-200 zones',
        'Power Supply': '230V AC + 24V DC Battery Backup',
        'Communication': 'RS485 / TCP-IP (addressable)',
      },
    },
    {
      id: 'fire-sprinkler-system',
      name: 'Fire Sprinkler System',
      shortDescription: 'Automatic wet, dry, and pre-action sprinkler systems for comprehensive fire suppression coverage.',
      longDescription: 'Fire Sprinkler Systems provide automatic fire suppression through a network of piping and sprinkler heads. Available in wet pipe, dry pipe, pre-action, and deluge configurations for different applications and environments.',
          imageUrl: 'assets/images/products/fire-sprinkler.svg',
      category: 'Fire Suppression Systems',
      features: [
        'Wet, dry, pre-action, deluge systems',
        'Quick response and standard response heads',
        'Concealed, pendant, upright, sidewall heads',
        'Hydraulic calculation and design',
        'Complies with NFPA 13 / IS 15105',
        'Flow switches and pressure gauges',
      ],
      specifications: {
        'System Types': 'Wet / Dry / Pre-action / Deluge',
        'Sprinkler K-Factor': 'K5.6, K8.0, K11.2, K14.0',
        'Response Type': 'Quick / Standard / Special',
        'Operating Temperature': '57°C - 141°C (various ratings)',
        'Pipe Material': 'MS / GI / CPVC (as per design)',
        'Design Standard': 'NFPA 13 / IS 15105',
      },
    },
    {
      id: 'fire-hydrant-system',
      name: 'Fire Hydrant System',
      shortDescription: 'Complete internal and external fire hydrant systems with pumps, piping, landing valves, and hose reels.',
      longDescription: 'Fire Hydrant Systems provide high-pressure water supply for firefighting through a network of underground/overhead piping, hydrant valves, hose reels, and fire pumps. Essential for industrial complexes, high-rise buildings, and commercial establishments.',
          imageUrl: 'assets/images/products/fire-hydrant.svg',
      category: 'Fire Suppression Systems',
      features: [
        'Internal and external hydrant networks',
        'Electric and diesel fire pump sets',
        'Jockey pump for pressure maintenance',
        'Landing valves and hose reels',
        'Fire brigade inlet connections',
        'Complies with IS 3844 / NBC Part 4',
        'Annual testing and certification',
      ],
      specifications: {
        'System Pressure': '7-10 bar (typical)',
        'Pump Types': 'Electric motor / Diesel engine',
        'Pump Capacity': '1620-2850 LPM (as per design)',
        'Pipe Material': 'MS Class C / DI / GI',
        'Hydrant Valve': 'Single / Double outlet',
        'Design Standard': 'IS 3844 / NBC Part 4',
      },
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(p => p.category === category);
  }

  getCategories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }
}