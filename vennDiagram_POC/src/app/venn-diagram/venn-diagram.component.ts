import { Component } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import Venn from 'highcharts/modules/venn';
import Exporting from 'highcharts/modules/exporting';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { CommonModule } from '@angular/common';
Venn(Highcharts);
Exporting(Highcharts);

@Component({
  selector: 'app-venn-diagram',
  standalone: true,
  imports: [HighchartsChartModule,CommonModule],
  templateUrl: './venn-diagram.component.html',
  styleUrl: './venn-diagram.component.css'
})


export class VennDiagramComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  showExportButton = false;
  buttonPosition = { x: 0, y: 0 }; // Position of the export button
  exportData: any[] = []; // Data to be exported
  exportFileName: string = ''; // File name for export
  vennData: any[] = []; // Data to be displayed in the paragraph

  ngOnInit(): void {
    this.vennData = [
      { sets: ['Certificates'], value: 30, name: 'Certificates' },
      { sets: ['Conditions'], value: 20, name: 'Conditions' },
      { sets: ['Surveys'], value: 15, name: 'Surveys' },
      { sets: ['Certificates', 'Conditions'], value: 10, name: 'Certificates & Conditions' },
      { sets: ['Certificates', 'Surveys'], value: 5, name: 'Certificates & Surveys' },
      { sets: ['Conditions', 'Surveys'], value: 3, name: 'Conditions & Surveys' },
      { sets: ['Certificates', 'Conditions', 'Surveys'], value: 2, name: 'All' }
    ];

    this.chartOptions = {
      title: {
        text: '' // Change this to your desired title
      },
      legend: {
        enabled: true
      },
      series: [{
        type: 'venn',
       
        data: this.vennData
      }],
      plotOptions: {
        venn: {
          events: {
            click: (event: any) => {
              // Set the button position based on the click event
              const { chartX, chartY } = event;
              this.buttonPosition = { x: chartX, y: chartY };
              this.showExportButton = true;

              // Get the data related to the clicked area
              const point = event.point;
              this.exportData = this.extractDataForPoint(point);
              this.exportFileName = point.name; // Set the file name based on the clicked point
            }
          }
        }
      }
    };
  }

  extractDataForPoint(point: any): any[] {
    // Extract data related to the clicked area
    // Modify this method to suit your specific data structure
    const data = [
      { Category: point.sets.join(', '), Value: point.value }
    ];
    return data;
  }

  exportToCsv(fileName: string) {
    // Generate CSV file using ngx-csv
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: false,
      useBom: true,
      noDownload: false,
      headers: ["Category", "Value"]
    };
    new ngxCsv(this.exportData, fileName, options);
  }
}
