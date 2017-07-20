import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import {ResizeGraphService} from "./visualization/resize-graph.service";

@Component({
  selector: 'sp-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],
  providers: [ResizeGraphService]
})
export class StatComponent implements OnInit {

  // permet de récupérer les éléments se trouvant dans le html
  @ViewChild('leftBlock') leftBlock: ElementRef;
  @ViewChild('separator') separator: ElementRef;
  @ViewChild('rightBlock') rightBlock: ElementRef;

  constructor(private elementRef: ElementRef,
              private resizeGraphService: ResizeGraphService) { }

  ngOnInit() {
    // TODO exo-obs
    const mouseDown$ = Observable.fromEvent(this.separator.nativeElement, 'mousedown');
    const mouseMove$ = Observable.fromEvent(document, 'mousemove');
    const mouseUp$ = Observable.fromEvent(document, 'mouseup');

    // A chaque element de mouseDown, on écoute mouseMove
    mouseDown$
      .mergeMap(e => mouseMove$.takeUntil(mouseUp$))
      .subscribe((e: MouseEvent) => {
        // Blocs gauche et droit à redimensionner
        const widths = this.getBlocksWidth(e.x);
        this.leftBlock.nativeElement.setAttribute('style', `witdh:${widths.leftWidth}px`);
        this.rightBlock.nativeElement.setAttribute('style', `witdh:${widths.rightWidth}px`);
        this.resizeGraphService.setWidth(widths.rightWidth);
      });

    const separatorRec = this.separator.nativeElement.getBoundingClientRect();
    const blocksWidth = this.getBlocksWidth(separatorRec.left + separatorRec.width / 2);
    this.resizeGraphService.setWidth(blocksWidth.rightWidth);
  }

  private getBlocksWidth(mouseX: number): {leftWidth, rightWidth} {
    const rectContainer = this.elementRef.nativeElement.getBoundingClientRect();
    const marginAndPaddingSeparator = 7;
    const leftWidth = mouseX - rectContainer.left - marginAndPaddingSeparator;
    const rightWidth = rectContainer.width + rectContainer.left - mouseX - marginAndPaddingSeparator;
    return {leftWidth, rightWidth};
  }

}
