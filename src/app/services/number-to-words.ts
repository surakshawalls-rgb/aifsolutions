import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NumberToWordsService {

  convert(n: number): string {
    return `Rupees ${n.toFixed(0)} Only`;
  }
}