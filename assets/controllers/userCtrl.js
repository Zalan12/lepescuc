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

async function getProfile() {
          let nameField=document.querySelector('#nameField');
    let emailField=document.querySelector('#emailField');

    const loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'))

    try
    {
        const res = await fetch(`${ServerURL}/users/${loggedUser.id}`)
        if(!res.ok){
            showMessage('warning','Hiba','Nem sikerult lekerni a profil adatait')
            return
        }
        const user=await res.json()
        emailField.value=user.email;
        nameField.value=user.name;
        passwordField.value=user.password;
    }
    catch(err){
        console.log(err)

    }


 }

async function updateProfile() {
      let name=document.querySelector('#nameField');
    let email=document.querySelector('#emailField');
    let password=document.querySelector('#passwordField');
    

    if(name.value=='' || email.value=='')
    {
        showMessage('warning','Hiba','Üres adatokat nem adhatsz meg');
        return;
    }
    if(name.value==loggedUser.name ||email.value==loggedUser.email)
    {
        showMessage('warning','Hiba','Nem adhatsz meg jelenlegi adatokat');
        return;
    }
    try{
        const loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'))
        const res=await fetch(`${ServerURL}/users/${loggedUser.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email:emailField.value,
                name: nameField.value,
                password:passwordField.value
            })
        })
        if(!res.ok){
            const data=await res.json();
            console.log(data.msg)
            showMessage('danger','Hiba',`${data.msg}`)
            return
        }
        const updatedUser=await res.json()
        sessionStorage.setItem('loggedUser',JSON.stringify(updatedUser.user))
        showMessage('success','Siker','Felhasználó sikeresen frissitve')
        setTimeout(login,3000);
    
    }
    catch(err)
    {
        console.log("hiba! ",err)
    }
   
 }
 

 ;
 

async function updatePassword() {
    let password=document.querySelector("#passwordField");
    let newPassword=document.querySelector("#newPasswordField");
    let cNewPassword=document.querySelector("#confNewPasswordField");

    if(password.value=="" || newPassword.value=="" || cNewPassword.value=="")
    {
        showMessage('warning','Hiba','Nem adtál meg minden adatot!')
        return
    }
        if(!passRegExp.test(newPassword.value))
        {
            showMessage("danger",'Hiba','A jelszó nem elég erős!')
            return
        }
    if(newPassword.value!=cNewPassword.value)
    {showMessage('warning','Hiba','A jelszavak nem egyeznek!')
        return
    }

    if(password.value==newPassword.value)
        {
            showMessage('warning','Hiba','Az új jelszó nem lehet a jelenlegi')
            return
        }
    try{
        const loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'))
        const res=await fetch(`${ServerURL}/users/jelszovalt/${loggedUser.id}`,{
            method:'PATCH',
            headers:{'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                password:password.value,
                newPassword: newPassword.value
            })
        })
        if(!res.ok){
            const data=await res.json()
            console.log(data.msg)
            showMessage('danger','Hiba',data.msg)
            return;

        }
        passwordField.value='';
        newPassword.value='';
        cNewPassword.value='';
        const updatedUser = await res.json()
        sessionStorage.setItem('loggedUser',JSON.stringify(updatedUser.user))
        showMessage('success','Siker',"Sikeres felhasználó módosítás")
        setTimeout(login,3000);

    }
    catch(err)
    {
        console.log(err);
    }
    

 }
