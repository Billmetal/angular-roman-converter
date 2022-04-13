import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataShareService } from 'src/app/share/services/dataShare/data-share.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  btn1!: boolean;
  btn2!: boolean;

  constructor(private dataShare: DataShareService) { }

  ngOnInit(): void {
    this.btn1 = true;
    this.btn2 = false;
    this.dataShare.updateHomeData({
      title: "Para algarismo romano",
      placeholder: "Número",
      editType: "number",
      type: "roman"
    });
  }

  activeBtn(btn: string){
    if(btn === "btn1"){
      this.btn1 = true;
      this.btn2 = false;
      this.dataShare.updateHomeData({
        title: "Para algarismo romano",
        placeholder: "Número",
        editType: "number",
        type: "roman"
      });
    } else {
      this.btn1 = false;
      this.btn2 = true;
      this.dataShare.updateHomeData({
        title: "Para algarismo arábico",
        placeholder: "Algarismos Romano",
        editType: "text",
        type: "arabic"
      });
    }
  }

}
