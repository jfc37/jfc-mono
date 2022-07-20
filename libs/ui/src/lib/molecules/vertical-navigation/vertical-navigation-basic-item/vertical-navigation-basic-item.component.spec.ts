import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalNavigationBasicItemComponent } from './vertical-navigation-basic-item.component';

describe('VerticalNavigationBasicItemComponent', () => {
  let component: VerticalNavigationBasicItemComponent;
  let fixture: ComponentFixture<VerticalNavigationBasicItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalNavigationBasicItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerticalNavigationBasicItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
