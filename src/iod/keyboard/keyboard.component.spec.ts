/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KeyboardComponent } from './keyboard.component';
import { Cell, createCellWithValue, SodokuOptions } from '../../app/board/cell/cell.model';
import { KeyboardConfig } from './keyboard.utils';

describe('KeyboardComponent', () => {
  let component: KeyboardComponent;
  let fixture: ComponentFixture<KeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit whenSelect event when cell is clicked', () => {
    const cell: Cell = createCellWithValue(1 as SodokuOptions);
    let selectedCell: Cell | null = null;
    component.whenSelect.subscribe((c: Cell | null) => {
      selectedCell = c;
    });
    component.cellClicked(cell);
    expect(selectedCell as unknown as Cell).toBe(cell);
  });
  
  it('should emit null whenSelect event when clean is called', () => {
    const cell: Cell = createCellWithValue(1 as SodokuOptions);
    let selectedCell: Cell | null = cell;
    component.whenSelect.subscribe((c: Cell | null) => {
      selectedCell = c;
    });
    component.clean();
    expect(selectedCell).toBeNull();
  });
  
  it('should emit null whenSelect event when clean is called', () => {
    let selectedCell: Cell | null = null;
    component.whenSelect.subscribe((cell: Cell | null) => {
      selectedCell = cell;
    });
    component.clean();
    expect(selectedCell).toBeNull();
  });
});
