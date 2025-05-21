import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset, ChartData } from 'chart.js';
import { StoreService } from '../store/store.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 public totalValue: number = 0;
 public assetLabels: string[] = [];
 public assetData: number[] = [];
 public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };  
  public pieChartLabels: string[] = [];  
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ data: [] }]
  };
  public pieChartType: ChartType = 'pie';
  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    this.storeService.getInvestments().subscribe((investments) => {
      this.totalValue = investments.reduce((acc, inv) => acc + (inv.quantity * inv.purchasePrice), 0);
      this.assetLabels = investments.map(inv => inv.assetType);
      this.assetData = investments.map(inv => inv.quantity * inv.purchasePrice);
      this.pieChartLabels = this.assetLabels;      
      this.pieChartData = {
        labels: investments.map(inv => inv.assetType),
        datasets: [
          {
            data: investments.map(inv => inv.quantity * inv.purchasePrice),
            label: 'Asset Allocation'
          }
        ]
      };
    });
  }
}
