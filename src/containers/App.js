import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as booksActions from '../action/books';
import App from '../components/App';
import books from "../redusers/books";
import orderBy from 'lodash/orderBy';
import { Item } from "semantic-ui-react";

const sortBy = (books, filterBy) => {

   switch (filterBy) {
      case 'all':
         return books;
      case 'price_high':
         return orderBy(books, 'price', 'desc');

      case 'price_low':
         return orderBy(books, 'price', 'asc');
      case 'price_high':
         return orderBy(books, 'author', 'asc');



      default:
         return books;
   }
}

const filterBooks = (books, searchQuery) =>
   books.filter(
      o => o.title.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0 ||
         o.author.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
   );

const searchBooks = (books, filterBy, searchQuery) => {
   return sortBy(filterBooks(books, searchQuery), filterBy);
}

const mapStateToProps = ({ books, filter }) => ({
   books: books.items && searchBooks(books.items, filter.filterBy, filter.searchQuery),
   isReady: books.isReady
})
const mapDispatchToProps = dispatch => ({
   ...bindActionCreators(booksActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
