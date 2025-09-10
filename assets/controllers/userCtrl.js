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
    {showMessage('danger','Hiba','Nem adtál meg minden adatot')
        return;
    }
    if(passwordField.value!=confirmPasswordField.value)
    {
        showMessage('danger','Hiba','A két jelszó nem egyezik')
        return;
    }
    if(!passRegExp.test(passwordField.value))
        {
            showMessage('danger','Hiba','A jelszó nem elég biztonságos')
            return;
        }
    
    if(!emailRegExp.test(emailField.value))
        {
            showMessage('danger','Hiba','Foglalt email')
            return;
        }
        

    try{
        const respond = await fetch(`${ServerURL}/users`, {
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
        if(respond.status==200){
            nameField.value='';
            emailField.value='';
            passwordField.value='';
            confirmPasswordField.value='';
            showMessage('success','Makulátlan',data.msg)
        }
        else{showMessage('danger','HIba',data.msg)}
    }  
    catch(  err){
        console.log("Hiba történt! ", err)
    }}

async function login() { 

    let emailField = document.querySelector("#emailField");
    let passwordField = document.querySelector("#passwordField");

    if(emailField.value==''||passwordField.value=='')
        {showMessage('danger','Hiba','Nem adtál meg minden adatot')
            return;
        }
    let user={};
        
    try{
        const respond=await fetch(`${ServerURL}/users/login`,
            {

                method:"POST",
                headers: {
                'Content-Type' : 'application/json'
            },
            body:
                JSON.stringify({
                email: emailField.value,
                password: passwordField.value,
            })
        })
;
        
        user=await respond.json();
        
        if(user.id!=undefined)
            {
                loggedUser=user;
            };
        if(!loggedUser)
        {
            console.log('Hibás belépési adatok')
            return;
        }
        sessionStorage.setItem('loggedUser',JSON.stringify(loggedUser));
        
        getLoggedUser();
        showMessage('success','OK','Sikeres blépés');

    }
    catch(err)
    {
        console.log('err',err);
    }
    
    
}


function logout() {
    sessionStorage.removeItem('loggedUser');
    getLoggedUser();
    render('login')
 }

function getProfile() { }

function updateProfile() { }

function updatePassword() { }
