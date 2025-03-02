import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTimestampDate'
})
export class CustomTimestampDatePipe implements PipeTransform {

  transform(value: any, format: string = 'short'): string {
    if (!value) return '';
    const timestamp = typeof value === 'string' ? Number(value) : value;
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return ''; 
    }
    const options: Intl.DateTimeFormatOptions = {
      weekday: format === 'long' ? 'long' : 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  }
}
