import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-gsa',
  templateUrl: './results-gsa.component.html',
  styleUrls: ['../results.component.css']
})
export class ResultsGsaComponent implements OnInit {

  @Input() testEvent: any;
  @Input() group_id: string = '';

  constructor(public _router: Router) { }

  ngOnInit() {
  }

  goToRes(res: string) {
    if (this.group_id) {
      this._router.navigate(['/testing/gsa/', this.group_id, this.testEvent.id_db, res])
    } else {
      this._router.navigate(['/testing/gsa', this.testEvent.id_db, res])
    }
  }

}
