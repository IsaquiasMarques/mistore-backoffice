import { Component } from '@angular/core';
import { HorizontalBarChart } from '@app/core/interfaces/hz-bar-chart.interface';
import { VerticalBarChart } from '@app/core/interfaces/vt-bar-chart.interface';

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
      chartUnity: 'AOA',
      toolpit: true
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

  verticalChart: VerticalBarChart = {
    details: {
      title: 'Dados da loja',
      description: 'Número de visitantes da sua loja nesta semana.',
      toolpit: true
    },
    labels: [
      "Seg",
      "Ter",
      // "Qua",
      // "Qui",
      // "Sex",
      // "Sáb",
      // "Dom"
    ],
    series: [
      {
        name: 'Visitas',
        color: '#F4BF4F',
        data: [
          43,
          23,
          // 45,
          // 80,
          // 30,
          // 12,
          // 4
        ]
      },
      {
        name: 'Abandonos',
        color: "#ddd",
        data: [
          35,
          3,
          // 35,
          // 12,
          // 85,
          // 11,
          // 5
        ]
      },
    ]
  }
}
