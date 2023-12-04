let t1;

function createTask(){
    let task_wrapper = document.createElement('section');
    let task = document.createElement('div');
    /** 
     * <span class="material-symbols-outlined">
        kid_star
        </span>
    */

    let bot = document.createElement('div');

    let span = document.createElement('span');
    // span.className = "material-symbols-outlined";
    span.innerHTML = '<span class="material-symbols-outlined">keyboard_double_arrow_up</span>';
    span.id = 'star';
    // task.appendChild(span);
    let del = document.createElement('span');
    del.className = "material-symbols-outlined";
    del.textContent = 'delete';

    let pel = document.createElement('span');
    pel.textContent = '1';
    bot.appendChild(span);
    bot.appendChild(del);
    // bot.appendChild(pel);

    span.className = 'priority';
    task.className = 'task';
    task.contentEditable = true;
    task_wrapper.appendChild(task);
    task_wrapper.appendChild(bot);
    TASK_CONTAINER.appendChild(task_wrapper);

    
    t = new Task();
    taskList.push(t);
    localStorage[storageKey] = JSON.stringify(taskList);
    t.setElement(task);
    t.setPriorityElement(span);
    t.setDelete(del);
    
}

PLUS.addEventListener('click', ()=>{createTask();});

function createTaskWithObj(obj){
    let task_wrapper = document.createElement('section');
    let task = document.createElement('div');

    let bot = document.createElement('div');
    let span = document.createElement('span');
    span.innerHTML = '<span class="material-symbols-outlined">keyboard_double_arrow_up</span>';
    span.id = 'star';

    let del = document.createElement('span');
    del.className = "material-symbols-outlined";
    del.textContent = 'delete';

    bot.appendChild(span);
    bot.appendChild(del);

    span.className = 'priority';
    task.className = 'task';
    task.contentEditable = true;
    task_wrapper.appendChild(task);
    task_wrapper.appendChild(bot);
    TASK_CONTAINER.appendChild(task_wrapper);

    let t = new Task();
    t.name = obj.name;
    t.setDelete(del);
    t.setElement(task);
    t.setPriorityElement(span);
    t.priority = obj.priority;
    t.setColor();
    taskList[taskList.indexOf(obj)] = t;
}

function render(){
    TASK_CONTAINER.innerHTML = '';
    taskList.forEach((ele)=>{
        createTaskWithObj(ele);
    }
    );
}

let currentFilter = 5;

function filterTask(){
    // console.log(currentFilter);
    TASK_CONTAINER.innerHTML = '';
    currentFilter--;
    console.log("current filter num : " + currentFilter);
    if(currentFilter == -1){
        currentFilter = 5;
        render();
        return;
    }
    // if(currentFilter == 5){
    let req = taskList.filter((ele)=>{
        return ele.priority == currentFilter%6;
    });
    console.log(req);
    req.forEach((ele)=>{
        createTaskWithObj(ele);
    });
    

}

document.querySelector('.bottom-nav :nth-child(2)').addEventListener('click', filterTask);
render();