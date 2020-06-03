import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pager} from '../../../model/pager';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {

  @Input() pageSize: number;
  // tslint:disable-next-line:ban-types
  @Input() size: String;
  @Input() next = 'Suivant';
  @Input() previous = 'Précédent';
  @Input() first = 'Premier';
  @Input() last = 'Dernier';
  @Output()
  pageChanged = new EventEmitter<number>();
  pager: Pager;

  ngOnInit() {
    this.pageSize = parseInt(this.pageSize.toString(), 10);
    this.pager = new Pager(this.pageSize);
  }

  setPage(page: number) {
    if (page !== this.pager.currentPage) {
      this.pager.setPage(page);
      this.pageChanged.emit(page);
    }
  }

  loadClasses() {
    return {
      'pagination-lg': this.size === 'big',
      'pagination-sm': this.size === 'small'
    } ;
  }
}
