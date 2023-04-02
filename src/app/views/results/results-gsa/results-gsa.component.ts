import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results-gsa',
  templateUrl: './results-gsa.component.html',
  styleUrls: ['../results.component.css']
})
export class ResultsGsaComponent implements OnInit {

  @Input() testEvent: any;

  constructor() { }

  ngOnInit() {
  }

}
