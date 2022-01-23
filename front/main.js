

document.getElementById('button').addEventListener('click', () =>{
    var name= document.getElementById('name').value;
    var lastName= document.getElementById('lastName').value;
    addItem(name, lastName);
});


document.getElementById('lastName').addEventListener('keydown', (e) =>{
    
    var name= document.getElementById('name').value;
    var lastName= document.getElementById('lastName').value;

    if ((e.code === 'Enter' || e.code ==='NumpadEnter') && name && lastName){
        addItem(name, lastName);
    }
});

document.getElementById('search').addEventListener('click', getUsers);

function addItem(name, lastName){
    var req= new XMLHttpRequest();

    req.open('POST', '/add');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({
        name: name,
        lastName: lastName
    }));

    req.addEventListener('error', (e)=>{
        console.log('something went wrong');
        console.log(e);
    });
}

function getUsers(){
    var req = new XMLHttpRequest();

    req.open('GET', '/registered');
    req.send();


    var length= new XMLHttpRequest();

    length.open('GET', '/length');
    length.send();

    req.addEventListener('load', ()=>{
        var results = JSON.parse(req.responseText);

        //add results to table
        let table = document.getElementById('registered');
        
        
        for (let i=0; i<results.length;i+=1){
            
            let newTr= document.createElement('tr');
            let tdName=document.createElement('td');
            let tdLastName=document.createElement('td');

            tdName.textContent= results[i].firstName;
            tdLastName.textContent= results[i].lastName;

            newTr.appendChild(tdName);
            newTr.appendChild(tdLastName);
            table.appendChild(newTr);
        };
        

        


        if (results.error) return console.log(results.error);

        req.addEventListener('error', (e) => {
            console.log('Shit, something bad happened.');
            console.log(e);
          });
    });
}

/* let table = document.getElementById('registered');

let newTr= document.createElement('tr');
let tdUno=document.createElement('td');
let tdDos=document.createElement('td');

tdUno.textContent= 'daniel';
tdDos.textContent= 'montoya';

newTr.appendChild(tdUno);
newTr.appendChild(tdDos);

table.appendChild(newTr);

console.log(table); */
