showData()
function showData(){
    const url = "http://127.0.0.1:8080/youtube/read.php";
    fetch(url,{
        method:"GET",
    }).then(response => response.text()).then(response =>{
        results.innerHTML = response;
    }).catch(err => console.log(err));
}
//função de criar usuário
function createUser(){
    const name = document.getElementById('name').value
    const cpf = document.getElementById('cpf').value
    const address = document.getElementById('address').value
    const telephone = document.getElementById('telephone').value
    const email = document.getElementById('email').value 
    const form = new FormData()
    
    form.append('name', name);
    form.append('cpf', cpf);
    form.append('address', address);
    form.append('telephone', telephone);
    form.append('email', email);

    const url = 'http://127.0.0.1:8080/youtube/cadastro.php';

   fetch(url, {
        method:'POST',
        body:form
    }).then(response =>{
       response.json().then(result =>{
        //console.log(result)
        Swal.fire(result.message);
      
       }).catch(err => console.log(err)) 
    })

}

// função de excluir usuário

function remove(id) {
    const form = new FormData();
    form.append('id', id);

    const url = 'http://127.0.0.1:8080/youtube/remove.php';

    Swal.fire({
        title: 'Você tem certeza?',
        text: "Essa ação não pode ser desfeita!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:"Cancelar",
        confirmButtonText: 'Sim, excluir!'
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(url, {
                method:"POST",
                body:form
            }).then(response =>{
                response.json().then(data =>{
                    Swal.fire(data.message);
                    showData();
                })
            }).catch(err => console.log(err))
        }
      })
}


function getId(id){
    const form = new FormData();
     form.append('id', id);


     const url = "http://127.0.0.1:8080/youtube/get_id.php";

     fetch(url, {
         method:"POST",
         body:form
     }).then(response =>{
         response.json().then(data =>{
            window.localStorage.setItem('user',JSON.stringify(data[0]));
             window.location.href = 'update.html';

         })
     })
}

showUserData()
function showUserData(){
    const user = JSON.parse(window.localStorage.getItem('user'));
    if(user!= null){
          //console.log(user.name)
        document.getElementById("id").value = user.id;
        document.getElementById("name_1").value = user.name;
        document.getElementById('cpf_1').value = user.cpf;
        document.getElementById('address_1').value = user.address;
        document.getElementById('telephone_1').value = user.telephone;
        document.getElementById('email_1').value = user.email;
    }else{
        console.log("")
    }
  
}



function update(){
    const id = document.getElementById("id").value;
    const name = document.getElementById('name_1').value
    const cpf = document.getElementById('cpf_1').value
    const address = document.getElementById('address_1').value
    const telephone = document.getElementById('telephone_1').value
    const email = document.getElementById('email_1').value 
    const form = new FormData();

    form.append('id',id);
    form.append('name', name);
    form.append('cpf', cpf);
    form.append('address', address);
    form.append('telephone', telephone);
    form.append('email', email);
    

    const url = "http://127.0.0.1:8080/youtube/update.php";

    fetch(url,{
        method:"POST",
        body:form
    }).then(response=>{
        response.json().then(data =>{
            Swal.fire(data.message).then(result =>{
                if(result.isConfirmed){
                    window.location.href = "index.html";
                    window.localStorage.removeItem('user');
                }
            });
            
        })
    })
}





