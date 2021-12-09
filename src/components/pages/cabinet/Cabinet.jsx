import React, { useState } from "react";
import sl from "./Cabinet.module.css";

import Profile from "./comps/Profile";

const pages={
  profile: <Profile/>,
  orders: '',
  tasks: '',
  adressBook: '',
  documents: '',
  blackList: ''
}


const Cabinet=()=>{
  const [currentPage, setCurrentPage]=useState('profile');

  const setPage=(target, page)=>{
    target.parentNode.childNodes.forEach(el=>{
      el.classList.remove(sl.active);
    })
    target.classList.add(sl.active);
    setCurrentPage(page);
  }
  return(
    <div className={sl.cabinetPage}>
      <div className={sl.sidebar}>
        <ul className={sl.pagesMenu}>
          <li onClick={(e)=>setPage(e.target, 'profile')} className={[sl.pageItem, sl.active].join(' ')}>Мой профиль</li>
          <li onClick={(e)=>setPage(e.target, 'orders')} className={sl.pageItem}>Мои заказы</li>
          <li onClick={(e)=>setPage(e.target, 'tasks')} className={sl.pageItem}>Мои задачи</li>
          <li onClick={(e)=>setPage(e.target, 'adressBook')} className={sl.pageItem}>Адресная книга</li>
          <li onClick={(e)=>setPage(e.target, 'documents')} className={sl.pageItem}>Документы</li>
          <li onClick={(e)=>setPage(e.target, 'blackList')} className={sl.pageItem}>Черный список</li>
        </ul>
      </div>
      
      <div className={sl.pageContainer}>
        {pages[currentPage]
        ||
        <div className={sl.emptyBlock}>
          <span className={sl.notFound}>#404</span>
          <p className={sl.emptyMessage}>
            Здесь пока ничего нет, но скоро будет!
          </p>
        </div>
        }
      </div>
    </div>
  )
}

export default Cabinet;