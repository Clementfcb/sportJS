import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseBreakLine'
})
export class ParseBreakLinePipe implements PipeTransform {

  transform(value: string): string {
    // Expression régulière. g -> autant de fois que trouvé
    return value.replace(/\n/g, '<br>');
  }

}
