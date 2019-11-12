function viewPassword()
{
  var passwordInput = document.getElementById('tbPassword');
  var passStatus = document.getElementById('pass-status');
 
  if (passwordInput.type == 'password'){
    passwordInput.type='text';
    passStatus.className='fa fa-eye-slash';    
  }
  else{
    passwordInput.type='password';
    passStatus.className='fa fa-eye';
  }
}

function viewPassword1()
{
  var passwordInput = document.getElementById('tbPass');
  var passwordInput2 = document.getElementById('tbConfirm');
  var passStatus = document.getElementById('pass-status');
  var passStatus1 = document.getElementById('pass-status1');
 
  if (passwordInput.type == 'password' || passwordInput1.type == 'password'){
    passwordInput.type='text';
    passwordInput2.type='text';   
    passStatus.className='fa fa-eye-slash';
    passStatus1.className='fa fa-eye-slash';
  }

  else{
    passwordInput.type='password';
    passwordInput2.type='password';
    passStatus.className='fa fa-eye';
    passStatus1.className='fa fa-eye';
  }
}