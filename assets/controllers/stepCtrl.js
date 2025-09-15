
function setDate()
{
    let today=new Date().toISOString().split('T')[0];

    let dateField=document.querySelector("#dateField");
    dateField.setAttribute('max',today);

    
}

async function add()
{
    let dateField = document.getElementById("dateField")
    let stepcountField = document.getElementById("stepcountField")
    if(dateField.value=="" || stepcountField.value=="")
        {
            showMessage('danger','Hiba','Nem adhatsz meg üres adatokat');
            return;
        }

    try{

        const res = await fetch(`${ServerURL}/steps`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: loggedUser.id,
                lepes: Number(stepcountField.value),
                datum: dateField.value.toString()
            })
        })

        const data = await res.json()

        if (res.status == 200){
            dateField.value = ''
            stepcountField.value = ''
            showMessage('success','Siker','Sikeres adatfelvitel!')

           setTimeout(render('main'),5000);
        }
    }
    catch(err){
        console.log('Hiba történt: ', err)
    }

}
async function loadData() {
    
    try{
        const res=await fetch(`${ServerURL}/steps/user/${loggedUser.id}`);
        if(!res.ok){showMessage('danger','Hiba','Baj van gec');return};
        const adat=await res.json();
        let adatTabla=document.querySelector('#adatTabla');
        let osszLepes=document.querySelector('#osszLepes');
        let osszLepesSzam=0;
        for(let i=0;i<adat.length;i++)
            {
                let tr=document.createElement('tr');
                let td1=document.createElement('td');       
                let td2=document.createElement('td');
                let td3=document.createElement('td');
                let td4=document.createElement('td');
                let btn=document.createElement('button');


                td1.classList.add('text-end');
                td2.classList.add('text-end');
                td3.classList.add('text-end');
                td4.classList.add('text-end');
                btn.classList.add('btn','btn-danger');
                btn.addEventListener('click', () => {
                    egyTorles();
                })

                td1.innerHTML=adat[i].sid;
                td2.innerHTML=adat[i].datum;
                td3.innerHTML=adat[i].lepes;
                btn.textContent='X';
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                td4.appendChild(btn)
                tr.appendChild(td4);
                adatTabla.appendChild(tr);
                osszLepesSzam+=adat[i].lepes;
                
            }
        osszLepes.innerHTML=osszLepesSzam;



    }
    catch(err){
        console.log(err)
    }

    

}
async function egyTorles() {
    showMessage('info','Fejlesztés alatt','Ez a funkció még fejlesztés alatt áll')
}
