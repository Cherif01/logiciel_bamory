// shared/components/spinner/spinner.component.ts
import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../shared-imports';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  constructor(public loaderService: LoaderService) {}
}
