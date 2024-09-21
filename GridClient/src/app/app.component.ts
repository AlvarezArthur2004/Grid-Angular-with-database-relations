import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from "./user/grid/grid.component";
import { GridoutputComponent } from "./user/output/gridoutput.component";
import { GridoutputsubjectComponent } from "./user/output/gridoutputsubject/gridoutputsubject.component";
import { GridresultComponent } from './user/output/gridresult/gridresult.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GridComponent, GridoutputComponent, GridoutputsubjectComponent,GridresultComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  
  @ViewChild(GridoutputsubjectComponent) gridOutputSubjectComponent!: GridoutputsubjectComponent;

  @ViewChild(GridoutputComponent) gridOutputStudentComponent!: GridoutputComponent;



  onSubjectCreated() {
    if (this.gridOutputSubjectComponent) {
      this.gridOutputSubjectComponent.refreshTableData();
    }
  }

  onStudentCreated() {
    if (this.gridOutputSubjectComponent) {
      this.gridOutputStudentComponent.refreshTableData();
    }
  }

}
