import { Component, OnInit } from '@angular/core';
import { DynamicImportingFunctions } from '../import-on-demand';
import { KeyboardConfig } from './keyboard.utils';
import { Cell, SodokuOptions, createCellWithValue } from '../../app/board/cell/cell.model';
import { CellComponent } from '../../app/board/cell/cell.component';
import { Subject } from 'rxjs';

@Component({
  standalone: true,
  imports: [CellComponent],
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements DynamicImportingFunctions {


  whenSelect = new Subject<Cell | null>();
  config!: KeyboardConfig;
  numbers = Array.from({length: 9}).map((_, i) => createCellWithValue((i + 1) as SodokuOptions));


  setData<T>(config: T): void {
    this.config = config as KeyboardConfig;
  }

  cellClicked(cell: Cell): void {
    this.whenSelect.next(cell);
  }

  clean(): void {
    this.whenSelect.next(null);
  }



}
