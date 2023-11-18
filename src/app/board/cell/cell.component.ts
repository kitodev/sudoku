import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cell } from './cell.model';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(cell.location) {
      <span>{{cell.location}}</span>
    }
    @if (cell.value) {
      {{cell.value}}
    }
  `,
  styleUrls: ['./cell.component.scss'],
  host: {
    '[class]': 'cell.theme',
    '[class.predefined]': 'cell.predefined',
    '[class.empty]': '!cell.value'
  }
})
export class CellComponent {

  @Input({required: true}) cell!: Cell;

}
