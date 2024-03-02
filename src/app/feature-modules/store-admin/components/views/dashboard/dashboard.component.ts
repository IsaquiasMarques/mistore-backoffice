import { Component } from '@angular/core';
import { HorizontalBarChart } from '@app/core/interfaces/hz-bar-chart.interface';

@Component({
  selector: 'mi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  horizontalChart: HorizontalBarChart = {
    details: {
      title: 'Dados por produtos',
      description: 'Análise de estados de produtos por venda',
      chartUnity: 'AOA'
    },
    labels: [
      "Jan",
      "Fev",
      // "Mar",
      // "Abr",
      // "Mai",
      // "Jun",
      // "Jul",
      // "Ago",
      // "Set",
      // "Out",
      // "Nov",
      // "Dez"
    ],
    series: [
      {
        name: 'Ganhos',
        color: '#61C554',
        data: [
          10123,
          13345,
          // 35235,
          // 25223,
          // 64213,
          // 23000,
          // 50522,
          // 23409,
          // 21345,
          // 53234,
          // 34563,
          // 54322
        ]
      },
      {
        name: 'Perdas',
        color: "#ddd",
        data: [
          13000,
          23000,
          // 45123,
          // 35342,
          // 56000,
          // 23553,
          // 70000,
          // 23409,
          // 21345,
          // 64234,
          // 14563,
          // 14322
        ]
      }
    ]
  }
}
