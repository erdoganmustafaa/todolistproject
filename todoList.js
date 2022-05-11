const form = document.querySelector("#todo-form"); // Form 
const firstCardBody = document.querySelectorAll(".card-body")[0]; // 1.CARD BODY
const secondCardBody = document.querySelectorAll(".card-body")[1]; //2.CARD BODY
const todoInput = document.querySelector("#todo"); // TODO DEĞERİNİN GİRİLDİĞİ YER
const todoList = document.querySelector(".list-group");
const searchTodo = document.querySelector("#search-todo");
const clearAllTodos = document.querySelector("#clear-todos")

eventListeners();

function eventListeners(){
    
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodos);
    secondCardBody.addEventListener("click",deleteTodo);
    searchTodo.addEventListener("keyup",filterTodos);
    clearAllTodos.addEventListener("click",clearAll);
}

function addTodoToUI(todoItem){ // Yeni Liste Elemanı oluşturma

    const listItem = document.createElement("li"); // Li elemanı oluştur.
    const link = document.createElement("a"); // a link elemanı oluştur.
    link.href="#";
    link.className="delete-item";
    link.innerHTML ="<i class = 'fa fa-remove'></i>";
    listItem.className="list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(todoItem)); // li ye addtoToUI dan gelen parametre değerini ekle.
    listItem.appendChild(link);// Li ye bu a linkini ekle.
    
    todoList.appendChild(listItem); // Ul olan todoList'e de bu li yi ekle.

}
function addTodo(e){

    const newTodo = todoInput.value.trim(); // Bir todo girin yazan yerde ki değeri aldık newTodo değişkenine atadık.

    if(newTodo ===""){
        showAlert("danger","Lütfen bir todo giriniz güzel kardeşim.");
    }
    else{
        addTodoToUI(newTodo);
        showAlert("success","Todo başarıyla eklendi :)");
        addTodoToStorage(newTodo);
    }

    e.preventDefault(); // Sayfanın default özelliklerini devre dışı bırakma.

}

function showAlert(type,message){
    
    const alert = document.createElement("div");
    alert.className= `mt-3 alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);

    window.setTimeout(function(){

        alert.remove();

    },2000);
} 

// LOCAL STORAGE BÖLÜMÜ 

function getTodosFromLocalStorage(){
    let todoItems;

    if(localStorage.getItem("mustafaTodos") === null){ // Eğer bu anahtar kelimede bir değer yoksa todoItems adlı değişkende bir dizi oluştur.
        todoItems=[];
    }
    else{
        todoItems = JSON.parse(localStorage.getItem("mustafaTodos"));
    }
    return todoItems;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromLocalStorage(); // todos değişkenine bir üstteki fonksiyonu eşitle.

    todos.push(newTodo); // Dizi olduğu için push metodu ile newTodo parametresini ekliyoruz.

    localStorage.setItem("mustafaTodos",JSON.stringify(todos)); //"mustafatodos" adlı key ile birlikte local storage'e ekliyoruz. Daha sonra En yukarda ki  addTodo kısmında bunu kullanıyoruz.

}
function loadAllTodos(){

    let localStorageTodos = getTodosFromLocalStorage();

    localStorageTodos.forEach(function(e){

        addTodoToUI(e);
    })
}
function deleteTodo(e){
   

    if(e.target.className ==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi");

    } 
}

function deleteTodoFromStorage(deletetodo){

    let xd = getTodosFromLocalStorage();

    xd.forEach(function(todo,index){
        if(todo===deletetodo){
            xd.splice(index,1);
        }
    })

    localStorage.setItem("mustafaTodos",JSON.stringify(xd))

}

function filterTodos(e){

    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){

        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            //Bulamadıysa

            listItem.setAttribute("style","display : none !important");
    
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    })

}

function clearAll(){
    if(confirm("Tüm Todoları Silmek İstediğinize Emin misiniz? ")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("mustafaTodos");
    }
}