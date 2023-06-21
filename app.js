// ====================SELECTORS===================
const todoInput = document.querySelector(".todoInput")
const todoButton = document.querySelector(".todoButton")
const todoList = document.querySelector(".todoList")
const filterOption = document.querySelector(".filterTodo")
// ====================SELECTORS===================



// ============EVENT LISTENERS=================
document.addEventListener("DOMContentLoaded", retrieveToDoFromStorage)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteList)
filterOption.addEventListener("click", filterTodo)
// ============EVENT LISTENERS=================



// ===================FUNCTIONS========================
function addTodo(event) {
     event.preventDefault() // PREVENTS FROM SUBMITTING
    console.log("Hello!")

    // CREATES Todo Section
    const todoSect = document.createElement("section")
    todoSect.classList.add("todo")

    // CREATES <li>
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todoItem")
    todoSect.appendChild(newTodo)
    
    // Adds todo into storage
    saveLocalTodo(todoInput.value)

    // CHECK BUTTON
    const completedButton = document.createElement("button")
    completedButton.innerHTML = `<li class="fas fa-check"></li>` // MIGHT CAUSE ERROR, CHECK BACK!
    completedButton.classList.add("completeButton")
    todoSect.appendChild(completedButton)

    // TRASH BUTTON
    const trashdButton = document.createElement("button")
    trashdButton.innerHTML = `<li class="fas fa-trash"></li>` // MIGHT CAUSE ERROR, CHECK BACK!
    trashdButton.classList.add("trashButton")
    todoSect.appendChild(trashdButton)

    // APPENDING TO LIST
    todoList.appendChild(todoSect)

    // CLEAR INPUT AFTER ADDING TO LIST
    todoInput.value = ""
}

function deleteList(event) {
    const item = event.target

    // DELETE 
    if (item.classList[0] === "trashButton") {
        const todo = item.parentElement
        todo.classList.add("fall")
        clearLocalStorage(todo)
        todo.addEventListener("transitionend", function() { // LETS ANIMATION FINISH BEFORE COMPLETELY REMOVING ITEM FROM LIST
            todo.remove()
        })
    }

    // COMPLETE LIST
    if (item.classList[0] === "completeButton") {
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }
}


// CATEGORIZES ITEM INTO ALL, COMPLETED, INCOMPLETE
function filterTodo(event) { 
    const todos = [...todoList.children]
    todos.forEach(function(todo) {
        switch (event.target.value) { // It obtains the value from the DOM under <option> tag i.e. All, Completed, Incomplete"
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
        }
    })
}


// EXTRA ACTIVITY BELOW:

function saveLocalTodo(todo) { // Parameter obtained from above
    // Checks if there's something saved in the local starage
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = [] //If there's nothing in the storage, set todos into empty array
    } else {
        todos = JSON.parse(localStorage.getItem("todos")) // puts the storage data into todos
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos)) // Pushing it back to storage
}

function retrieveToDoFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
    // CREATES Todo Section
      const todoSect = document.createElement("sect");
      todoSect.classList.add("todo");

    // CREATES <li>
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todoItem");
      todoSect.appendChild(newTodo);
      todoInput.value = "";

    // CHECK BUTTON
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("completeButton");
      todoSect.appendChild(completedButton);

    // TRASH BUTTON
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trashButton");
      todoSect.appendChild(trashButton);


    // APPENDING TO LIST
      todoList.appendChild(todoSect);
    });
  }

  function clearLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
  }

// ===================FUNCTIONS========================