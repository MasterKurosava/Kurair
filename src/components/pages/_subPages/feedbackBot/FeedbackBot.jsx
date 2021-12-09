import React, { useEffect, useRef, useState } from "react";
import sl from "./FeedbackBot.module.css";

import SendSvg from "./SendSVG";
import BotIcon from "./BotIcon";
import SringIco from "../../../../images/string.png";

import {addBotMessage, addUserMessage, CreateBotCallback, CreateBotMessage, CreateUserMessage, findSimilar } from "../../../../server/botCommands";
import debounce from 'lodash.debounce'

const FeedbackBot =()=>{
  const [userMessage,setUserMessage]=useState('');
  const [messages, addMessages]=useState([]);
  const [botFunction, setBotFunction]=useState(null);

  const [soundAble, setSoundAble]=useState(true);
  const [scrollVisble, setScroll]=useState(false);

  const chatBlock=useRef();
  const soundBtn=useRef();
  const scrollBtn=useRef();
  const sendBtn=useRef();

  useEffect(()=>{
    if(!messages.length){
      addMessages([...messages, new CreateBotMessage('main')]);
    }
    soundBtn.current.classList.add(sl.active);
  },[]);

  useEffect(()=>{
    userMessage
    ? sendBtn.current.classList.add(sl.active)
    : sendBtn.current.classList.remove(sl.active);
  },[userMessage]);

  const newBotMsg=(btnName, setPage)=>{
    const newMsg= new CreateBotMessage(setPage, btnName);
    if(newMsg.content.inputFunc) setBotFunction(newMsg.content.inputFunc);
    else setBotFunction(null);
    addBotMessage(newMsg, messages, addMessages, chatBlock, soundAble);
  }

  const newUserMsg=(value)=>{
    if(!value) return false;
    const newMsg= new CreateUserMessage(value);
    addUserMessage(newMsg, addMessages);
    setUserMessage('');
    if(botFunction){
      const newMsg= new CreateBotCallback(botFunction(value), value);
      addBotMessage(newMsg, messages, addMessages, chatBlock, soundAble);
    }else{
      newBotMsg(value, findSimilar(value));
    }
  }

  const toggleSound=()=>{
    soundAble ? setSoundAble(false) : setSoundAble(true);
    soundBtn.current.classList.toggle(sl.active);
  }

  const toggleScroll=()=>{
    chatBlock.current.scrollHeight - chatBlock.current.scrollTop > chatBlock.current.clientHeight + 100
    ? setScroll(true)
    : setScroll(false)
  }

  const debouncedScroll=debounce(()=>toggleScroll(),300);

  return(
    <div className={sl.feedbackPage}>
      <div className={sl.botContainer}>
        <div className={sl.header}>
          <div className={sl.title}>
            <div className={sl.logo} style={{backgroundSize:"cover",backgroundImage: "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/7QCcUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAIAcAmcAFGU3NGl5clBpcTg2X0tnNnJMbjBHHAIoAGJGQk1EMDEwMDBhYzIwMzAwMDAyMjA2MDAwMGM3MDgwMDAwOTEwOTAwMDBkODBhMDAwMDI3MGQwMDAwMWIxMDAwMDBjYzEwMDAwMDdlMTEwMDAwN2UxMjAwMDBmYzE2MDAwMP/iAhxJQ0NfUFJPRklMRQABAQAAAgxsY21zAhAAAG1udHJSR0IgWFlaIAfcAAEAGQADACkAOWFjc3BBUFBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtbGNtcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACmRlc2MAAAD8AAAAXmNwcnQAAAFcAAAAC3d0cHQAAAFoAAAAFGJrcHQAAAF8AAAAFHJYWVoAAAGQAAAAFGdYWVoAAAGkAAAAFGJYWVoAAAG4AAAAFHJUUkMAAAHMAAAAQGdUUkMAAAHMAAAAQGJUUkMAAAHMAAAAQGRlc2MAAAAAAAAAA2MyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRleHQAAAAARkIAAFhZWiAAAAAAAAD21gABAAAAANMtWFlaIAAAAAAAAAMWAAADMwAAAqRYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9jdXJ2AAAAAAAAABoAAADLAckDYwWSCGsL9hA/FVEbNCHxKZAyGDuSRgVRd13ta3B6BYmxmnysab9908PpMP///9sAQwAGBAUGBQQGBgUGBwcGCAoQCgoJCQoUDg8MEBcUGBgXFBYWGh0lHxobIxwWFiAsICMmJykqKRkfLTAtKDAlKCko/9sAQwEHBwcKCAoTCgoTKBoWGigoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo/8IAEQgAyADIAwAiAAERAQIRAf/EABsAAQACAwEBAAAAAAAAAAAAAAADBgIEBQEH/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAEFBv/EABoBAQADAQEBAAAAAAAAAAAAAAACAwQBBQb/2gAMAwAAARECEQAAAfqgAAAAAAAAAAAAAAABjxk4/LojbFGhpjf1B2JLsrXa0S2xZIAAAAAAjqOfnVruOXj1xpvc6DzYx7zXx2MJR1sNiO2HUtnzpt79QcXtejpCXQAAGGdSp5ravZ0PEhDn7lklj7653zzIRxz4y5rRbMVtWtFsw3VQXmj+a+fVWjvepsDvQAOZUN7T8Kqz9imXLfZBq9No7xI++pV3yxoK2sgrOFpS5U47fzEOBhPwqqdz6B8j+k6O9MatIDX2ONXypzwzfO1Tdri5ctuzT3PpOhMAR6Zu6mtsccuKxxUR43nnAoq6uFW3u0fTRu3AK3ZKxnhwZoJfBhsSRdSNtgmPp+iLqTSgzItrY5lTqc3hanmR2+TLDmpihkitoh9xw0VfYB6nqAK3ZONTGnza8vhUbNoqd71XTGr7M/dF0SOPn8fy0+uj8jiHKKdeMOcN9OEOcV9UecXU01/TB6PqAIpXHzGTp8jxMnTvdOsu6+TQdDbYr0PP8eM3kXnnczwxjnHKJHZX5F7FdVjFlFfVhcab9X12bo17wAND559SqWSmXR5nRzwt1d3qjOyf2D3zK5vIvCTDDGUco8cLIexI7a/Ivdi+vuX+Cfd6QTsAAeeii+Xqn5M/Ax1/cOfYQo9m8i8JcMMZRzwwwnHKPzetjq/Tcujs2hboAAAAA5VP+iqqvkPv1HiZ6KT5ZYIVcDGx7klNn+hdm2yoW7NfqCUwAAAAAAAAAAAAAAAP/8QAKRAAAgICAQMEAgIDAQAAAAAAAAECAwQRBRATIBIUFTAhMSIyBkBQYP/aAAgBAAABBQL/AMlKSireQqiT5GxksvIZ7i8WVeiPIZESvlEU5FV3+hkZ6iWTna9GjRo0aNdMbkbajHvrvj9dk41xysqV70aNGjRo10YxkJyqngZ0cj6pyUI5N8r5iNeOhjGMZ+nxub7iP0chkdybwX6JVTh9DGMYxkZSrnh5CyaPLPu7VKONs3WSorkPDrY8E9jI9lYeysPZWHsrT2Np7C0+OtPjLT4u4+JuOPu9pmeWdZ3clFE+3ZFqUfrtzaay7k7GXZFtozjb+/ieGRPt0oQjAu0/ockidpZS7RcepHxcD4mst47FqXCWKOR4crLWMhC6Ytndq8ZSUSVrZ+3GpkYRRbfVUXcokXZt9gzjZ+jP8OYYhCF+XVDt19X+Cdp+3Go/jBW5sIl2XbYMYxlT9N3hzP8AZCEYMPVf1nNRJSciFbkJRgrsxItslYMYxjGL+/hzK/ihCOOjqnpZZo/brq0X5Eai22drGMYxjGY69WT4ctH1YiEIqj6Ky2zQltwioLIy99WMYxjGM4iHr5Dwth3K/wBNGKvXkFs/SJbaSqhk5Lt6bN9GMYxjGf49V+PHlau3knEx9WTlXKmv8txSrjl5Pels2bNm+jGMYz8t4dPt8bxzaPcUfp8PqNbu91m1Q0chldyWzZs2bN9GxjGM4PF7l3ny+KRyJLG4mPryuTyu3DZs2bNmzZs30YzFollX0VRpq82clhOh8ZfXQWWOyzZs2bNmzZvoxlNU77cDEjiU/S1szuNa6bNmzZs2bNmzZiYluXLDxK8Wv7MvCqyTJ46+k2bNmzZs2U023vE4dIjFRj992NTcWcPUyXDWnxGSLhryHCFPF4tYkkv+F//EACQRAAIBAwMEAwEAAAAAAAAAAAABAhESMQMgIQQQE0EwQEJR/9oACAECEQE/Afo3I8iPIhST+Buhyy0tGhojqOORNPG1uhQp3aGhojOxmdj5YttBwiSsRoT/AD3fAt7SJPTQpq5UXeeBC2tkmM995YIsjtbGxi5klsw6EMdqlRsbGxs6eNZV2asfaFKtIonP0XFxUbGzLojThZGm2ULXdEuKlxUbOZcI0dGzl53z0oyHoSWDxz/h4pv0R6Z/ojCMMfS//8QAKREAAgIBAwMCBgMAAAAAAAAAAQIAAxIEETEQICETUQUVIkBBQhQwM//aAAgBAREBPwH7F9TWv5n85PaDWoYlqPwf6LtQtQ8y3UvZzMplA0DSrUlfBisGG47b7hUu8vS3fJxN+oMBimU2lDAd/PZrLc3miu9RMTyI1FbciHQ0n8T5dTPl1MGgqEOmpTmb0jiad/162tihMaU2ml8hEYOuQ7Wpq5YQtQOBEcZDYddV/kY0rr9RwsA2Gw62XJUN2Ms+IlvFYmbP5YxYnW8b1mMJ8Pr3sLe3XU6/H6a4SXO7RRFEUSseey1MW2mjASssemr1Rf6E4mMCwCARRKF879mpqyGQgbLGsTV3fosxmMCwCARV3iriNu16cTmkI95jMYFgWKu8rrx73qVodMfxPRaClotHvAoXj7L/xAA2EAABAgMFBQYFAwUAAAAAAAABAAIDESEgIjAxURASIzJhE0FScYGhBDNCYpFAscFQYHKS0f/aAAgBAAAGPwL+0puMgrs3norjWtXzD6L5r/yvmuVS13mFxYZHkuG8Hp+glBvHXuU4jicGUTiN91OG6eIXPMgpC6zTE3oZk5br7sXTXCLnGQC0aMhjTFCFuP8Amj3wdxvI33KDobt6YV5pGMHsMnBB4z7xobdOZ1Bs3Dm3ZVgVJhUf7LnCzas2r6V9Kzas2LmYuZi52LnhoscRuuO6bbtG0GwOCBGRxObeP2rhtDfOqvxHHYxx5hQ2Xv0Fjs3emDVXadVfivKzcqxHL5j1xPiC3zIUaC102GrTZl4jZmc8rVVSmytNl94C4TJ9SqvkNG02QTqZWYQ87FEG6WKq7svLuAVy8Vzbo6WYZ0cLML1sT7m1s1XRaKUOvVXzO23zswj1sb3i2yGa6qblLN2ivH0wYTdXCyT4TOw1ug2SGaov5W7C/OHD+29Zcw94kpHMbIbeuyQzVFM+pUm0Z++JFjHvui1vjlf++wnwhT+o0AWpUz6qQ5BiADMpkPQVtFv1ZhSOaixDkmn6Z0Cmc12bOQZ9cXt3C6zl88Dt4Y/yH8rsRykzKr3Ca7Nhvu9hiiGz1OgTYbBJrcExIQ4WnhUZ7zWVBqi92ZxBDhCbit1tXHmdrhl/wwp3s/5icMSb3uOS3YYr3u1xZuEn+IKYHaN1bgSgsLlvfFHe+0ZINaAAO4foOJDaeq4b3s91disPmFzQ/wAqr4YXEjf6hcm+fuqpASH9D//EACsQAQABAgQFBAMAAwEAAAAAAAEAESExQVFhECBxgaEwkdHwscHhQFBg8f/aAAgBAAABPyH/AJJAAM1lj8Q95gyb3ZipdARhMC77WYYH0wlfTcHWYoHY+3rrQqyvEavB8yuQ74HIGGGGKUalkzIgd9wd51XhmdfUEgOcuQ8rrCCDiGGEggghRpZkAtAdG49KnSVVldv1dYEEIpKSkpGBBBBBKpqoqJiQLKDfbr6N77l4LF3FG0Zp2yHOIIIIIJXMGoy1Pg54t7p/YYJVm0OnD8XSk/HNg5/eHJ9mfbZ/6s3fdNz3xT5Yt8zFfkYr878Rb+sU/tHusiNq5MOa2PtV4EytiakUOoVPTUCrYleOgulUDtbkwqNK0PbhqYr7mcu7knWb8eHBLhWfs9HGVIqJ3kY7TlMK8MG/BpFf4ysJQxNUhStLctK0p++Pgg0alkiiVBdvzYs7TTrzCuYsVjjBS+rDbxpi+0qQ/YntK+LIXtW7qzrYe/La3FyYIGJsQg8nIgVVCK2t3l8xWO3VNiBkVnK+B2rErx0FvLm+q88vh/pFFFL0wPdyE3u6RivslwbQjbDNZZ2vVhHqrsy51/E/nl6TRFwKXVivHHWv4S+YqBmHSeGb9yuLWQwIxRRRR8SjWS88tFMQhRRTbYOHk50jUrmVU45w9S0M/jxUUUUUXE2ZUuxylgxoRe2lGKaYXvbhQZnxGpXLEiAF0jN7QisYYWKKKKKKKWYxfuf1zW4zf2gzcF8zNRN0zMXI5ULVUXAcI134jDDCxRRRRSg3VqBqww95q58x5Ou6MugIGiOUrNpUFXQKxlrDoglJnMNpUHuXGblBhheAooopWMlbv59BRbTKhbSK0zdpdcDxlULsDlAwwwwsUUsz1v5qUMQoegKlG4xSCsR9WhuBetC61erDlAwwwsUU8WGG7NWC1Hx6QBEqOMdq2LQ+spWijUSyPMBhhhhimaDsnyy9gsbFeqNsLF76yp0b1PaYqOPKDDHXZwsd48VL7lzlvGwFA/wMdnZR95f9kbIZ98CP9l8RP7ZhZrtRiI9Y/wAMIaEGAFP9H//aAAwDAAABEQIRAAAQ88888888888888886w+018888888iWa1vsf28888sX5hBIf3K3884PZCgiiAVhD884lVKAAMGDGh8850gAAUMjRJr88+xHEIImWFKB88uhJakokS/on888c5Q5CCLb928888ttQwRM4/88888s5gJA1+88888888888888888//EACIRAQACAgICAgMBAAAAAAAAAAEAERAxICFBUUCRMHGBsf/aAAgBAhEBPxD4KXmPonumgfwDC7MHJVK7ENvioXB3bAYo4FNYaggs4KGnFLAds9a5Zf0yqLia5bTPAXLVRnbHFxq1EdxxelZNvAr4LmnD+4ylxLlHvhPiPG9d38cFT1Q4FDTBhzBstjDLy88Xq/5LX3mcUEotgHZ/jn2OmbzcTgmK7X1DKPwv/8QAJxEBAAIABQMEAgMAAAAAAAAAAQARECAhMUFRcYFAYZGxMNGh4fH/2gAIAQERAT8Q9Aobxem3bWPGpvQn4UrlqekZ16dMBiLnk/mWJsy2PvxAWGvPEWy4Lkc9oQBTIjhsaEOw/RNv3xOnfLFOH5nc+ZwT8w63XmOiKy4fhj7EmEb/ALkEbLkSyoLSd1ml3dpbqsgEYXlhlsGOkF9xLQHV3iiwwwamNd9sCweH3gtasFOu9ePEeNbkAtJiglMVnxOZhllXL1q5PX+oZR5Z7GTrgfU6Tm8aru/6wGQPcohZQlZ4jqu7AYgVUQBbvn1VNYTdcS4iuJTuhFD0X//EACoQAQABAgMHBQADAQAAAAAAAAERACExQVEQIGFxgZGxMKHB0fBAUPHh/9oACAEAAAE/EP7+f4dypiIDrTbFtMdz4mm0yAy+IpfoPwlK+3Sco5HkUgRLIx7wpI1HG9mHzReF5Uw9V/XJkACVWArKOT7B+FaPiF2DAo2iTYRbJRuqkSE61KgNpUFwzde9QCAx7PoMvUJqsq8GrTKMti34/phsEN8A4dq4d3c40TM4NErmGVn8yekCyQGRVxauRxcXbupQTY5KS7gsO3IbSLwhgjTJZdCxoTXU9FGk3wbBi8ihzwMbpJs/dWAvNs7lqBFt6Ks7UxthjU6I4+T9OCVAA2NwMT5ODvs0tusHwHu7LV+Z5v6fikEhBNGkpUucjuVjzrJ71lXwJ8NGxvNFOS3X6UjgnX9V/r/qn/ofqsM7n6rDg/WlZI/jTYSPuH61PeT60lde6JYF0m3J4bxq6s59a2Lv4o4Vd6nzDEo0ACGZ6bJQCVWAq/g8ryw96EwND+xY81JT7L7RBQshbllSRMvbp6kPXd1C8Ie8VJupV1c2hQpmQ5Tk5+iPk+DNoe5OATHSpgRqQHIwrAOasDxQVo6D6Vi368qWA9ALyIlpKGMgmkxlInajDchRhV5ErwbgICKJExGn1LliyMzeJw3IXWpAHGxVCMC+rV/IaF2rjPzDXUHsvRepQPJfYX8VJDsmHcu96arK4pK9avhAvKKeYow3HD5pOgfNKlTtQpS4Gq1gmwLq5vfcUgDFakLDWX6UEYOrLWCJ1O9IGwSpju1Ho817v1UkSf8Ac40pVZVxW60qdOoGYZLkd2QmWwWFsoYp+AHy9NzNBwNS9sYDAqP5ml3lVkBJVHdqWHh4R5ZtcHulA5GFOljTpUsaVXAYsPZuvEwT6g/GyVthJBcpyWPnaM4M1ypxyc1agBMnEH3R6HQfDmyrBTs2XQz60oN2qxKdOlvh9m7qBJ6PmHztdGxi2KA3OOcX2XC/g70OJT9elrlspaD4KYyBzX8zpZVVVZVxaUMal3midKkt5PhLB7pRhuQQSzhJFDooG5Iw7G3koBwufGy+tjs1oeX5XaKWmAUpQbwPE8OFRPQLVcbaSGABeB8iOm81kD0iw62erspgwVPFB91I8FSsf4M6gQlULq1D5JFgA+Kkwu4z1fBsPpAtQBoSj4owHeoP1KDNuu67xLAuLJw6OHWmdSsURiNAPGnCJDzUsUMnFS8WJatVYsclZaOVhZcj3du1fRBiq0zOkls55B7ppRvOFSisk/OffWgHcFnLu4WKCMl4cVA81BRrab/c4HWoLGFFeamr6EI1ngyDJmL4M2rApfN1XVW76AOACESRKVI83in9vlQDwFmstjrFXt7WRoHALVBRt7vwNVEK5DmmQUGiiIIfiGR6QAgQEkTRpwl7M8X44aUo2lAQjomTRQ2h3gBXvhBnkngOsVMxDQ9c6aGB6iU4XHZR8Q501pC5Bxx9pqxAgsjZNo0doJfaYYnOVihW446D3OQjrRcChAOAevFDvHSD0Xp9QOCBd7+9WBmUj7TQmycajds4LeCmInZg9yvikShuP/DlQooiGHIP4kVFR6v/2Q==')"}}/>
            <h4>Напишите нам, мы онлайн!</h4>
            <div className={sl.setting}>
              <svg ref={soundBtn} className={sl.soundBtn} onClick={()=>toggleSound()}  viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M40.62,28.34l-.87-.7A2,2,0,0,1,39,26.08V18A15,15,0,0,0,26.91,3.29a3,3,0,0,0-5.81,0A15,15,0,0,0,9,18v8.08a2,2,0,0,1-.75,1.56l-.87.7a9,9,0,0,0-3.38,7V37a4,4,0,0,0,4,4h8.26a8,8,0,0,0,15.47,0H40a4,4,0,0,0,4-4V35.36A9,9,0,0,0,40.62,28.34ZM24,43a4,4,0,0,1-3.44-2h6.89A4,4,0,0,1,24,43Zm16-6H8V35.36a5,5,0,0,1,1.88-3.9l.87-.7A6,6,0,0,0,13,26.08V18a11,11,0,0,1,22,0v8.08a6,6,0,0,0,2.25,4.69l.87.7A5,5,0,0,1,40,35.36Z" />
              </svg>
            </div>
          </div>
          <div className={sl.types}>
            <div className={[sl.webchat, sl.selected].join(' ')}>Веб чат</div>
            {/* <div className={sl.messanger}>Продолжить в мессенджере</div> */}
          </div>
        </div>
        <div className={sl.contentBlock}>
          <div className={sl.chatBlock}>
            <div ref={chatBlock} className={sl.chat} onScroll={()=>debouncedScroll()}>
              {messages.map((el,index)=>{
                if(el.author=='bot'){
                  return (
                    <div key={index} className={sl.botMessage}>
                      <div className={sl.botContent}>
                        {el.content.text}
                      </div>
                      {el.content.buttons
                        ? <div className={sl.botButtons}>
                          {el.content.buttons.map((btn,index)=>{
                            return( <button key={index}  onClick={()=>newBotMsg(btn.name, btn.callback)} className={sl.botButton}>{btn.name}</button> )
                          })}
                        </div>
                        : ''
                      }
                      <div className={sl.time}>
                        <BotIcon style={sl.botIcon}/>
                        {el.time}
                      </div>
                    </div>
                  )
                }else{
                  return <div key={index} className={sl.userMessage}>{el.content}</div>
                }
              })}
            </div>
            <div className={sl.inputArea}>
              <input 
                onKeyPress={e=>{if(e.key=='Enter') newUserMsg(userMessage)}}
                value={userMessage}
                onChange={(e)=>setUserMessage(e.target.value)}
                className={sl.inputMessage} 
                placeholder="Введите сообщение"
                />
                <SendSvg ref={sendBtn} style={sl.sendBtn} send={newUserMsg} value={userMessage}/>
                {scrollVisble
                ? <div 
                  ref={scrollBtn} 
                  className={sl.scrollBtn} 
                  onClick={()=>chatBlock.current.scrollTop=chatBlock.current.scrollHeight+100} 
                  style={{backgroundImage:`url("${SringIco}")`}}/>
                : ''
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackBot