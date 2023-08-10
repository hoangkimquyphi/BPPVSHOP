import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagetionComponent } from './pagetion.component';

describe('PagetionComponent', () => {
  let component: PagetionComponent;
  let fixture: ComponentFixture<PagetionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagetionComponent]
    });
    fixture = TestBed.createComponent(PagetionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
