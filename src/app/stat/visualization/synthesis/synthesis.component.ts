import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecordStoreService} from "../../record-store.service";
import {Observable} from "rxjs/Observable";
import {Record} from "../../../shared/record/record";
import 'rxjs/add/operator/reduce'
import 'rxjs/add/operator/max'
import 'rxjs/add/operator/min'
import 'rxjs/add/operator/last'
import 'rxjs/add/observable/from'
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'sp-synthesis',
  templateUrl: './synthesis.component.html',
  styleUrls: ['./synthesis.component.scss']
})
export class SynthesisComponent implements OnInit, OnDestroy {

  record$: Observable<Record>;

  // v1 - Pour se désabonner à des souscriptions, il faut garder les instances des abonnements
  recordSub: Subscription;  // A faire autant de fois que d'abonnement

  // v2 - autre solution pour le désabonnement
  destroyObservable = new Subject<void>();

  // ici c'est la méthode | async (du html) qui permet de faire le désabonnement. Le code v1/v2 est à enlever

  constructor(private recordStoreService: RecordStoreService) { }

  ngOnInit() {
    this.record$ = this.recordStoreService.getSelectedRecord$();
    // v1 - pour le désabonnement
    this.recordSub = this.record$.subscribe(val => console.log(val));
    // this.getType$().subscribe(val => console.log(val));
    // this.getDuration$().subscribe(val => console.log(val));
    // this.getMax$().subscribe(val => console.log(val));
    // this.getMin$().subscribe(val => console.log(val));
    // this.getAverage$().subscribe(val => console.log(val));

    // v2
    this.getType$().takeUntil(this.destroyObservable).subscribe(val => console.log(val));
  }

  ngOnDestroy(): void {
    this.recordSub.unsubscribe();

    // v2
    this.destroyObservable.next();
    this.destroyObservable.complete();
  }

  getType$(): Observable<string> {
    // Filtre du départ pour vérifier que le record n'est pas null
    return this.record$
      .filter(record => record !== null)
      .map(record => record.type);
  }

  getDurationv2$(): Observable<string> {
    return this.record$
      .filter(record => record !== null)  // pour ne pas aller plus loin (null)
      .map(record => record.heartBeats)   // seulement le tableau
      .map(h => h[h.length - 1])          // seulement le dernier élément
      .map(h => h.x+1)                    // valeur x
      .map(x => `${Math.floor(x/60)}''${x%60}`);    // formattage
  }

  // Pour tester, passer la valeur de retour à any
  getDuration$(): Observable<string> {
    return this.record$
      .filter(record => record !== null)  // pour ne pas aller plus loin (null)
      .mergeMap(record => Observable.from(record.heartBeats).last())
      .map(h => h.x+1)
      .map(x => `${Math.floor(x/60)}''${x%60}`);    // formattage
  }

  getMax$(): Observable<number> {
    return this.record$
      .filter(record => record !== null)  // pour ne pas aller plus loin (null)
      .mergeMap(record => Observable.from(record.heartBeats)
      .map(h => h.y)
      .max());
  }

  getMin$(): Observable<number> {
    return this.record$
      .filter(record => record !== null)  // pour ne pas aller plus loin (null)
      .mergeMap(record => Observable.from(record.heartBeats)
        .map(h => h.y)
        .min());
  }

  getAverage$(): Observable<number> {
    return this.record$
      .filter(record => record !== null)  // pour ne pas aller plus loin (null)
      .mergeMap(record => Observable.from(record.heartBeats)
        .map(h => h.y)
        .reduce((cumul, y) => {
        return {
          somme: cumul.somme + y,
          nombreElement: cumul.nombreElement + 1
        };
        }, {somme: 0 ,nombreElement: 0})
      .map(cumul => cumul.somme / cumul.nombreElement));
  }
}
