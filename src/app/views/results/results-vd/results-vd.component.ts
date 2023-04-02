import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results-vd',
  templateUrl: './results-vd.component.html',
  styleUrls: ['../results.component.css']
})
export class ResultsVdComponent implements OnInit {

  @Input() testEvent: any;

  constructor() { }

  ngOnInit() {
  }

}
