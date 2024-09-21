import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community'; 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { StudentDetailService } from '../shared/student-detail.service';
import { StudentDetail } from '../shared/student-detail.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gridoutput',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './gridoutput.component.html',
  styles: ``,
})
export class GridoutputComponent implements OnInit {

  rowData: StudentDetail[] = [];  

  constructor(public service : StudentDetailService){

  }

  ngOnInit(): void {
    this.refreshTableData()
  }

  refreshTableData(): void {
    this.service.refreshList().subscribe({
      next: (data: StudentDetail[]) => {
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
    { headerName: 'Mark', field: 'mark',  flex: 1 },
    {  
      headerName: 'Pass Date',
      field: 'passSubject',
      valueFormatter: (params: any) => {
        return new DatePipe('en-US').transform(params.value, 'dd/MM/yyyy') || '';
      },
      flex: 1
    },
    { headerName: 'Subject ID', field: 'subjectId',  flex: 1 }
  ];


}
