
export class Pager {
  currentPage: number;
  totalPages: number;
  pages: Array<number>;
  constructor(size: number) {
    this.totalPages = size;
    this.setPage(1);
  }
  setPage(page: number) {
    this.currentPage = page;
    this.setPages();
  }

  setPages() {
    let startPage;
    let endPage;
    if (this.currentPage < 6 || this.totalPages <= 9) {
      startPage = 1;
      endPage = this.totalPages > 9 ? 9 : this.totalPages;
    } else if ((this.currentPage + 5) > this.totalPages) {
      startPage = this.totalPages - 8;
      endPage = this.totalPages;
    } else {
      startPage = this.currentPage - 4;
      endPage = this.currentPage + 4;
    }
    this.pages = Array.from(new Array(endPage + 1 - startPage), (value, index) => index + startPage);
  }


  isLast(): boolean {
    if (this.currentPage === this.totalPages) {return true; }
    return false;
  }

  isFirst(): boolean {
    if (this.currentPage === 1) {return true; }
    return false;
  }

  hasNext(): boolean {
    return !this.isLast();
  }

  hasPrevious(): boolean {
    return !this.isFirst();
  }

}
