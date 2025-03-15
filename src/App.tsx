import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Cards from './components/Cards'
import Header from './components/Header'
import PaginationRanges from './components/Pagination'
import SearchBox from './components/Searchbox'

export default function App() {
  return (
    <>
      <div className="header-container">
        <Header />
      </div>
      <main className="main-container">
        <div className="content-container">
          <SearchBox />
          <div className="cards-container">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
          </div>
          <div className="pagination-container">
            <PaginationRanges />
          </div>
        </div>
      </main>
    </>
  )
}