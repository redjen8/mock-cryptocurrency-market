import { Component, OnInit } from '@angular/core';
import { bb, Chart, bar } from 'billboard.js';
import { CryptoLiveInfo } from '../crypt-live-info';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

  chart!: Chart;

  ngOnInit(): void {
      console.log('init chart!');
      this.initChart();
      this.connectEventSource('/api/crypto/live')
        .subscribe(console.log);
  }

  connectEventSource(url: string): Observable<MessageEvent> {
    return new Observable<MessageEvent>(subscriber => {
      const sse = new EventSource(url);

      sse.onmessage = e => subscriber.next(e);
      sse.onerror = e => subscriber.error(e);

      return () => {
        if (sse.readyState == 1) {
          sse.close();
        }
      }
    })
  }

  initChart(): void {
    this.chart = bb.generate({
      bindto: "#chart",
      data: {
        type: bar(),
        columns: [
          ["data1", 30, 100, 200, 400, 150, 250]
        ]
      },
    })
  }
}
