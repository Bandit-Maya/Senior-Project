import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagevolunteersComponent } from './managevolunteers.component';

describe('ManagevolunteersComponent', () => {
  let component: ManagevolunteersComponent;
  let fixture: ComponentFixture<ManagevolunteersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagevolunteersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagevolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
