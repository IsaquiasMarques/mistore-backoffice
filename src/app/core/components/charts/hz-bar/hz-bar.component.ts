import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'hz-bar',
  templateUrl: './hz-bar.component.html',
  styleUrl: './hz-bar.component.css'
})
export class HzBarComponent implements OnInit, OnChanges {
  chartValues: any = {
    details: {
      title: 'Dados por produtos',
      description: 'Análise de estados de produtos por venda',
      chartUnity: 'AOA'
    },
    labels: [  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul" ],
    series: [
      {
        name: 'Ganhos',
        color: '#61C554',
        data: [ 10123, 13345, 35235, 25223, 64213, 23000, 50522 ]
      },
      {
        name: 'Perdas',
        color: "#ddd",
        data: [ 23000, 23000, 45123, 25342, 56000, 23553, 70000 ]
      }
    ]
  }

  chartHeight = 256; // Altura do gráfico em pixels
  maxValue: number = 0;
  minValue: number = 0;
  scaleY: number = 0;
  yAxisIntervals: string[] = [];

  ngOnInit(): void {
    this.calculateMinMaxValues();
    this.calculateScaleY();
    this.calculateYAxisIntervals();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  
  calculateMinMaxValues(): void {
    const allData = this.chartValues.series.reduce((acc: string | any[], series: { data: any; }) => acc.concat(series.data), []);
    this.maxValue = Math.max(...allData);
    this.minValue = Math.min(...allData);
  }

  calculateScaleY(): void {
    const valueRange = this.maxValue - this.minValue;
    this.scaleY = valueRange > 0 ? this.chartHeight / valueRange : 1;
  }

  calculateYAxisIntervals(): void {
    const intervalMagnitude = Math.pow(10, Math.floor(Math.log10(this.maxValue))); // Determina a magnitude do intervalo
    const maxIntervalCount = 5; // Número de intervalos desejado
    const intervalStep = Math.ceil(this.maxValue / maxIntervalCount); // Calcula o intervalo entre os intervalos
    this.yAxisIntervals = Array.from({ length: maxIntervalCount + 1 }, (_, index) => this.formatValue(index * intervalStep)).reverse(); // Inverte a ordem dos intervalos
  }

  calculateBarHeight(value: number): number {
    return value * this.scaleY;
  }

  formatValue(value: number): string {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(0) + 'B';
    
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(0) + 'M';
    
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + 'K';
    
    } else {
      return value.toFixed(0);
    
    }
  }

  getPercentage(value: number): number{
    return (value * 100) / this.maxValue;
  }

}
