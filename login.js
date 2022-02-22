const formLogin = document.getElementById("form-login");

formLogin.addEventListener('submit', (e)=>{
    e.preventDefault();
    const password = formLogin["password"].value;
    const email = formLogin["email"].value;
    console.log(password,email);
  })