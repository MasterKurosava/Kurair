function filterList(arr,settings){
  if(!settings.length) { return arr }
  let list=arr;
  settings.map(setting=>{
    list=list.filter(el=>{
      if(el.filters[setting]){return el}
    })
  })
  return list;
}
export default filterList;