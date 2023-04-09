import { Component, OnInit } from '@angular/core';
import { bb, Chart, line } from 'billboard.js';
import { CryptoLiveInfo } from '../crypt-live-info';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

  chart!: Chart;
  columnData = [
    [""],
    [""]
  ];


  ngOnInit(): void {
      console.log('init chart!');
      const MAX_CHART_CNT = 20;
      this.initChart();
      this.connectEventSource('/api/crypto/live')
        .subscribe((messageEvent) => {
          const event = new CryptoLiveInfo(JSON.parse(messageEvent.data));
          // console.log(event);
          this.columnData[0].push(event.createdAt.toISOString());
          this.columnData[1].push(event.currentPrice.toString());
          if(this.columnData[0].length > MAX_CHART_CNT) {
            this.columnData[0].shift();
            this.columnData[1].shift();
          }
          console.log(this.columnData);
          this.chart.load({
            columns: [
              ["createdAt"].concat(this.columnData[0]),
              ["value"].concat(this.columnData[1])
            ],
            done: function() {
              console.log('done!');
            }
          })
        });
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
        type: line(),
        x: 'createdAt',
        columns: [
          ["createdAt"].concat(this.columnData[0]),
          ["value"].concat(this.columnData[1])
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y.%m.%d %H:%M:%S'
          }
        }
      },
    })
  }
}
