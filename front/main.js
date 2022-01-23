

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
