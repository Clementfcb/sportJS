import { NgModule } from '@angular/core';

import { StatRoutingModule } from './stat-routing.module';
import { SelectorComponent } from './selector/selector.component';
import { StatComponent } from './stat.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { SynthesisComponent } from './visualization/synthesis/synthesis.component';
import {GraphComponent} from "./visualization/graph/graph.component";
import {SharedModule} from "../shared/shared.module";
import {RecordStoreService} from "./record-store.service";
import { FilterByCategoryPipe } from './filter-by-category.pipe';

@NgModule({
  imports: [
    SharedModule,
    StatRoutingModule
  ],
  declarations: [
    GraphComponent,
    SelectorComponent,
    StatComponent,
    VisualizationComponent,
    SynthesisComponent,
    FilterByCategoryPipe
  ],
  providers: [RecordStoreService]
})
export class StatModule { }
