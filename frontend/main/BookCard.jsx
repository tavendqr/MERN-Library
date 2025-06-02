
import "./BookCard.css";

const BookCard = ({book}) => {
  
  return (
    <div className="book-card">
      <div>
      <div className="book-content">
        <h3 className="book-name">{book.name}</h3>
        <p className="book-price">${book.price}</p>

        
          <button className="edit-btn">Edit</button>
        </div>
      </div>
   </div>
  )
}

export default BookCard