import { Component } from '@angular/core';
import { SubjectDetailService } from '../../shared/subject-detail.service';
import { SubjectDetail } from '../../shared/subject-detail.model';
import { ColDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, NgForm } from '@angular/forms';  
import { StudentDetail } from '../../shared/student-detail.model';
import { StudentDetailService } from '../../shared/student-detail.service';

@Component({
  selector: 'app-gridresult',
  standalone: true,
  imports: [AgGridModule, FormsModule],
  templateUrl: './gridresult.component.html',
  styles: ``
})
export class GridresultComponent {

  columnDefs: ColDef[] = [];
  rowData: any[] = [];
  baseScholarship: number = 0;  

  constructor(
    public serviceSubject: SubjectDetailService,
    public serviceStudent: StudentDetailService,
  ) {}

  ngOnInit(): void {
    this.createColumnsFromSubjects();
  }

  createColumnsFromSubjects(): void {
    this.serviceSubject.refreshList().subscribe({
      next: (subjects: SubjectDetail[]) => {
        this.columnDefs = this.generateSubjectColumns(subjects);
      },
      error: (err) => {
        console.error('Ошибка получения данных о предметах: ', err);
      }
    });
  }

  generateSubjectColumns(subjects: SubjectDetail[]): ColDef[] {
    const columns: ColDef[] = [
      { headerName: 'Student ID', field: 'studentId', flex: 1 }, 
      { headerName: 'Student Name', field: 'studentName', flex: 1 },
      { headerName: 'Scholarship', field: 'scholarship', flex: 1 }
    ];

    subjects.forEach((subject: SubjectDetail) => {
      columns.push({
        headerName: subject.name,
        field: `subject_${subject.id}`,
        flex: 1,
        cellStyle: (params) => {
          const mark = params.value;
          if (mark === "Not Pass") {
            return { backgroundColor: 'red', color: 'white' };
          } else if (mark === "Pass but not in time") {
            return { backgroundColor: 'orange', color: 'black' };
          } else {
            return { backgroundColor: 'green', color: 'white' }; 
          } 
        }
      });
    });

    return columns;
  }

  generateStudentwithRows(): void {
    this.serviceSubject.refreshList().subscribe({
      next: (subjects: SubjectDetail[]) => {
        this.serviceStudent.refreshList().subscribe({
          next: (students: StudentDetail[]) => {
            this.rowData = [];
            const seenNames = new Set<string>();  
    
           
            const studentMap: { [key: string]: StudentDetail[] } = {};
    
            students.forEach((student) => {
              if (!studentMap[student.name]) {
                studentMap[student.name] = [];
              }
              studentMap[student.name].push(student);
            });
    
            Object.keys(studentMap).forEach((studentName) => {
              const studentEntries = studentMap[studentName];
              const row: any = {
                studentId: studentEntries[0].id,
                studentName: studentEntries[0].name,
              };
    
              const subjectsId = new Set<number>();
              let allGood = true; 
              let allExcellent = true; 
              let hasLateSubmission = false; 
              let hasMissingGrades = false;
    
              studentEntries.forEach((entry) => {
                const subjectField = `subject_${entry.subjectId}`;
                const subject = subjects.find(s => s.id === entry.subjectId);

                if (subject) {
                  const passDate = new Date(entry.passSubject);
                  const examDate = new Date(subject.dateExam);

                  if (entry.mark !== undefined && entry.mark !== null && !isNaN(Number(entry.mark))) {
                    if (passDate > examDate) {
                      row[subjectField] = "Pass but not in time";
                      hasLateSubmission = true;
                    } else {
                      row[subjectField] = String(entry.mark); 

                      if (entry.mark < 5) {
                        allExcellent = false;
                      }
                      if (entry.mark === 5) {
                        allGood = false;
                      }
                    }
                  } else {
                    row[subjectField] = "Not Pass"; 
                    allExcellent = false;
                    allGood = false;
                    hasMissingGrades = true;
                  }
                }

                subjectsId.add(entry.subjectId);
              });
    
        
              subjects.forEach((subject) => {
                if (!subjectsId.has(subject.id)) {
                  const subjectField = `subject_${subject.id}`;
                  row[subjectField] = "Not Pass";
                  allExcellent = false;
                  allGood = false;
                  hasMissingGrades = true;
                }
              });
    
              let scholarship = this.baseScholarship;
              
              if (hasMissingGrades || hasLateSubmission) {
                scholarship = 0;
              } else if (allExcellent) {
                scholarship += this.baseScholarship * 0.5; 
              } else if (!allGood) {
                scholarship += this.baseScholarship * 0.25; 
              }
              
              row['scholarship'] = scholarship.toFixed(2); 

              this.rowData.push(row);
            });
          },
          error: (err) => {
            console.error('Ошибка получения данных о студентах: ', err);
          }
        });
      },
      error: (err) => {
        console.error('Ошибка получения данных о предметах: ', err);
      }
    });
  }

  onSubmitScholarship(form: NgForm): void {
    if (form.value.scholarship) {
      this.baseScholarship = +form.value.scholarship; 
    } else {
      this.baseScholarship = 0; 
    }

    this.generateStudentwithRows();
  }
}
