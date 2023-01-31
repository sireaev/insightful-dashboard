import { Pipe, type PipeTransform } from '@angular/core';
import { differenceInHours } from 'date-fns';

@Pipe({
  name: 'totalTime',
})
export class TotalTimePipe implements PipeTransform {

  transform(clockIn: string, clockOut: string): number {
    if (!Date.parse(clockIn) || !Date.parse(clockOut)) return 0;

    return Math.abs(differenceInHours(new Date(clockIn), new Date(clockOut)));
  }

}
