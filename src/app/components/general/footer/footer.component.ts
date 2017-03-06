import { Component, OnInit } from '@angular/core';
import { JoinModalComponent } from '../../modals/join/join-modal/join-modal.component'
import { DialogService } from "ng2-bootstrap-modal";



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private dialogService:DialogService) { }
  showConfirm() {
    let disposable = this.dialogService.addDialog(JoinModalComponent, {
        title:'Join Modal', 
        message:'The Modal is working!'})
        .subscribe((isConfirmed)=>{
          console.log('hello')
            //We get dialog result
            if(isConfirmed) {
                alert('accepted');
            }
            else {
                alert('declined');
            }
        });
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(()=>{
        disposable.unsubscribe();
    },10000);
  }
  ngOnInit() {
  }

}
