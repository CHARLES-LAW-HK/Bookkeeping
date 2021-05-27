import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css', '../../assets/bootstrap4.5.2/css/bootstrap.css']
})
export class SettingComponent implements OnInit {  
  public peoples: any[] = [{
    name: '',
    money: 0
  }];

  settingForm: FormGroup;

  constructor(public service: AppService, public formBuilder: FormBuilder) {
    this.settingForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
  }

  addPeople(){
    this.peoples.push({name:'', money: 0});
  }

  removePeople(i: number){
    if(this.peoples.length == 1){
      this.peoples[i].name = '';
      this.peoples[i].money = 0;
    }
    else{
      this.peoples.splice(i,1);
    }
  }

  startGame(){
    this.service.peoples = this.peoples;
    this.service.router.navigate(["/main"]);
  }
}
