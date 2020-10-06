import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  private RESOURCES_URL: string[] = [
    'http://ccgg-gitbook.s3-website-us-east-1.amazonaws.com/',
  ];


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getSrc(res: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(res);
  }
}
