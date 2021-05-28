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
    money: 0
  },{
    name: 'Player2',
    money: 0
  }];

  settingForm: FormGroup;

  constructor(public service: AppService, public formBuilder: FormBuilder) {
    this.settingForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
  }

  addPlayer(){
    this.players.push({name:'Player' + (this.players.length + 1), money: 0});
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
    this.service.players = this.players;
    this.service.router.navigate(["/main"]);
  }
}
