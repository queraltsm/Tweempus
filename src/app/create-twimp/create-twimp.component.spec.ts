import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTwimpComponent } from './create-twimp.component';

describe('CreateTwimpComponent', () => {
  let component: CreateTwimpComponent;
  let fixture: ComponentFixture<CreateTwimpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTwimpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTwimpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
