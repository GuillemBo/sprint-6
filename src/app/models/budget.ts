import { signal } from '@angular/core';
export interface Budget {
  title: string;
  description: string;
  price: number;
  controlName: string;
}

export interface CompleteBudget {
  name: string;
  phone: string;
  email: string;
  services: Budget[];
  totalPrice: number;
  fechaActual: Date;
  numPages: number; 
  numLanguages: number;
}
