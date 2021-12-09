const getUsersData=()=>{
  if(localStorage.getItem('users')){
    return JSON.parse(localStorage.getItem('users'));
  }else{
    return [];
  }
}

const setUser=(login, password, email)=>{
  let users=getUsersData();
  users=[...users,{login, password, email, secondEmail:email, telephone:'', adress:''}]
  localStorage.setItem('users',JSON.stringify(users));
}

const changeUser=(data)=>{
  const users=getUsersData();
  let currentUser;
  users.map(user=>{
    if(user.login == data.login){
      for(let key in user){
        user[key]=data[key] || user[key];
      }
      currentUser=user;
      return user;
    }
  });
  localStorage.setItem('users',JSON.stringify(users));

  if(localStorage.getItem('session')){
    localStorage.setItem('session', JSON.stringify(currentUser))
  }
  else if(sessionStorage.getItem('session')){
    sessionStorage.setItem('session', JSON.stringify(currentUser))
  }
  else{
    return false;
  }
}

const getSession=()=>{
  if(localStorage.getItem('session')){
    return JSON.parse(localStorage.getItem('session'));
  }
  else if(sessionStorage.getItem('session')){
    return JSON.parse(sessionStorage.getItem('session'));
  }
  else{
    return null;
  }
}

const Userlogout=()=>{
  localStorage.removeItem('session');
  sessionStorage.removeItem('session');
  window.location.reload();
}
export {getUsersData, setUser, changeUser, getSession, Userlogout}