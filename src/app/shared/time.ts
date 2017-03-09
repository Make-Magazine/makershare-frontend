import {Pipe, PipeTransform} from '@angular/core';
declare var moment: any;
@Pipe({ name: 'time' })
export class TimePipe {
    transform(value: any) {
        if (!value) {
            return '';
        }

        var m = moment(new Date(value).toISOString(), 'YYYY-M-D HH:mm:ss').format('HH:mm A');
        return m;
    }
}