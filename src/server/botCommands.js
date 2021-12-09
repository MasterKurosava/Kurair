import {BotContent} from "./botData";

import messageSound from "../sounds/botSound.mp3"

class CreateBotMessage{
  constructor(callback, btnName) {
    this.content={
      text    : BotContent[callback].text,
      buttons : BotContent[callback].buttons,
      inputFunc : BotContent[callback].inputFunc
    }
    this.btnName=btnName;
    this.time=getTime();
    this.author="bot"
  }
}

class CreateBotCallback{
  constructor(result,value) {
    this.content={
      text : result,
      buttons:[{name:"Вернуться в меню", callback:"main"}],
    }
    this.callbackValue=value
    this.time=getTime();
    this.author="bot"
  }
}

class CreateUserMessage{
  constructor(value) {
    this.content=value;
    this.time=getTime();
    this.author="user"
  }
}


//добавляем сообщение от бота
const addBotMessage= (newMsg, messages, addMessages, chatBlock, sound)=>{
  deleteButton(messages, addMessages);                        //удаляем прошлые кнопки
  const userMsg= new CreateUserMessage(newMsg.btnName || newMsg.callbackValue)        
  addUserMessage( userMsg, addMessages )                             
  setTimeout(()=>{                                            //добавляем новое сообщение от бота
    addMessages(prevMessages => {
      const nextMessages = [...prevMessages];
      nextMessages.push(newMsg);
      return nextMessages;
    });
    chatBlock.current.scrollTop=chatBlock.current.scrollHeight+100; //скролим блок вниз
    if(sound) botSoundMessage();                                          //воспроизводим сигнал сообщения
  },1000)
}


//добавляем сообщение от пользователя
const addUserMessage=(newMsg, addMessages)=>{
  const newMessage=newMsg;
  addMessages(prevMessages => {
      const nextMessages = [...prevMessages];
      nextMessages.push(newMessage);
      return nextMessages;
  });

}
//удаляем кнопки старых сообщений
const deleteButton=(messages, addMessages)=>{
  const filtered=messages.map(ms=>{
    if(ms.author=='user') return ms;
    ms={...ms, content:{ text: ms.content.text, buttons: null, inputFunc: ms.content.inputFunc }}
    return ms;
  });
  addMessages(filtered);
}
//звук при сообщении от бота
const botSoundMessage=()=>{
  const audio = new Audio(); 
  audio.src = messageSound; 
  audio.autoplay = true; 
}
//время отправки сообщения
const getTime=()=>{
  const date=new Date;
  let hours=date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  let minutes=date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${hours}:${minutes}`;
}

const findSimilar=(value)=>{
  let normalStr=value.trim().toLowerCase();
  let statistic={};
  for(let msg in BotContent){
    const keywords=BotContent[msg].keywords;
    keywords.split(" ").map(key=>{
      if(key && key!==' '){
        if(normalStr.includes(key.trim())){
          statistic[msg] ? statistic[msg]+=1 : statistic[msg]=1;
        }
      }
    })
  }
  let page=Object.entries(statistic).reduce((max, n) => n[1] > max[1] ? n : max)[0] || "notFound";
  return page;
}


export {CreateBotMessage, CreateUserMessage, CreateBotCallback, addBotMessage, addUserMessage, findSimilar}