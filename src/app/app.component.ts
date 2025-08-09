import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ConnectivityServiceService } from './shared/services/connectivity/connectivity-service.service';
import { Location } from '@angular/common';
import { SHARED_IMPORTS } from './shared/shared-imports';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [...SHARED_IMPORTS, RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ba_mory';
  canShowMenu = true;

  constructor(
    public location: Location,
    private router: Router,
    private connectionService: ConnectivityServiceService
  ) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        const hiddenUrls = ['/auth', 'auth/login'];
        const currentUrl = event.urlAfterRedirects || event.url;

        // Mise à jour de la visibilité du menu en fonction de l'URL
        this.canShowMenu = !hiddenUrls.includes(currentUrl);
      });
  }

  ngOnInit(): void {
    this.checkConnection();
  }

  // Vérification de la connexion dès le chargement du composant
  checkConnection() {
    if (!this.connectionService.isOnline()) {
      // Si l'utilisateur est hors ligne, redirection vers la page "not-found"
      this.router.navigate(['/not-found']);
    }
  }
}

export function convertObjectInFormData(tab: any) {
  const formData = new FormData();

  for (const key in tab) {
    if (tab.hasOwnProperty(key)) {
      const value = tab[key];

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          formData.append(key, value[i]);
        }
      } else if (typeof value === 'object' && value !== null) {
        const nestedFormData = convertObjectInFormData(value);
        nestedFormData.forEach((nestedValue, nestedKey) => {
          formData.append(key + '.' + nestedKey, nestedValue);
        });
      } else {
        formData.append(key, value);
      }
    }
  }

  return formData;
}

export function imprimerDiv(divToPrint: any): void {
  // let printContents = this.divToPrint.nativeElement.innerHTML;
  let printContents = divToPrint;
  let styles = Array.from(
    document.querySelectorAll('link[rel="stylesheet"], style')
  )
    .map((node) => node.outerHTML)
    .join('');
  let iframe: any = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(
    '<html><head><title>Impression</title>' +
      styles +
      '</head><body>' +
      printContents +
      '</body></html>'
  );
  iframeDoc.close();
  iframe.onload = function () {
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  };
}

export function impressionPersonnaliser(divToPrint: any): void {
  let printContents = divToPrint;

  // Récupérer les styles globaux
  let styles = Array.from(document.styleSheets)
    .map((styleSheet) => {
      try {
        return Array.from(styleSheet.cssRules)
          .map((rule) => rule.cssText)
          .join('');
      } catch (e) {
        return ''; // Ignore les erreurs CORS
      }
    })
    .join('');

  // Ajouter le logo (ajuste le chemin si nécessaire)
  let logoUrl = 'assets/logo.png'; // Assurez-vous que le fichier est bien dans src/assets/

  let iframe: any = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(`
    <html>
      <head>
        <title>Impression</title>
        <style>
          ${styles}
          .logo {display: block; }
        </style>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `);
  iframeDoc.close();

  iframe.onload = function () {
    setTimeout(() => {
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }, 500);
  };
}
