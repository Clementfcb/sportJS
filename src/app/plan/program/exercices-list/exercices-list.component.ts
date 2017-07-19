import {Component, Input, OnInit} from '@angular/core';
import {Exercice} from "../../../shared/program/exercice";

@Component({
  selector: 'sp-exercices-list',
  templateUrl: './exercices-list.component.html',
  styleUrls: ['./exercices-list.component.scss']
})
export class ExercicesListComponent implements OnInit {

  @Input() exercices: Exercice[];

  constructor() { }

  ngOnInit() { }

  supprimer(i) {
    this.exercices.splice(i, 1);
  }

  moveUp(i) {
    const exerciceMove: Exercice = this.exercices[i];
    this.exercices[i] = this.exercices[i - 1];
    this.exercices[i - 1] = exerciceMove;
  }

  moveDown(i) {
    const exerciceMove: Exercice = this.exercices[i];
    this.exercices[i] = this.exercices[i + 1];
    this.exercices[i + 1] = exerciceMove;
  }
}
