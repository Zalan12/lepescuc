let lightModeBTN=document.querySelector('#lightModeBTN');
let darkModeBTN=document.querySelector('#darkModeBTN');

let theme='light';

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
loadTheme();

