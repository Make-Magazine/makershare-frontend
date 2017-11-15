import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeago'
})
export class TimeagoPipe implements PipeTransform {

  transform(value: string): string {
    const date = this.stringToDate(value, 'mm/dd/yyyy'); // "11/14/2017 08:07:44"
    const now = new Date();
    const hours = this.daysBetween(date, now);
    console.log(hours);
    if (hours < 24) {
      return hours + " Hours Ago";
    } else {
      return value;
    }
  }

  stringToDate(dateTimeString, format): Date {
      const formatLowerCase = format.toLowerCase();

      const formatItems = formatLowerCase.split("/");
      const dateTime = dateTimeString.split(" ");

      const date = dateTime[0];
      const time = dateTime[1];
      const dateItems = date.split("/");
      const timeItems = time.split(":");

      const hours = timeItems[0];
      const mins = timeItems[1];
      const seconds = timeItems[2];
      const monthIndex = formatItems.indexOf("mm");
      const dayIndex = formatItems.indexOf("dd");
      const yearIndex = formatItems.indexOf("yyyy");

      const formatedDate = new Date(dateItems[yearIndex], dateItems[monthIndex] - 1 , dateItems[dayIndex], hours, mins, seconds);
      return this.convertUTCDateToLocalDate(formatedDate);
  }

  convertUTCDateToLocalDate(date): Date {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  daysBetween(date1, date2) {
    // Get 1 day in milliseconds
    const one_hour = 1000 * 60 * 60;

    // Convert both dates to milliseconds
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    const difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_hour);
  }

}
