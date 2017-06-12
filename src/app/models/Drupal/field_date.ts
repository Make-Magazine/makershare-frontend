export interface date_time{
  date:string;
  time:string;
}

export class date_time implements date_time{
  constructor(date_with_time?:date_time){
    this.Init(date_with_time);
  }

  protected Init(date_with_time?:date_time){
    if(date_with_time){
      this.date = date_with_time.date;
      this.time = date_with_time.time;
    }else{
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth()+1;
      let year = date.getFullYear();
      let minutes = date.getMinutes();
      let hours = date.getHours();
      this.date = month+'/'+day+'/'+year;
      this.time = hours+':'+minutes;
    }
  }
}

export interface field_date{
  value:date_time;
}

export class field_date implements field_date{
  constructor(date_with_time?:date_time){
    this.Init(date_with_time);
  }

  protected Init(date_with_time?:date_time){
    if(date_with_time){
      this.value = date_with_time;
    }else{
      this.value = new date_time();
    }
  }
}