import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { StudentDetail } from '../shared/student-detail.model';
import { StudentDetailService } from '../shared/student-detail.service';
import { SubjectDetail } from '../shared/subject-detail.model';
import { SubjectDetailService } from '../shared/subject-detail.service';
import { GridApi } from 'ag-grid-community';
import { GridoutputsubjectComponent } from '../output/gridoutputsubject/gridoutputsubject.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,GridoutputsubjectComponent],
  templateUrl: './grid.component.html',
  styles: ``
})
export class GridComponent {
  
  @Output() subjectCreated = new EventEmitter<void>();
  @Output() studentCreated = new EventEmitter<void>();

  constructor(
    public service_student : StudentDetailService,
    public service_subject : SubjectDetailService) { }
    
    //
    //Student
    //



    onSubmitStudent(form:NgForm){
      this.service_student.formSubmitted = true

      if (form.valid){
        if (this.service_student.formData.id == 0)
        {
          this.insertRecordStudent(form)
        }
      }

    }

    insertRecordStudent(form:NgForm){
      this.service_student.postStudent().subscribe
      ({
        next: res =>{
          this.service_student.list = res as  StudentDetail[]
          this.service_student.resetForm(form)
      
          this.studentCreated.emit();
        },
        error: err => { console.log(err) }
      })
    }

    //
    //Subject
    //

    onSubmitSubject(form:NgForm){
      this.service_subject.formSubmitted = true

      if (form.valid){
        if (this.service_subject.formData.id == 0)
          this.insertRecordSubject(form)
      }
    }

    insertRecordSubject(form:NgForm){
      this.service_subject.postSubject().subscribe
      ({
        next: res =>{
          this.service_subject.list = res as SubjectDetail[]
          this.service_subject.resetForm(form)

          this.subjectCreated.emit();
        },
        error: err => { console.log(err) }
      })
    }

}
