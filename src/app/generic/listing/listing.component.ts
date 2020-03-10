import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  @Input() aProperties: any[];
  @Input() aValues:any[];
  @Input() aActions: any[];
  @Input() aActionsNav: any[];
  @Input() oService: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateGeneric(arg1, arg2){
    this.router.navigate([arg1, arg2]);
  }

  delete(id: number, service: any) {
    service.delete(id);
  }

  navigateTop(args: any[]){
    this.router.navigate(args);
  }

  exportPDF(){

  };

  exportEXCEL(){

  };
}
