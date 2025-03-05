const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name: 'make dinner',
    dueDate : '2022-12-22'
},{
    name:'wash dishes',
    dueDate : '2022-12-26'
}];

renderTodoList();

function renderTodoList(){
    let todoListHTML = '';

    for (let i=0; i<todoList.length; i++){
        const todoObject = todoList[i];
        //const name = todoObject.name;
        //const dueDate = todoObject.dueDate;
        const {name,dueDate} = todoObject; //Destructuring
        const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button onclick="todoList.splice(${i},1); 
        renderTodoList();
        saveTostorage();" class="delete-todo-button">
        Delete</button>
        `;
        todoListHTML += html;
    }
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addTodo(){
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateElement = document.querySelector('.js-due-date-input');
    const dueDate = dateElement.value;

    todoList.push({
        //name:name,
        //dueDate:dueDate,
        name,
        dueDate
    });
    console.log(todoList);

    renderTodoList();
    saveTostorage();
    
    inputElement.value='';

}

function saveTostorage(){
    localStorage.setItem('todoList',JSON.stringify(todoList));
}