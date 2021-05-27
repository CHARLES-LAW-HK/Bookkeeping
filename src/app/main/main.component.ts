import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', '../../assets/bootstrap4.5.2/css/bootstrap.css']
})
export class MainComponent implements OnInit {
  public peoples = this.service.peoples;
  mainForm: FormGroup;
  bet: number = 1;
  sum: number = 0;

  constructor(public service: AppService, public formBuilder: FormBuilder) {
    this.mainForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
    if(this.service.peoples == null || this.service.peoples.length == 0){
      this.service.router.navigate(["/setting"]);
      // this.peoples = [{
      //   name: '小明',
      //   money: 0
      // },
      // {
      //   name: '大明',
      //   money: 0
      // }]
    }
    this.peoples.forEach(m => {
      this.sum += m.money;
    });
  }

  checkSum(){
    this.sum = 0;
    this.peoples.forEach(m => {
      this.sum += m.money;
    });
  }

  addMoney(i: number){
    this.peoples[i].money += this.bet;
    this.checkSum();
  }

  minusMoney(i: number){
    this.peoples[i].money -= this.bet;
    this.checkSum();
  }
}
