import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import * as BookUtils from '../BookUtils';
import Book from './Book';
import '../App.css';

class Search extends Component {
  state = {
      query: '',
      books: [],
      showModal: false
  }

  queryTimer = null;

  changeQuery = (value) => {
      // implement 250ms delay after query update before executing the searches
      // search
      clearTimeout(this.queryTimer);
      this.setState({query: value});
      this.queryTimer = setTimeout(this.updateSearch, 250);
  }

  updateSearch = () => {
      // No empty string searches
      if (this.state.query === '') {
          this.setState({error: false, books: []});
      } else {
          //search and process
          BooksAPI
              .search(this.state.query)
              .then(response => {
                  let newList  = [];
                  let newError = false;
                  if (response === undefined ||
                     (response.error && response.error !== 'empty query')){
                      newError = true;
                  } else if (response.length) {
                      newList = BookUtils.mergeShelfAndSearch(this.props.myBooks, response);
                      newList = BookUtils.sortAllBooks(newList);
                  }
                  this.setState({error: newError, books: newList});
              });
      }
  }

  UNSAFE_componentWillReceiveProps = (props) => {
      // set state after merge and sortAllBooks
      this.props = props;
      let newList = BookUtils.mergeShelfAndSearch(this.props.myBooks, this.state.books);
      newList = BookUtils.sortAllBooks(newList);
      this.setState({books: newList});
  }

  render(){
      return (
          <div className="search-books">
              <div className="search-books-bar">
                  <Link
                      aria-label="Return Home"
                      tabIndex="0"
                      className="close-search"
                      to='/'
                  >Close
                  </Link>
                  <div className="search-books-input-wrapper">
                      {/*
                        NOTES: The search from BooksAPI is limited to a
                        particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES
                        search by title or author. So, don't worry if
                        you don't find a specific author or title.
                        Every search is limited by search terms.
                        */}
                      <input
                          aria-label="enter search text"
                          tabIndex="0"
                          type="text"
                          placeholder="Search by title or author"
                          onChange={(e) => this.changeQuery(e.target.value)}
                          value={this.state.query.value}
                      />
                  </div>
              </div>
              <div className="search-books-results">
                  {this.state.error && (
                      <div className="search-error">
                        A problem occured with your search. Please try again.
                      </div>
                  )}
                  {!this.state.error && (
                      <span className="search-count">
                          {this.state.books.length}: books match your search
                      </span>
                  )}
                  <ol className="books-grid">
                      {this.state.books && this
                          .state
                          .books
                          .map(book => (
                              <li key={book.id}>
                                  <Book
                                      book={book}
                                      onChangeShelf={this.props.onChangeShelf}
                                  />
                              </li>
                          ))}
                  </ol>
              </div>
          </div>
      );
  }
}
export default Search;
