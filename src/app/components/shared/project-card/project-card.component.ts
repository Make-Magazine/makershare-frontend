import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent implements OnInit {
  @Input() projectCard;
  constructor(private router: Router, private route: ActivatedRoute, ) { }
  nid;
  myid;
  ngOnInit() {
    this.myid = localStorage.getItem('user_id');
    console.log(this.projectCard)
  }

  challengePage(nid) {
    console.log(nid);

    this.router.navigate(['challenges/', nid]);

  }
  ShowProjectDetails(nid) {
    this.router.navigate(['/project/view', nid]);
    console.log(nid)
  }
}
