import { Component, ViewChild } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { SubjectDetail } from '../../shared/subject-detail.model';
import { SubjectDetailService } from '../../shared/subject-detail.service';
import { ColDef } from 'ag-grid-community'; 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gridoutputsubject',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './gridoutputsubject.component.html',
  styles: ``
})
export class GridoutputsubjectComponent {

  rowData: SubjectDetail[] = [];  

  constructor(public service : SubjectDetailService){
  }

  ngOnInit(): void {
    this.refreshTableData();
  }

  refreshTableData(): void {
    this.service.refreshList().subscribe({
      next: (data: SubjectDetail[]) => {
        this.rowData = data;
      },
      error: (err) => {
        console.error('Ошибка получения данных: ', err);
      }
    });
  }

  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id',  flex: 1 },
    { headerName: 'Name', field: 'name',  flex: 1 },
    {  
      headerName: 'Date Exam',
      field: 'dateExam',
      valueFormatter: (params: any) => {
        return new DatePipe('en-US').transform(params.value, 'dd/MM/yyyy') || '';
      },
      flex: 1
    }
  ];

}
