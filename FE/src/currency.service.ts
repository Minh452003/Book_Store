// currency.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CurrencyService {
    formatCurrency(number: number): string {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}
