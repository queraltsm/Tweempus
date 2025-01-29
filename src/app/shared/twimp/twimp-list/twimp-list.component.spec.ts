import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwimpListComponent } from './twimp-list.component';

describe('TwimpListComponent', () => {
  let component: TwimpListComponent;
  let fixture: ComponentFixture<TwimpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwimpListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwimpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
