import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results-serve',
  templateUrl: './results-serve.component.html',
  styleUrls: ['../results.component.css']
})
export class ResultsServeComponent implements OnInit {

  @Input() testEvent: any;

  constructor() { }

  ngOnInit() {
  }

}
