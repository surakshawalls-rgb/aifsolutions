import { Component, input } from '@angular/core';
import { Service } from '../../../core/models';

@Component({
  selector: 'app-service-card',
  standalone: true,
  templateUrl: './service-card.html',
  styleUrls: ['./service-card.css'],
})
export class ServiceCardComponent {
  service = input.required<Service>();
}