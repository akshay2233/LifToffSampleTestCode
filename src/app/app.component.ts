import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import *  as  data from './data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Liftoffcodingtest';
  crickTestForm: FormGroup;
  isSubmitButtonClick = false;
  isSubmitAnswer = false;
  result: any = {};

  public barChartOptions: ChartOptions = {
    responsive: true,

  };
  public barChartLabels: Label[] = ['Correct', 'InCorrect'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: []
    },

  ];




  lstDetails: any = []

  constructor(private fb: FormBuilder, private http: HttpClient) { }


  async ngOnInit() {

    if (data['default'] && data['default'].length > 0) {
      this.lstDetails = data['default'];
    } else {
      this.lstDetails = [];
    }
    this.initialiseForm();
  }

  initialiseForm() {
    var reqform: any = {};
    this.lstDetails.filter((r: any) => {
      reqform[r.modelName] = ['', Validators.required];

    })
    this.crickTestForm = this.fb.group(reqform)
  }


  onSubmit() {
    this.isSubmitAnswer = false;
    this.isSubmitButtonClick = true;
    if (this.crickTestForm.valid) {
      this.isSubmitAnswer = true;
      this.crickTestForm.disable();
      this.fnValidateResult(this.crickTestForm.value)
    }
  }

  fnClearForm() {
    this.isSubmitButtonClick = false;
    this.isSubmitAnswer = false;
    this.crickTestForm.reset();
  }

  fnNewTest() {
    this.isSubmitAnswer = false;
    this.crickTestForm.enable();
    this.crickTestForm.reset();
    this.isSubmitButtonClick = false;
  }


  fnValidateResult(vales) {
    var correctanswer: any = [];
    var wrongaswer: any = [];
    for (var key in vales) {
      if (vales.hasOwnProperty(key)) {
        var reqData = this.lstDetails.filter(r => r.modelName == key)[0];
        if (reqData.correctAnswer == vales[key]) {
          correctanswer.push(reqData)
        } else {
          wrongaswer.push(reqData)
        }

      }
    }

    this.result.total = this.lstDetails.length;
    this.result.correct = correctanswer.length;
    this.result.wrong = wrongaswer.length;
    this.barChartData[0].data = [correctanswer.length, wrongaswer.length];

  }


}
