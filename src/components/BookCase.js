import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class BookCase extends Component {
  state = {}
  componentDidMount = () => {
      // update the list of all BookShelf
      this
          .props
          .onRefreshAllBooks();
  }

  updateShelves = () => {
      //update state of each indv shelf to get assigned book(s)
      const newCurrent = {
          name: 'Currently Reading',
          books: this
              .props
              .books
              .filter(book => book.shelf === 'currentlyReading')
      };
      const newWant = {
          name: 'Want to Read',
          books: this
              .props
              .books
              .filter(book => book.shelf === 'wantToRead')
      };
      const newRead = {
          name: 'Read',
          books: this
              .props
              .books
              .filter(book => book.shelf === 'read')
      };

      return ([newCurrent, newWant, newRead]);
  }
  render(){
      let shelves = [];
      if (this.props.books && this.props.books.length)
          shelves = this.updateShelves();

      return (
          <div className="app">
              <div className="list-books">
                  <div className="list-books-title">
                      <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                      <div>
                          <div>
                              {shelves && shelves.map((shelf) =>(
                                  <BookShelf key={shelf.name} shelf={shelf}
                                      onChangeShelf={this.props.onChangeShelf}
                                  />)
                              )}
                          </div>
                      </div>
                  </div>
                  <div className="open-search">
                      <a onClick={() =>
                          this.setState({showSearchPage: true})}
                      >Add a book</a>
                  </div>
              </div>
          </div>
      )
  }

}

export default BookCase
