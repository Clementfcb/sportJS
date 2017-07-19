import { Pipe, PipeTransform } from '@angular/core';
import {Exercice, ExerciceCategory} from "../shared/program/exercice";

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(value: Exercice[], cat?: ExerciceCategory): Exercice[] {
    if (!cat || !value) {
      return value;
    } else {
      return value.filter(exo => exo.category === cat);
    }
  }

}
