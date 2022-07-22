import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalNavigationDividerItemComponent } from './vertical-navigation-divider-item.component';

describe('VerticalNavigationDividerItemComponent', () => {
  let component: VerticalNavigationDividerItemComponent;
  let fixture: ComponentFixture<VerticalNavigationDividerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalNavigationDividerItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerticalNavigationDividerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
