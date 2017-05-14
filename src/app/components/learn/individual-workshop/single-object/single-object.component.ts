import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services';

@Component({
  selector: 'app-single-object',
  templateUrl: './single-object.component.html',
  styleUrls: ['./single-object.component.css']
})
export class SingleObjectComponent implements OnInit {

  WorkshopNid:number;
  CurrentObjectNid:number;
  CurrentObjectIndex:number;
  CurrentObject:any;
  ObjectsList:any[];
  IsLoading:boolean;


  constructor(
    private route: ActivatedRoute,
    private viewService:ViewService,
  ){

  }

  ngOnInit(){
    this.IsLoading = true;
    //getting workshop nid and current object nid
    this.CurrentObjectNid = this.route.params['_value'].nid;
    this.WorkshopNid = this.route.params['_value'].workshopID;
    this.GetWorkshopObjects();
  }

  GetWorkshopObjects(){
    
    this.viewService.getView('workshop-objects-list', [['nid', this.WorkshopNid]]).subscribe(data => {
      data.forEach((object,index)=>{
        if(object.nid == this.CurrentObjectNid){
          this.CurrentObjectIndex = index;
          return;
        }
      });
      this.ObjectsList = data;
      // console.log(this.ObjectsList);

    },err=>{console.log(err)
    },()=>{
      this.GetObjectDetailsById();
    });
  }

  GetObjectDetailsById(){
    this.viewService.getView('learning-object', [['nid', this.CurrentObjectNid]]).subscribe((LearningObject)=>{
      this.CurrentObject = LearningObject[0];
      //  console.log(this.CurrentObject);
    },err=>{console.log(err)
    },()=>{
      this.IsLoading = false;
    });
  }

  GoToIndex(NewIndex){
    delete this.CurrentObject;
    this.CurrentObjectNid = this.ObjectsList[NewIndex].nid;
    this.CurrentObjectIndex = NewIndex;
    this.GetObjectDetailsById();
  }

}
