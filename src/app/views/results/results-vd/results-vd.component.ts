import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-vd',
  templateUrl: './results-vd.component.html',
  styleUrls: ['../results.component.css']
})
export class ResultsVdComponent implements OnInit {

  @Input() testEvent: any;
  @Input() group_id: string = '';

  constructor(public _router: Router) { }

  ngOnInit() {
  }

  goToRes(res: string) {
    if (this.group_id) {
      this._router.navigate(['/testing/vd/', this.group_id, this.testEvent.id_db, res])
    } else {
      this._router.navigate(['/testing/vd', this.testEvent.id_db, res])
    }
  }

}
