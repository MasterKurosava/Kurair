import er from "../styles/errors.module.css";

const checkCallback=(name, preNumber, number, theme, policy, nameLabel, preNumLabel, numberLabel, themeLabel, policyLabel )=>{
  if(!name || !number || !theme){
    if(!name) nameLabel.current.classList.add(er.callbackError);
    if(!number){ 
      numberLabel.current.classList.add(er.callbackError)
    }
    if(!theme) themeLabel.current.classList.add(er.callbackError);
    if(!policy) policyLabel.current.classList.add(er.callbackError);
    return true;
  }else{
    const normalNum=12-preNumber;
    if(preNumber+number!==normalNum){
      numberLabel.current.classList.add(er.callbackError);
      preNumLabel.current.classList.add(er.error);
      return true;
    }
  }
}

export default checkCallback;