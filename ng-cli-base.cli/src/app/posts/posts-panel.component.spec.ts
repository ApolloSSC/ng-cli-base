import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPanelComponent } from './posts-panel.component';

describe('PostsPanelComponent', () => {
  let component: PostsPanelComponent;
  let fixture: ComponentFixture<PostsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
