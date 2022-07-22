import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalNavigationTextItemComponent } from './vertical-navigation-text-item.component';

describe('VerticalNavigationTextItemComponent', () => {
  let component: VerticalNavigationTextItemComponent;
  let fixture: ComponentFixture<VerticalNavigationTextItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalNavigationTextItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerticalNavigationTextItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
