const storageKey = "vKey";
let taskList = [];

colorList = [
    '#ff9fae',
    '#fde995',
    '#a6e1c5',
    '#a7e0f6',
    '#e1a7fb'
];

class Task {
    constructor(t) {
            this.name = "";
            this.element;
            this.priorityElement;
            this.priority = 0;
            this.identity;
            this.delete;
            if(taskList.length == 0){
                this.identity = 0;
            }
            else{
                this.identity = taskList[taskList.length - 1].identity + 1;
            }
    }

    setElement(e) {
        this.element = e;
        this.element.addEventListener('input', ()=>{
            this.name = this.element.textContent;
            localStorage[storageKey] = JSON.stringify(taskList);
        });
        this.element.textContent = this.name;
        
    }

    setPriorityElement(e) {
        this.priorityElement = e;
        this.priorityElement.addEventListener('click', this.changePriority.bind(this));
        localStorage[storageKey] = JSON.stringify(taskList);
        this.setColor();
    }

    setColor(){
        this.priorityElement.closest('section').style.backgroundColor = colorList[this.priority];
    }

    changePriority(){
        if(this.priority == 4){
            this.priority = 0;
        }
        else{
            this.priority++;
        }
        this.setColor();
        console.log("current priority : " + this.priority);
        // console.log(this.priorityElement);
        localStorage[storageKey] = JSON.stringify(taskList);
    }

    deleteEle(){
        this.element.closest('section').remove();
        taskList.splice(taskList.indexOf(this), 1);
        localStorage[storageKey] = JSON.stringify(taskList);
    }
    
    setDelete(e){
        this.delete = e;
        e.addEventListener('click', this.deleteEle.bind(this));
    }

}

/**
 * #ff9fae	(255,159,174)
#fde995	(253,233,149)
#a6e1c5	(166,225,197)
#a7e0f6	(167,224,246)
#e1a7fb	(225,167,251)
 */



function retrieve(){
    if(localStorage[storageKey]){
        taskList = JSON.parse(localStorage[storageKey]);
    }
}

retrieve();