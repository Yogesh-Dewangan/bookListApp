import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Register from './Components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Components/SignIn';
import CreateBook from './Components/CreateBook';
import BookList, { BookCard } from './Components/BookList';

function App() {
  return (
    <div className="container.fluid">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/createbook' element={<CreateBook/>}/>
          <Route path='/booklist' element={<BookList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
