import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SortArrayByKeyPipe } from './pipe/sort-array-by-key.pipe'

@NgModule({
  declarations: [SortArrayByKeyPipe],
  imports: [CommonModule],
  exports: [SortArrayByKeyPipe]
})
export class PipesSortArrayByKeyModule {}
