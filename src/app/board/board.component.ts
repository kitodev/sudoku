import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { iod } from '../../iod/import-on-demand';
import { KeyboardConfig } from '../../iod/keyboard/keyboard.utils';
import { CellComponent } from './cell/cell.component';
import { Cell, SodokuOptions, createCell } from './cell/cell.model';
import { cellsBlockLocations } from './board.defaults';

const grid = 'GRID';

@Component({
  standalone: true,
  imports: [CommonModule, CellComponent],
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  grid!: Cell[];

  mode: 'edit' | 'waiting' | 'started' | 'game-over' = 'waiting';
  noEmptySodokuCells = true;
  errorNumber = 0;
  where!: 'row' | 'column' | 'block';

  constructor() {
    this.loadGrid();
  }

  start(): void {
    this.mode = 'started';
  }

  renewGame(): void {
    this.loadGrid();
    this.mode = 'waiting';
  }

  checkResult(): void {
    if(!this.errorNumber) {
      this.checkLines();
    }
    if(!this.errorNumber) {
      this.checkColumns();
    }
    if (!this.errorNumber) {
      this.checkBlocks();
    }
    if(!this.errorNumber) {
      this.mode = 'game-over';
    }
  }

  async cellClicked(cell: Cell): Promise<void> {
    if(this.mode === 'game-over') {
      return alert('The game is over, please click on the green button to renew the board');
    }
    if (this.mode === 'waiting') {
      return alert('Please Start Sodoku to fill cells');
    }
    this.cleanErrors();
    const keyboard = await iod.openKeyboard();
    keyboard.instance.setData<KeyboardConfig>({ cell });
    const sub = keyboard.instance.whenSelect.subscribe(val => {
      cell.value = val?.value || 0;
      switch (this.mode) {
        case 'edit':
          cell.predefined = !!val?.value;
          this.storeGrid();
          break;
        default:
          this.noEmptySodokuCells = this.grid.some(({ value }) => !value);
          break;
      }
      iod.destroy(keyboard, sub);
    });
  }

  private cleanErrors(): void {
    if (this.errorNumber) {
      this.grid.forEach(cell => cell.theme = '');
      this.errorNumber = 0;
    }
  }

  private storeGrid() {
    localStorage.setItem(grid, JSON.stringify(this.grid));
  }

  private loadGrid(): void {
    const val = localStorage.getItem(grid);
    if (!val) {
      this.grid = Array.from({ length: 81 }).map((_, i) => createCell((i + 1) as SodokuOptions));
      this.storeGrid();
    } else {
      this.grid = JSON.parse(val);
    }
  }

  private checkLines(): void {
    const grid = [...this.grid];
    for (let index = 0; index < 9; index++) {
      const line = grid.splice(0, 9);
      this.checkNumbers(line);
      if (this.errorNumber) {
        this.where = 'row';
        const index = this.grid.findIndex(({ id }) => id === line[0].id);
        for (let i = index; i < index + 9; i++) {
          const cell = this.grid[i];
          this.setErrorToCell(cell);
        }
        return;
      }
    }
  }

  private checkColumns(): void {
    for (let index = 0; index < 9; index++) {
      const line: Cell[] = [];
      for (let cell = 0; cell < 9; cell++) {
        line.push(this.grid[9 * cell + index]);
      }
      this.checkNumbers(line);
      if (this.errorNumber) {
        this.where = 'column';
        line.forEach(this.setErrorToCell.bind(this));
        return;
      }
    }
  }

  private checkBlocks(): void {
    for (let index = 0; index < 9; index++) {
      const cellIndexes = cellsBlockLocations[index];
      const block: Cell[] = cellIndexes.map(cellIndex => this.grid[cellIndex]);
      this.checkNumbers(block);
      if (this.errorNumber) {
        this.where = 'block';
        block.forEach(this.setErrorToCell.bind(this));
        return;
      }
    }
  }

  private checkNumbers(line: Cell[]): void {
    const numbers = line.map(({ value }) => value);
    for (let index = 0; index < numbers.length; index++) {
      const num = numbers[index];
      const ok = numbers.indexOf(num) === index;
      if (!ok) {
        this.errorNumber = num;
        break;
      }
    }
  }

  private setErrorToCell(cell: Cell): void {
    cell.theme = !this.errorNumber ? '' :
      cell.value === this.errorNumber ?
        'error strong' : 'error';
  }
}


