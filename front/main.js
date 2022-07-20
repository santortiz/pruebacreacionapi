document.getElementById('button').addEventListener('click', () =>{
    var name= document.getElementById('name').value;
    var lastName= document.getElementById('lastName').value;
    
    addItem(name,lastName);

    document.getElementById('name').value= '';
    document.getElementById('lastName').value= '';
});


document.getElementById('lastName').addEventListener('keydown', (e) =>{
    
    var name= document.getElementById('name').value;
    var lastName= document.getElementById('lastName').value;

    if ((e.code === 'Enter' || e.code ==='NumpadEnter') && name && lastName){
        addItem(name, lastName);
        document.getElementById('name').value= '';
        document.getElementById('lastName').value= '';
    }
    
});

document.getElementById('search').addEventListener('click', getUsers);

function deleteItem(){
    document.getElementById('name');
    var lastName= document.getElementById('lastName');
}

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

    req.addEventListener('load', ()=>{
        var results = JSON.parse(req.responseText);

        //add results to table
        let tbody = document.getElementById('registered');
        
        
        for (let i=0; i<results.length;i+=1){
            
            let newTr= document.createElement('tr');
            let tdName=document.createElement('td');
            let tdLastName=document.createElement('td');
            let delbutton=document.createElement('td');

            tdName.textContent= results[i].firstName;
            tdLastName.textContent= results[i].lastName;
            delbutton.innerHTML= '<button class="delete"> X </button>';

            delbutton.addEventListener('click', ()=>{
                tdName.remove();
                tdLastName.remove();
                delbutton.remove();

                var del= new XMLHttpRequest();

                del.open('POST', '/del');
                del.setRequestHeader('Content-Type', 'application/json');
                del.send(JSON.stringify({
                    firstName: tdName.textContent,
                    lastName: tdLastName.textContent
                }));
            });

            newTr.appendChild(tdName);
            newTr.appendChild(tdLastName);
            newTr.appendChild(delbutton);
            tbody.appendChild(newTr);

        };

        if (results.error) return console.log(results.error);

        req.addEventListener('error', (e) => {
            console.log('Shit, something bad happened.');
            console.log(e);
          });
    });
}