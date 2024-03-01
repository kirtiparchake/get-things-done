const input = document.querySelector('.inputname')
const addtbn = document.querySelector('.add')
const editbtn = document.querySelector('.edit')
const description = document.querySelector('.description')
const taskconatiner = document.querySelector('.tasks')

let taskarray = [];
taskarray = JSON.parse(localStorage.getItem('mytasks')) || [];

function addtask() {
    if (input.value !== '') {
        taskarray.push({ name: input.value, description: description.value, checkbox : false })
        displayarrayvalue()
        input.value = "";
        description.value = '';
    }

}
function displayarrayvalue() {
    setlocalstorage()
    let htmlblock = '';
    taskarray.forEach(function (value, index) {
        htmlblock = htmlblock + `<div class="task">
        <div class="things">
        <input ${value.checked? 'checked': ''} type="checkbox" name="checkbox" onchange="checkboxclicked(this, ${index})">
        <div class="values">
          <div>${value.name}</div>
     
          <div>${value.description}</div>
         </div>
    </div>
    <div class="img">
    
    <img src="https://icon-library.com/images/delete-icon/delete-icon-0.jpg" alt="" onclick="deletetask(${index})">
    <img src="https://icon-library.com/images/edit-icon-free/edit-icon-free-29.jpg" alt="" onclick="edittask(${index})">
    </div>

</div>`
    })
    taskconatiner.innerHTML = htmlblock;
}

displayarrayvalue();
let currentindex = "";

function edittask(index) {
    input.value = taskarray[index].name
    description.value = taskarray[index].description
    editbtn.style.display = "block"
    addtbn.style.display = "none"
    currentindex = index;
}
function edittaskvalue() {
    taskarray[currentindex].name=input.value;
    taskarray[currentindex].description=description.value;
    input.value = "";
    description.value = '';
    displayarrayvalue()
    editbtn.style.display = "none"
    addtbn.style.display = "block"
      
    
}
function deletetask(index){
    taskarray.splice(index, 1)
    displayarrayvalue();
}

  function checkboxclicked(ele, index) {
    const isclicked = ele.checked;
    taskarray[index].checkbox = isclicked;
    displayarrayvalue();
  } 

 function setlocalstorage(){
    localStorage.setItem('mytasks', JSON.stringify(taskarray))
 }
addtbn.addEventListener('click', addtask)
editbtn.addEventListener('click', edittaskvalue)