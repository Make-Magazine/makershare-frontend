import { DrupalCustomField } from './custom-field';

export class DateTime {
  date:string;
  time?:string;

  constructor(date_with_time?:DateTime){
    this.initFields(date_with_time);
  }

  protected initFields(date_with_time?:DateTime){
    if(date_with_time){
      this.date = date_with_time.date;
      this.time = date_with_time.time;
    }else{
      let date = new Date(); //Get current date
      let day = date.getDate().toString();
      let month = (date.getMonth()+1).toString();
      let year = date.getFullYear();
      let minutes = date.getMinutes();
      let hours = date.getHours();
      if(+month < 10)
        month = '0'+month;
      if(+day < 10)
        day = '0'+day;
      this.date = month+'/'+day+'/'+year;
      this.time = hours+':'+minutes+':00';
    }
  }
}

export class FieldDateTime implements DrupalCustomField{
  value:DateTime;

  constructor(date_with_time?: DateTime){
    this.initFields(date_with_time);
  }

  protected initFields(date_with_time?:DateTime){
    if(date_with_time){
      this.value = date_with_time;
    }else{
      this.value = new DateTime();
    }
  }

  init() {
    return [this];
  }

  updateValue(date_time: DateTime) {
    this.value = date_time;
  }
}