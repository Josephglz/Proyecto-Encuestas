import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getQuestions(): Observable<any> {
    return this._httpClient.get<any>('/assets/response_1684090105060.json')
    .pipe(
      map(response => response.body))
  }

  getCurrentData() {
    var cData: any = {};
    cData = localStorage.getItem('data');
    if(cData == null) {
      localStorage.setItem('data', JSON.stringify({
        "idViewQ": 1,
        "idAnsweredQ": 1,
        "questions": []
      }))
      cData = localStorage.getItem('data');
    }
    return JSON.parse(cData);
  }

  updateStep(data: any, value:number) {
    data.idViewQ = value;
    localStorage.setItem('data', JSON.stringify(data));
  }

  updateQuestion(data: any, value:number) {
    data.idAnsweredQ = value;
    localStorage.setItem('data', JSON.stringify(data));
  }

  checkIfExist(data: any, idQ: number) {
    for(var i = 0; i < data.length; i++) {
      if(data[i].consecutivo == idQ) {
        return i;
      }
    }
    return -1;
  }

  updateAnsweredQuestion(data: any, value: any) {
    if(data.questions.length == 0) {
      data.questions.push(value)
    } else {
      var idx = this.checkIfExist(data.questions, value.consecutivo)
      if(idx != -1) {
        data.questions[idx] = value;
      } else {
        data.questions.push(value);
      }
    }

    localStorage.setItem('data', JSON.stringify(data))
  }
}
