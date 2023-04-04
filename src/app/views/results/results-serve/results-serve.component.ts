import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-serve',
  templateUrl: './results-serve.component.html',
  styleUrls: ['../results.component.css']
})
export class ResultsServeComponent implements OnInit {

  @Input() testEvent: any;
  @Input() group_id: string = '';

  constructor(public _router: Router) { }

  ngOnInit() {
  }

  goToRes(res: string) {
    if (this.group_id) {
      this._router.navigate(['/testing/serve/', this.group_id, this.testEvent.id_db, res, "1"])
    } else {
      this._router.navigate(['/testing/serve', this.testEvent.id_db, res, "1"])
    }
  }

}
