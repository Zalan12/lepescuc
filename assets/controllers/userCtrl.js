const passRegExp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailRegExp=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;


async function registration() {
    /* await fetch('http://localhost:3000/users')
     .then(res=> res.json())
     .then(data=>console.log(data))*/
    let nameField = document.querySelector("#nameField");
    let emailField = document.querySelector("#emailField");
    let passwordField = document.querySelector("#passwordField");
    let confirmPasswordField=document.querySelector("#confirmPasswordField")

    

    if(nameField.value==''||emailField.value==''||passwordField.value==''||confirmPasswordField.value=='')
    {alert("NEm adatal meg minden adatot")
        return;
    }
    if(passwordField.value!=confirmPasswordField.value)
    {
        alert('A jelszavak nem egyeznek')
        return;
    }
    if(!passRegExp.test(passwordField.value))
        {
            alert("A jelszó nem elég bizonságos! ")
            return;
        }
    
    if(!emailRegExp.test(emailField.value))
        {
            alert("Az email nem jós! ")
            return;
        }
        

    try{
        const respond = await fetch('http://localhost:3000/users', {
            method:"POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body:
            JSON.stringify({
                name: nameField.value,
                email: emailField.value,
                password: passwordField.value,
            }  
        )
        })
        console.log('Státusz',respond.status)
       
        const data = await respond.json();
        alert(data.msg)
        if(respond.status==200){
            nameField.value='';
            emailField.value='';
            passwordField.value='';
            confirmPasswordField.value='';
        }
    }  
    catch(  err){
        console.log("Hiba történt! ", err)
    }}

function login() { }

function logout() { }

function getProfile() { }

function updateProfile() { }

function updatePassword() { }
