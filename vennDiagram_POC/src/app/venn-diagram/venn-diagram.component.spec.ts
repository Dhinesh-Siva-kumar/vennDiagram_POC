import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VennDiagramComponent } from './venn-diagram.component';

describe('VennDiagramComponent', () => {
  let component: VennDiagramComponent;
  let fixture: ComponentFixture<VennDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VennDiagramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VennDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
