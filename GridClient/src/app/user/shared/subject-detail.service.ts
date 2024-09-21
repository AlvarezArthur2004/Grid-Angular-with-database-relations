import { Injectable } from '@angular/core';
import { SubjectDetail } from './subject-detail.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectDetailService {

  baseURL = 'http://localhost:5027/api/Grid';
  list:SubjectDetail[] = [];
  formData : SubjectDetail = new SubjectDetail()
  formSubmitted: boolean = false;

  constructor(private http:HttpClient) { }

  postSubject(): Observable<any> {
    return this.http.post(this.baseURL + '/subjects', this.formData);
  }

  refreshList(): Observable<SubjectDetail[]> {
    return this.http.get<SubjectDetail[]>(this.baseURL + '/subjects');
  }

  resetForm(form:NgForm){
    form.form.reset()
    this.formData = new SubjectDetail()
    this.formSubmitted = false 
  }
}
