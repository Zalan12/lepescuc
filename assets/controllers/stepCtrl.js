let adat=[];
let editMode=true

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
    let idx=adat.findIndex(step=>step.date==date && step.uid==loggedUser.id);
    if(idx==-1)
        {
            try{
                    let res =await fetch(`${ServerURL}/steps`,{
                        method: 'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            uid:loggedUser.id,
                            datum:date,
                            lepes:lepes
                        })
                    })

                    let data=await res.json();
                    if(res.status==200){
                        showMessage('success','Siker',data.msg)
                        await loadData();
                    }

            }
            catch(err){console.log(err);}

        }
    else{
        try{
            let res =await fetch(`${ServerURL}/steps/${adat[idx].id}`,{
                method: 'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    uid:loggedUser.id,
                    datum:date,
                    lepes:Number(adat[idx].lepes)+Number(lepes)
                })
            })

            let data=await res.json();
            if(res.status==200){
                showMessage('success','Siker',data.msg)
                await loadData();
            }

    }
    catch(err){console.log(err);}
    }

}
async function loadData() {
    
    try{
        const res=await fetch(`${ServerURL}/steps/user/${loggedUser.id}`);
        if(!res.ok){showMessage('danger','Hiba','Baj van gec');return};
        adat=await res.json();
        
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
                let delBtn=document.createElement('button');
                let editBtn=document.createElement('button');
                editBtn.classList.add('btn','btn-warning','btn-sm','me-2')

                td1.classList.add('text-end');
                td2.classList.add('text-end');
                td3.classList.add('text-end');
                td4.classList.add('text-end');
                delBtn.classList.add('btn','btn-danger');
                delBtn.addEventListener('click', () => {
                    egyTorles();
                })

                editBtn.addEventListener('click',()=>{deleteStep(index)})
                td1.innerHTML=adat[i].sid;
                td2.innerHTML=adat[i].datum;
                td3.innerHTML=adat[i].lepes;
                delBtn.innerHTML='<i class="bi bi-trash-fill"></i>';
                editBtn.innerHTML='<i class="bi bi-pencil-fill"></i>';
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                td4.appendChild(delBtn);
                td4.appendChild(editBtn);
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

async function deleteStep(index)
{
    /*if(confirm('Biztosan törlöd az adatot?')){

        try{let res=await fetch(`${ServerURL}/steps/${adat[index].uid}`,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'}
        })}
    }*/
}
async function egyTorles() {
    showMessage('info','Fejlesztés alatt','Ez a funkció még fejlesztés alatt áll')
}

function toggleMode(editMode)
{
    let addBtn=document.querySelector('#addBtn')
    let editBtn=document.querySelector('#editBtn')
    let deleteBtn=document.querySelector('#deleteBtn')
    let cancelBtn=document.querySelector('#cancelBtn')
    if(mode)
        {
            addBtn.classList.add('hide');
            deleteBtn.classList.remove('hide')
            cancelBtn.classList.remove('hide')
            updateBtn.classList.remove('hide')
        }

        else
            {
                addBtn.classList.remove('hide');
                deleteBtn.classList.add('hide')
                cancelBtn.classList.add('hide')
                updateBtn.classList.add('hide')
            }

        
}