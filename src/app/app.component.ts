import { Component } from '@angular/core';
import { QuestionsService } from './questions/services/questions.service';

import { Question } from './questions/model/question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  questions: any[] = [];
  idQ: number = 0;

  constructor(
    private _questionService: QuestionsService
  ) {
  }


  getQuestions() {
    this._questionService.getQuestions().subscribe(
      {
        next: (val) => {
          val.forEach((item: any, idx: number) => {
            this.questions[idx] = item;
          })
        }
      })
  }

  ngOnInit() {

    this.getQuestions();
  }
}
