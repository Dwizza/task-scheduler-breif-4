const namee = document.getElementById('Name');
const description = document.getElementById('description');
const date = document.getElementById('date');
const statuss = document.getElementById('statuss');
const button = document.getElementById('button');
let tbody =document.getElementById("tbody")
let table = document.getElementById("table")
let editTitle = document.getElementById('editTitle')
let datatask= []
let i; 
statuss.style.display= "none"
editTitle.style.display= "none"

if(localStorage.task != null){
    datatask = JSON.parse(localStorage.task)
    table.style.display="block"
} else{
    table.style.display="none"
}


function ajouter(){
    
    if (namee.value && description.value&& date.value){
        let newtask = {
            namee : namee.value ,
            description: description.value , 
            date : date.value ,
            statuss : statuss.value || 'Encours'
        } 
        datatask.push(newtask)
        console.log('newtask', newtask)
        localStorage.setItem('task', JSON.stringify(datatask))
        addrow()
        namee.value =""
        description.value =""
        date.value =""
        statuss.value =""
        table.style.display="block"
    }else{
        alert("pleaze enter your data")
    }
    compa()
}


let time ;

function today() {
    let d = new Date();
    let currDate = d.getDate();
    let currMonth = d.getMonth()+1;
    let currYear = d.getFullYear();
    time = currYear + "-" + currMonth + "-" + currDate ;
}

today()

function compa(){

if(datatask.length > 0) {
    for( i=0;i<datatask.length;i++){
        let txtColor = ""; 
        const statusDate = new Date(datatask[i].date)
        const datenow = new Date(time)


        if (datenow >= statusDate) {
            console.log('en cours')
            datatask[i].statuss = "Encours"
            txtColor = "text-lime-600"; 
        } else {
            console.log('termine')
            datatask[i].statuss = "Terminé"
            txtColor = "text-orange-700"; 

        }
        
    }
}   
}

compa() 

function cancel(){
    namee.value =""
    description.value =""
    date.value =""
    statuss.value =""
}

function addrow(){
    tbody.innerHTML="" ;
    for( i=0;i<datatask.length;i++){
        let txtColor = ""; 
        if (datatask[i].statuss === "Encours") {
            txtColor = "text-orange-700"; 
        } else{
            txtColor = "text-lime-600"; 
        } 
        tbody.innerHTML += `<tr class="">
        <td data="" class="px-6 py-4 font-medium font-mono text-gray-900 whitespace-nowrap dark:text-white">${datatask[i].namee}</td>
        <td class="pr-[9.25rem] pl-3 py-4 font-medium font-mono text-gray-900 whitespace-nowrap dark:text-white">${datatask[i].description}</td>
        <td class="px-6 py-4 font-medium font-mono text-gray-900 whitespace-nowrap dark:text-white">${datatask[i].date}</td>
        <td class="${txtColor} px-6 py-4 font-medium font-mono  whitespace-nowrap ">${datatask[i].statuss}</td>
        <td ><a href="#" onclick="edit(${i})" class="font-medium font-mono text-blue-600 dark:text-blue-500 hover:underline">Edit</a></td>
        <td><a onclick="deleteall(${i})" href="#" class="font-medium font-mono text-blue-600 dark:text-blue-500 hover:underline">Delete</a></td>
        </tr>`
        }
}

addrow()
//delete
function deleteall(i){
    if(confirm('are u sure')) {

        datatask.splice(i,1);
        localStorage.task = JSON.stringify(datatask)
        addrow()
        if (datatask.length == 0) {
            localStorage.removeItem("task");
            table.style.display="none"
        }
    }
}
//edit
function edit(i){
    editTitle.style.display= "block"
    editTitle.innerHTML=  `Edit task n ${i+1}`
    namee.value = datatask[i].namee;
    description.value = datatask[i].description;
    date.value = datatask[i].date;
    statuss.value = datatask[i].statuss;
    button.setAttribute("onclick", "save("+i+")")
    button.innerText="update"
}


function save(i){
    datatask[i].namee = namee.value  ;
    datatask[i].description = description.value  ;
    datatask[i].date = date.value  ;
    datatask[i].statuss = statuss.value  ;
    const array = localStorage.getItem('task')
    const parsedObj = JSON.parse(array);
    
        parsedObj[i] = datatask[i]
        localStorage.setItem('task', JSON.stringify(datatask))
    button.setAttribute("onclick", "ajouter()")
    button.innerText="submit"
    namee.value =""
    description.value =""
    date.value =""
    statuss.value =""
    console.log('datatask',datatask)
    addrow()
    compa()
    editTitle.style.display= "none"
    location.reload();
    }