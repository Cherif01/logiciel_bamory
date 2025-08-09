import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
declare var google: any;

@Component({
  selector: 'app-dashboard',
  imports: [SHARED_IMPORTS],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  total = 152;
  presents = 134;
  enConge = 10;
  absents = 8;

  ngOnInit() {
    this.loadGoogleCharts();
  }

  loadGoogleCharts() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.drawPieChart();
      this.drawLineChart();
    });
  }

  drawPieChart() {
    const data = google.visualization.arrayToDataTable([
      ['Statut', 'Nombre'],
      ['Présents', this.presents],
      ['En congé', this.enConge],
      ['Absents', this.absents],
    ]);

    const options = {
      title: '',
      pieHole: 0.4,
      chartArea: { width: '100%', height: '100%' },
      legend: { position: 'bottom' },
      colors: ['#198754', '#ffc107', '#dc3545'],
    };

    const chart = new google.visualization.PieChart(
      document.getElementById('piechart')
    );
    chart.draw(data, options);
  }

  drawLineChart() {
    const data = google.visualization.arrayToDataTable([
      ['Mois', 'Présents', 'En Congé', 'Absents'],
      ['Jan', 120, 15, 17],
      ['Fév', 130, 10, 12],
      ['Mar', 125, 14, 13],
      ['Avr', 138, 9, 5],
      ['Mai', 134, 10, 8],
      ['Juin', 140, 6, 6],
      ['Juil', 134, 10, 8],
    ]);

    const options = {
      title: 'Évolution du personnel par mois',
      curveType: 'function',
      legend: { position: 'bottom' },
      chartArea: { width: '85%', height: '70%' },
      colors: ['#198754', '#ffc107', '#dc3545'],
    };

    const chart = new google.visualization.LineChart(
      document.getElementById('linechart')
    );
    chart.draw(data, options);
  }
}
