import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

export const CLICK_OUTSIDE = "clickoutside";
export const PRESS_ESCAPE = "pressescape";

@Component({
  selector: 'sp-popin',
  templateUrl: './popin.component.html',
  styleUrls: ['./popin.component.scss']
})
export class PopinComponent implements OnInit {

  // récupération de la popin ts (#popin)
  @ViewChild('popin') popin: ElementRef;

  // Bouton exit pour sortir de la popin
  @Output()
   exit = new EventEmitter<string>();

  // elementRef : fait référence à sp-popin entier (fond sombre compris)
  // renderer : click à l'intérieur de la popin
  constructor(private renderer: Renderer2 ,private elementRef: ElementRef) { }

  ngOnInit() {
    // this.renderer.listen(this.popin.nativeElement, 'click', e => console.log(e));
    this.renderer.listen(this.popin.nativeElement, 'click', e => e.stopPropagation()); // permet de ne pas propager l'evenement
    this.renderer.listen(this.elementRef.nativeElement, 'click', e => this.exit.emit(CLICK_OUTSIDE));
    this.renderer.listen(document, 'keydown.Escape', e => this.exit.emit(PRESS_ESCAPE));
  }

}
