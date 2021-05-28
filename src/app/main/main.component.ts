import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', '../../assets/bootstrap4.5.2/css/bootstrap.css']
})
export class MainComponent implements OnInit {
  public players = this.service.players;
  mainForm: FormGroup;
  bet: number = 1;
  sum: number = 0;

  constructor(public service: AppService, public formBuilder: FormBuilder) {
    this.mainForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
    if(this.service.players == null || this.service.players.length == 0){
      this.service.router.navigate(["/setting"]);
      // this.players = [{
      //   name: '小明',
      //   money: 0
      // },
      // {
      //   name: '大明',
      //   money: 0
      // }]
    }
    else{
      this.players.forEach(m => {
        this.sum += m.money;
      });
    }
  }

  checkSum(){
    this.sum = 0;
    this.players.forEach(m => {
      this.sum += m.money;
    });
  }

  addMoney(i: number){
    this.players[i].money += this.bet;
    this.checkSum();
  }

  minusMoney(i: number){
    this.players[i].money -= this.bet;
    this.checkSum();
  }

  back(){
    this.service.router.navigate(["/setting"]);
  }
}
