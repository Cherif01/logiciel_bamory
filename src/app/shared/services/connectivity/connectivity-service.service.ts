import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityServiceService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Check if the app is online
  isOnline(): boolean {
    // Ensure this code is executed only on the browser side
    if (isPlatformBrowser(this.platformId)) {
      return navigator.onLine;
    }
    return false; // Default to false when not in the browser (e.g., during SSR)
  }
}
