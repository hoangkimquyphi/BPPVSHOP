import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendyproductComponent } from './trendyproduct.component';

describe('TrendyproductComponent', () => {
  let component: TrendyproductComponent;
  let fixture: ComponentFixture<TrendyproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrendyproductComponent]
    });
    fixture = TestBed.createComponent(TrendyproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
