import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentDetail } from './student-detail.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailService {

  baseURL = 'http://localhost:5027/api/Grid';
  list: StudentDetail[] = [];
  formData: StudentDetail = new StudentDetail();
  formSubmitted: boolean = false;

  constructor(private http: HttpClient) { }

  postStudent(): Observable<any> {
    return this.http.post(this.baseURL + '/students', this.formData);
  }

  refreshList(): Observable<StudentDetail[]> {
    return this.http.get<StudentDetail[]>(this.baseURL + '/students');
  }

  resetForm(form:NgForm){
    form.form.reset()
    this.formData = new StudentDetail()
    this.formSubmitted = false 
  }

}
