import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Program } from './program';
import 'rxjs/add/operator/filter';

import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class ProgramService {

  constructor(private http: Http) {
    //  this.http.get(`/api/programs`).subscribe(test => console.log(test.json()));
  }

  /**
   * voir la page /plan, il doit y avoir 3 éléments
   * @returns {null}
   */
  findAll(): Observable<Program[]> {
    return this.http.get(`/api/programs`).map(res => res.json());
  }

  /**
   * voir la page /run, le switch doit avoir 3 élément + autre
   * @returns {null}
   */
  findAllPlusEmpty(): Observable<Program[]> {
    return this.findAll().map(programs => {
      programs.push({name: 'Autre'})
      return programs;
    });
  }

  /**
   * accéder au détail d'un programme /plan/detail/0
   * @param index
   * @returns {null}
   */
  getProgramByIndex(index: number): Observable<any> {
    return this.http.get(`/api/programs/${index}`).map(res => res.json());
  }

  /**
   * faites une mise à jour d'un programme (description ?) et faites un rafraïchissment de la page
   * @param index
   * @param program
   */
  updateProgram(index: number, program: Program): void {
     this.http.post(`/api/programs/${index}`, program).subscribe(() => {});
  }

  /**
   * créez un programme
   * @param program
   */
  addProgram(program: Program): void {
    this.http.post(`/api/programs`, program).subscribe(() => {});
  }

  /**
   * supprimer un programme
   * @param index
   */
  deleteProgram(index: number): void {
    this.http.delete(`/api/programs/${index}`).subscribe(() => {});
  }

}
