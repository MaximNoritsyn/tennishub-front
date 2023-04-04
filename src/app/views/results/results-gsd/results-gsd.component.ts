import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-gsd',
  templateUrl: './results-gsd.component.html',
  styleUrls: ['../results.component.css']
})
export class ResultsGsdComponent implements OnInit {

  @Input() testEvent: any;
  @Input() group_id: string = '';

  constructor(public _router: Router) { }

  ngOnInit() {
  }

  goToRes(res: string) {
    if (this.group_id) {
      this._router.navigate(['/testing/gsd/', this.group_id, this.testEvent.id_db, res])
    } else {
      this._router.navigate(['/testing/gsd', this.testEvent.id_db, res])
    }
  }

}
