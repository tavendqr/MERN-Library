import { useBookStore} from "../product.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BookCard from "./BookCard";
import './MainPage.css';

const MainPage = () => {

    const navigate = useNavigate();
    const user = useBookStore((state) => state.user);

  const goToAdminPage = () => {
    if (user?.role === "admin") {
      navigate("/main-admin");
    } else {
      alert("Access denied: Admins only");
    }
  };

    const  { fetchBooks, books } = useBookStore();

    useEffect(() => {
        fetchBooks();
    }, []);
    //console.log("Books", books)


    return (
        <>
        <h1>Book Store</h1>
          <div className="alignment">
            {books.map((book) => (
                <BookCard book={book}/>
            ))

            }

            {books.kength === 0 && (
                <p>No Books Available</p>
            )}

             <div>
            
            {user?.role === "admin" && (
                <button onClick={goToAdminPage}>Go to Admin Page</button>
            )}
            </div>

            </div>
        
        </>
    )
}


export default MainPage;