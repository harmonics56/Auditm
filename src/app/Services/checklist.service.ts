import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Question } from '../CheckList/question';


@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  readonly APIUrl="http://localhost:8200/checklist";
  private _responses: Question[] = [];

  public get responses(): Question[] {
    return this._responses;
  }

  getQuestionsFromMS(type: string) : Observable<Question[]> {
    return this.http.post<Question[]>(this.APIUrl+'/AuditCheckListQuestions',{ 'auditType':type } );
    
  }

  respondYesToQuestion(questionId : number) : Observable<Question[]> {
    return this.http.get<Question[]>(`${this.APIUrl}/addResponse/${questionId}/YES`);    
  }

  respondNoToQuestion(questionId : number) : Observable<Question[]> {
    return this.http.get<Question[]>(`${this.APIUrl}/addResponse/${questionId}/NO`);    
  }

  healthCheck() : Observable<any> {
    return this.http.get<any>(this.APIUrl+'/health-check',{responseType:'text' as 'json'});
  }

  getResponse(responses: Question[]) : void {
    this._responses = responses;
    //this.sendResponse();
  }
  
  sendResponse() : Question[] {
    return this._responses;
  }
  
  validated(questions: Question[]) {
    for(let q of questions){
      if(q.response!="YES" && q.response!="NO"){
        return false;
      }
    }
    this._responses=questions;
    return true;
  }
  
  getAuditType() : string{
    return this._responses[0].auditType;
  }

  constructor(private http:HttpClient) { }

}
