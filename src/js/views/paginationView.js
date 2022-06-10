import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;

    //On Page 1
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(1);
    }

    //On last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(-1);
    }

    //Other page
    if (curPage < numPages) {
      return `${this._generateMarkupButton(1)} ${this._generateMarkupButton(
        -1
      )}`;
    }

    //Only one page
    return ``;
  }

  _generateMarkupButton(offset) {
    return `
        <button data-goto="${
          this._data.page + offset
        }" class="btn--inline pagination__btn--${
      offset === -1 ? 'prev' : 'next'
    }">
            <span>Page ${this._data.page + offset}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-${
      offset === -1 ? 'left' : 'right'
    }"></use>
            </svg>
        </button>
      `;
  }
}

export default new PaginationView();
