const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const cardBody1 = document.querySelectorAll(".card-body")[0];
const cardBody2 = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");


let todos=[];

runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    cardBody2.addEventListener("click",removeTodo);
    clearButton.addEventListener("click",clearTodo);
    filterInput.addEventListener("keyup",filter);
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const inputText = addInput.value.trim();

    if(inputText==null || inputText==""){
        alert("Lütfen bir değer giriniz");
    }else{
        //Arayüze ekleme
        addTodoToUI(inputText);
        //storage ekleme
        addTodoToStorage(inputText);
        showAlert("success","Todo eklendi");
    }

    e.preventDefault(); 
}

function addTodoToUI(newTodo){

    const li = document.createElement("li");
    li.className ="list-group-item d-flex justify-content-between";
    li.textContent=newTodo;
    
    const a = document.createElement("a");
    a.href="#";
    a.className="delete-item";
    
    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

}

function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
    
}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos")==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){
    cardBody1.removeChild(cardBody1.lastChild);
    const div = document.createElement("div");
    div.className = "alert alert-"+type;
    div.textContent = message;
    cardBody1.appendChild(div);
}

function filter(e){
    const filterValue =e.target.value.toLowerCase().trim();
    const todolistesi = document.querySelectorAll(".list-group-item");

    if(todolistesi.length>0){
        todolistesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display : block");
            }else{
                todo.setAttribute("style","display : none !important");
            }
        })
    }else{
       showAlert("warning","Todo listesi zaten boş.");
    }
}
function removeTodo(e){
    if(e.target.className=="fa fa-remove"){
        removeTodoFromUI(e);
        removeTodoFromStorage(e);
        showAlert("success","Todo silindi");
    }
}

function removeTodoFromUI(e){
        const todo = e.target.parentElement.parentElement;
        todo.remove();
}

function removeTodoFromStorage(e){
   checkTodosFromStorage();
    const removeTodo =  e.target.parentElement.parentElement;
   todos.forEach(function(todo,index){
        if(todo == removeTodo.textContent){
            todos.splice(index,1);
        }     
        
   })
   localStorage.setItem("todos",JSON.stringify(todos));
}

function clearTodo(){
    const todolistesi = document.querySelectorAll(".list-group-item");

    if(todolistesi.length>0){
        todolistesi.forEach(function(todo){
            todo.remove();
        })
        localStorage.clear();
        showAlert("success","Todo listesi başarılı bir şekilde temizlendi");
    }else{
       showAlert("warning","Todo listesi zaten boş.");
    }
}