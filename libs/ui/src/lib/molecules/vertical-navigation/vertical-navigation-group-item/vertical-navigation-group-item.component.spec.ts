import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalNavigationGroupItemComponent } from './vertical-navigation-group-item.component';

describe('VerticalNavigationGroupItemComponent', () => {
  let component: VerticalNavigationGroupItemComponent;
  let fixture: ComponentFixture<VerticalNavigationGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalNavigationGroupItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerticalNavigationGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
