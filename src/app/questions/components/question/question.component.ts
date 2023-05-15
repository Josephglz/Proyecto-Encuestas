import { Component, Input } from '@angular/core';

import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question: any;
  idQuestion: number = 1;
  questionStep: number = 1;
  questionAnswer: number = 0;
  qData: any;

  constructor(
    private _questionService: QuestionsService
  ) {}

  /**
   * Function to change current question
   * @param dir - 1: Next, 2: Previous
   */
  checkStep(dir:number) {
    if(dir == 1) {
      if((this.questionStep + 1) <= this.idQuestion) {
        this.questionStep = (this.questionStep + 1);
      }
    } else {
      if((this.questionStep - 1) <= this.idQuestion && this.questionStep > 1) {
        this.questionStep = (this.questionStep - 1);
      }
    }
    console.log("Pregunta: " + this.idQuestion);
    console.log("Paso: " + this.questionStep);
    // localStorage.setItem('idViewQ', JSON.stringify(this.questionStep));
    this._questionService.updateStep(this.qData, this.questionStep);
  }

  /**
   * Answer a question
   */
  checkQuestion(idActual: number) {
    if(idActual > this.idQuestion) {
      this.idQuestion = idActual
      this._questionService.updateQuestion(this.qData, this.idQuestion);
    }
    
    this._questionService.updateAnsweredQuestion(this.qData, {
      "consecutivo": idActual,
      "respuesta": this.questionAnswer
    })
  }

  ngOnInit() {
    this.qData = this._questionService.getCurrentData();
    this.idQuestion = this.qData.idAnsweredQ;
    this.questionStep = this.idQuestion;
  }
}
