/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoardComponent } from './board.component';
import { createCell, SodokuOptions } from './cell/cell.model';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start the game', () => {
    component.start();
    expect(component.mode).toBe('started');
  });

  it('should store the grid when renewGame is called', () => {
    const spy = spyOn(localStorage as any, 'setItem');
    component.renewGame();
    expect(spy).toHaveBeenCalled();
  });

  it('should store the grid when renewGame is called', () => {
    const spy = spyOn(localStorage, 'setItem');
    component.renewGame();
    expect(spy).toHaveBeenCalled();
  });

  it('should not allow cell click if game is over', async () => {
    component.mode = 'game-over';
    const spy = spyOn(window, 'alert');
    await component.cellClicked(createCell(1 as any));
    expect(spy).toHaveBeenCalledWith('The game is over, please click on the green button to renew the board');
  });

  it('should not allow cell click if game is waiting', async () => {
    component.mode = 'waiting';
    const spy = spyOn(window, 'alert');
    await component.cellClicked(createCell(1 as SodokuOptions));
    expect(spy).toHaveBeenCalledWith('Please Start Sodoku to fill cells');
  });
});
