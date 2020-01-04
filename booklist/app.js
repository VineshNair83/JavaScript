//This is using ES5

//Book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


//UI constructor
function UI(){}


//Add a book
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `
  list.appendChild(row)
}


//Delete a book
UI.prototype.deleteBook = function(target){
  if(target.className == 'delete'){
    target.parentElement.parentElement.remove();
  }
}


//Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


//Show alert
UI.prototype.showAlert = function(message, className){
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  //create a div
  const div = document.createElement('div');
  //Add a class to the div
  div.className = `alert ${className}`;
  //Add a text
  div.appendChild(document.createTextNode(message));

  //Insert the text into the container before the div
  container.insertBefore(div,form);

  //remove alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000)
}


UI.prototype.getLocalStorage = function(){
  let books;
  if(localStorage.getItem('books') == null){
    books = []
  }else{
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}

UI.prototype.displayLocalStorage = function(){
  const ui = new UI();
  const books = ui.getLocalStorage();

  books.forEach(function(book){
    const ui = new UI();
    ui.addBookToList(book);
  });

}

UI.prototype.addLocalStorage = function(book){
  const ui = new UI();
  const books = ui.getLocalStorage();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

UI.prototype.removeLocalStorage = function(isbn){
  const ui = new UI();
  const books = ui.getLocalStorage();

  books.forEach(function(book,index){
    if(book.isbn === isbn){
      books.splice(index,1)
    }
  });
  localStorage.setItem('books', JSON.stringify(books));
}


//DOM load event
const ui = new UI();
document.addEventListener('DOMContentLoaded', ui.displayLocalStorage);


//Event Listener for adding books
document.getElementById('book-form').addEventListener('submit', function(e){
  //Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
 
  //Instantiate a book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  if(title == '' | author == '' | isbn == ''){
    //Error alert
    ui.showAlert("Please fill in all fields", "error");
  }else{
    //Add book to list
    ui.addBookToList(book);
    //Add to local storage
    ui.addLocalStorage(book);
    ui.showAlert("Book Added!","success");
  }

  //Clear fields
  ui.clearFields();

  e.preventDefault();
});


//Event listener for deleting books
document.getElementById('book-list').addEventListener('click', function(e){
  
  //Instantiate UI
  const ui = new UI();

  //Delete book
  ui.deleteBook(e.target);

  //Remove Local storage
  ui.removeLocalStorage(e.target.parentElement.previousElementSibling.textContent);

  //Show alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
})