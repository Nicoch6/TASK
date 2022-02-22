import {saveTask,getTask, onGetTasks,deleteTask, updateTask } from "./firebase.js";


const taskForm= document.getElementById('task-form')
const tasksContainer = document.getElementById("tasks-container");
const formLogin = document.getElementById("form-login");

console.log(formLogin);
let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {

     onGetTasks((querySnapshot) => {
      
     tasksContainer.innerHTML = "";  
      querySnapshot.forEach((doc) => {
        const task = doc.data();
  
        tasksContainer.innerHTML += `
                        <div class="card card-body mt-2 border-primary">
                        <h3 class="h5">${task.title}</h3>
                        <p>${task.description}</p>
                        <div>
                            <button class="btn btn-primary btn-delete" data-id="${doc.id}">
                            🗑 Delete
                            </button>
                            <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
                            🖉 Edit
                            </button>
                        </div>
                        </div>`;
      });
  
      const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deleteTask(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getTask(e.target.dataset.id);
            const task = doc.data();
            taskForm["task-title"].value = task.title;
            taskForm["task-description"].value = task.description;
  
            editStatus = true;
            id = doc.id;
            taskForm["btn-task-form"].innerText = "Update";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });


  taskForm.addEventListener('submit', async(e) =>{
    e.preventDefault();
    const taskTitle = taskForm['task-title'].value;
    const taskDescription = taskForm['task-description'].value;

    //guardando en firebase
     try {
          if(editStatus==false){
            await saveTask(taskTitle,taskDescription);
          }else{
            await updateTask(id, 
              {
                title: taskTitle,
                description: taskDescription
              });
          }
          
          taskForm["btn-task-form"].innerText = "Save";
          editStatus=false;

          taskForm.reset();
          taskTitle.focus();
      } catch (error) {
        console.log(error);
      }

});

formLogin.addEventListener('submit', (e)=>{
  console.log(e.data());
})