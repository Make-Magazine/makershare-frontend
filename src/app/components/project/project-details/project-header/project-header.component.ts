import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../../../../d7services/user/user.service';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
})
export class ProjectHeaderComponent implements OnInit {
  @Input('project') project;
  @Input() projectInfo; 
  constructor(
    private userService: UserService,
  ) { }

  userLogin;
  currentuser;
  userId;

  ngOnInit() {
    this.getcurrentuser();
    this.userId = localStorage.getItem('user_id');
    this.currentuser = Number(localStorage.getItem('user_id'));

    
  }
  
  getcurrentuser(){
    this.userService.getStatus().subscribe(data => {
      this.userLogin = data
    });
  }

}
