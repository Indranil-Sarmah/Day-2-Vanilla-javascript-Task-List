const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all the eventListerners
loadEventListeners();

function loadEventListeners(){

    form.addEventListener('submit',addTask);
    
    //remove
    taskList.addEventListener('click',removeTask);

    //remove all
    clearBtn.addEventListener('click',clearAll);

    //filter task
    filter.addEventListener('keyup',filterList);

}

function addTask(e){

    if(taskInput.value === '')
    {
        alert('Add a task');
    }
    const li = document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);

    //console.log(li);

    taskList.appendChild(li);

    //store in local storage
    storeTask(taskInput.value);

    //clear input 
    taskInput.value=''; 
    
    e.preventDefault();
}

function storeTask(task){

    let tasks ;
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else
    {
        tasks =  JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){

        e.target.parentElement.parentElement.remove();

    }

    e.preventDefault();
}

function clearAll(e){

    taskList.innerHTML='';

    e.preventDefault();

}

//filter tasks
function filterList(e)
{
    const text = e.target.value.toLowerCase();

   

    //querySelectorC returns NodeList
    document.querySelectorAll('.collection-item').forEach(function(task){

        const item= task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display ='block';
        }
        else
        {
            task.style.display='none';
        }

    });
    
    e.preventDefault();
}