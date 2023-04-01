import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-gsd',
  templateUrl: './results-gsd.component.html',
  styleUrls: ['../results.component.css']
})
export class ResultsGsdComponent implements OnInit {

  @Input() testEvent: any;

  constructor() { }

  ngOnInit() {
  }

}
