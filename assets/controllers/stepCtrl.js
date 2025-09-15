
function setDate()
{
    let today=new Date().toISOString().split('T')[0];

    let dateField=document.querySelector("#dateField");
    dateField.setAttribute('max',today);

    
}

function add()
{
    
}
