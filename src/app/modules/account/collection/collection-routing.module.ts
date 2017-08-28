import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from '../../account/collection/collection.component';

const CollectionRouts: Routes = [
  { path: 'bookmark', component: CollectionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(CollectionRouts)],
  exports: [RouterModule],
  declarations: [],
})
export class CollectionRoutingModule {}
