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
  previousGame : any[] = [];
  mainForm: FormGroup;
  bet: number = 1;
  sum: number = 0;
  bankerCount: number = 0;
  isAutoChangeBanker: boolean = false;

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
      //this.previousGame = this.players;
      for(var i = 0; i < this.players.length; i++){
        this.previousGame.push({
          name: this.players[i].name,
          money: this.players[i].money,
          banker: this.players[i].banker
        })
      }
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
    this.players.forEach(m => {
      if(m.banker){
        m.money -= this.bet;
      }
    });
    this.checkSum();
  }

  minusMoney(i: number){
    this.players[i].money -= this.bet;
    this.players.forEach(m => {
      if(m.banker){
        m.money += this.bet;
      }
    });
    this.checkSum();
  }

  beBanker(i: number){
    this.bankerCount = 0;
    if(this.players[i].banker){
      this.players[i].banker = false;
    }
    else{
      this.players.forEach(m => {
        m.banker = false;
      });
      this.players[i].banker = true;
    }
  }

  endRound(){
    this.bankerCount++;
    this.previousGame = [];
    for(var i = 0; i < this.players.length; i++){
      this.previousGame.push({
        name: this.players[i].name,
        money: this.players[i].money,
        banker: this.players[i].banker
      })
    }
    if(this.bankerCount >= 3 && this.isAutoChangeBanker){
      for(var i = 0; i < this.players.length; i++){
        if(this.players[i].banker){
          if(i+1 < this.players.length){
            this.beBanker(i + 1);
          }
          else{
            this.beBanker(0);
          }
          break;
        }
      }
    }
  }

  autoChangeBanker(){
    this.isAutoChangeBanker = !this.isAutoChangeBanker;
  }

  calculate(i: number){
    return this.players[i].money - this.previousGame[i].money;
  }

  back(){
    this.service.router.navigate(["/setting"]);
  }
}
