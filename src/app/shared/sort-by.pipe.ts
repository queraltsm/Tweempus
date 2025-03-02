import { Pipe, PipeTransform } from '@angular/core';

import { TwimpModel } from './twimp/twimp.model';

@Pipe({
  name: 'sortBy',
  standalone: true,
  pure: false
})
export class SortByPipe implements PipeTransform {

  transform(value: TwimpModel[], ...args: unknown[]): TwimpModel[] {
    return value.sort((a, b) => {
      const [aDay, aMonth, aYear] = a.timestamp.split("-");
      const [bDay, bMonth, bYear] = b.timestamp.split("-");
      const aDate = new Date(parseInt(aYear), parseInt(aMonth) + 1, parseInt(aDay));
      const bDate = new Date(parseInt(bYear), parseInt(bMonth) + 1, parseInt(bDay));
      return bDate.getTime() - aDate.getTime();
    });
  }

}