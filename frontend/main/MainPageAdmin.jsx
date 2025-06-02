import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "../product.js";

function MainPageAdmin() {

  const navigate = useNavigate();
  const user = useBookStore((state) => state.user);

  const goToUserPage = () => {
    navigate("/main");
  };

  const [newBook, setNewBook] = useState({
    name:"",
    price:"",
    author:"",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  const { createBook } = useBookStore();

  const handleAddBook = async () => {
    setError("");
    setSuccess("");

      const parsedBook = {
      ...newBook,
      price: Number(newBook.price),
    };

    const { success, message } = await createBook(parsedBook);
    if (!success) {
      setError(message || "Book creation failed.")
      console.log("Creation Fail at BookPage: " + message);
        } else {
            setSuccess(message || "Book created successfully");
            console.log("Creation Success at BookPage: " + message);
        }
        setNewBook({ name: "", price: "", author: "" });
  }
  
  return (
    <>
      <p>Create new Book</p>

      <input type="text" placeholder="Book Name" 
      value={newBook.name} onChange={(e) => 
      setNewBook({... newBook, name: e.target.value})}/>
      

      <input type="text" placeholder="Price" 
      value={newBook.price} onChange={(e) => 
      setNewBook({... newBook, price: e.target.value})}/>
      

      <input type="text" placeholder="Author" 
      value={newBook.author} onChange={(e) => 
      setNewBook({... newBook, author: e.target.value})}/>
      
      <button onClick={handleAddBook}>Add Book</button>
     
   
         
    {error && <p style={{ color: "red" }}>{error}</p>}
    {success && <p style={{ color: "green" }}>{success}</p>}
  
    <div>
      <h1>Admin Page</h1>
      <button onClick={goToUserPage}>Go to Main Page</button>
    </div>
    </>
  )
}

export default MainPageAdmin
