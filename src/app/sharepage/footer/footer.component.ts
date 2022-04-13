import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private githubLink: string = "https://github.com/Billmetal";
  private linkedinLink: string = "https://linkedin.com/in/willian-t-kuca";
  private email: string = "mailto:billmetal9@gmail.com";

  constructor() { }

  ngOnInit(): void {
  }

  linkToGithub(){
    window.open(this.githubLink, "_blank");
  }

  linkToLinkedin(){
    window.open(this.linkedinLink, "_blank");
  }

  linkToEmailSender(){
    window.open(this.email, "_blank");
  }

}
