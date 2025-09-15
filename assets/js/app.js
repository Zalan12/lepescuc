const AppTitle="Lépészámláló App";
const Author="13. A Szoftverfejlesztő";
const Company="Bajai SZC Türr István Technikum"
const ServerURL='http://localhost:3000'

let title=document.querySelector('#AppTitle')
let company=document.querySelector('#Company')
let author=document.querySelector('#Author')

let lightModeBTN=document.querySelector('#lightModeBTN');
let darkModeBTN=document.querySelector('#darkModeBTN');

let main=document.querySelector('main');
let loggedUser=null;
let mainMenu=document.querySelector('#mainMenu');
let userMenu=document.querySelector('#userMenu');

title.innerHTML=AppTitle;
author.innerHTML=Author;
company.innerHTML=Company;

lightModeBTN.addEventListener('click', () => {
    setTheme('light');
    saveTheme('light');
    setThemeBTN('light');
})

darkModeBTN.addEventListener('click', () => {
    setTheme('dark');
    saveTheme('dark');
    setThemeBTN('dark');
})
function loadTheme()
{
    if(localStorage.getItem('SCTheme'))
        {
            theme=localStorage.getItem('SCTheme');
            
        }
        setTheme(theme);
}

function saveTheme(theme)
{
    localStorage.setItem('SCTheme',theme);
}

function setTheme(theme)
{
    document.documentElement.setAttribute('data-bs-theme',theme)

}
function setThemeBTN(theme)
{
    if(theme=='light')
    
        {
            lightModeBTN.classList.add('hide');
            darkModeBTN.classList.remove('hide');
        }
    else
    {
        lightModeBTN.classList.remove('hide');
        darkModeBTN.classList.add('hide');
    }
}
async function render(view)
{
    main.innerHTML =await((await fetch(`views/${view}.html`)).text());
    switch(view){
        case 'main':
            {
                setDate();
                loadData();
                break;
            }}

}

async function getLoggedUser()
{
    if(sessionStorage.getItem('loggedUser')){
        loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'));
        mainMenu.classList.add('d-none');
        userMenu.classList.remove('d-none');
        
        await render('main');
    }

    else{
        loggedUser=null;
        mainMenu.classList.remove('d-none');
        userMenu.classList.add('d-none');
        await render('login');
    }
}

loadTheme()
getLoggedUser();

