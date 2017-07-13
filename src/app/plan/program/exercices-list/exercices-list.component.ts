import {Component, Input, OnInit} from '@angular/core';
import {Exercice} from "../exercice/exercice";

class SelectableExercice extends Exercice {
  selected?: boolean;
}

@Component({
  selector: 'sp-exercices-list',
  templateUrl: './exercices-list.component.html',
  styleUrls: ['./exercices-list.component.scss']
})
export class ExercicesListComponent implements OnInit {

  @Input() exercices: SelectableExercice[];

  constructor() { }

  ngOnInit() {
  }

  moveUp(i: number): void {
    if (i < this.exercices.length - 1) {
      const exercice = this.exercices[i];
      this.exercices[i] = this.exercices[i + 1];
      this.exercices[i + 1] = exercice
    }
  }

  moveDown(i: number): void {
    if (i > 0) {
      const exercice = this.exercices[i];
      this.exercices[i] = this.exercices[i - 1];
      this.exercices[i - 1] = exercice
    }
  }

  deleteExercice(i: number): void {
    this.exercices.splice(i, 1);
  }
}
