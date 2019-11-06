function viewPassword()
{
  var passwordInput = document.getElementById('tbPassword');
  //var passStatus = document.getElementById('btnShowPass');
 
  if (passwordInput.type == 'password'){
    passwordInput.type='text';    
  }
  else{
    passwordInput.type='password';
  }
}

function viewPassword1()
{
  var passwordInput = document.getElementById('tbPass');
  var passwordInput2 = document.getElementById('tbConfirm');
  //var passStatus = document.getElementById('btnShowPass');
 
  if (passwordInput.type == 'password' || passwordInput1.type == 'password'){
    passwordInput.type='text';
    passwordInput2.type='text';   
  }
  else{
    passwordInput.type='password';
    passwordInput2.type='password';
  }
}