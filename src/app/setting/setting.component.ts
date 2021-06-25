import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css', '../../assets/bootstrap4.5.2/css/bootstrap.css']
})
export class SettingComponent implements OnInit {  
  public players: any[] = [{
    name: 'Player1',
    money: 0,
    banker: false,
    icon: this.getRandomInt(12)
  },{
    name: 'Player2',
    money: 0,
    banker: false,
    icon: this.getRandomInt(12)
  }];

  settingForm: FormGroup;

  constructor(public service: AppService, public formBuilder: FormBuilder) {
    this.settingForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
    var temp : Player[];
    if(localStorage.getItem("player") && localStorage.getItem("player") != "null"){
      temp = <Player[]>(JSON.parse(localStorage.getItem("player")));
      console.log("Player:", temp);
      this.players = [];
      temp.forEach(e=>{
        this.players.push({
          name: e.name,
          money: 0,
          banker: false,
          icon: this.getRandomInt(12)
        });
      })
      //this.players = temp;
    }
  }

  addPlayer(){
    this.players.push({name:'Player' + (this.players.length + 1), money: 0, banker: false, icon: this.getRandomInt(12)});
  }

  removePlayer(i: number){
    if(this.players.length > 2){
      this.players.splice(i,1);
    }
  }

  startGame(){
    this.players.forEach(p => {
      if(p.name == "")
        p.name = "Unknown"
    });
    localStorage.setItem("player", JSON.stringify(this.players));
    this.service.players = this.players;
    this.service.router.navigate(["/main"]);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}

export interface Player{
  name: string;
  money: number;
  banker: boolean;
}