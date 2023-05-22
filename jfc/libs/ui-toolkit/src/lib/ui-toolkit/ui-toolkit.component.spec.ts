import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiToolkitComponent } from './ui-toolkit.component';

describe('UiToolkitComponent', () => {
  let component: UiToolkitComponent;
  let fixture: ComponentFixture<UiToolkitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiToolkitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiToolkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
