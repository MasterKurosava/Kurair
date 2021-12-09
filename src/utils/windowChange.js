const windowChanging=()=>{
  const pageWindow=document.querySelector('.App');
  pageWindow.classList.add("changing");
  setTimeout(()=>pageWindow.classList.remove("changing"),2000);
}

const setPage=(e, path, history)=>{
  if(e)  e.preventDefault();
  windowChanging();
  scrollTo({top:0,behavior:"smooth"})
  setTimeout(()=>{
    history.push(path);
  },1500);
}


export {windowChanging, setPage};
