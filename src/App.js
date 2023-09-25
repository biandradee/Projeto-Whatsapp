import './App.css';
import { useEffect, useState } from 'react';
import Image from './assets/prof-programador.jpg';
import Icon from './assets/whatsapp.png'
import SendMessageIcon from './assets/send.png';
import Profile from './assets/profile.png';
import Status from './assets/status.png';
import Communities from './assets/communities.png';
import New from './assets/new.png';
import Menu from './assets/menu.png';
import socket from 'socket.io-client';
import Search from './assets/search.png';

const io = socket('http://localhost:4000');

function App() {

  const [name, setName] = useState("");
  const [joined, setJoinend] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    io.on("users", (users) => setUsers(users));
    io.on("message", (message) => setMessages((messages) => [...messages, message]));
  }, []);

  const handleJoin = () => {
    if(name.trim()){
      io.emit("join", name);
      setJoinend(true);
    };
  };

  const handleMessage = () => {
    if(message){
      io.emit("message", {message, name});
      setMessage("");
    };
  };

  const getEnterKey = (e) => {
    if(e.key === 'Enter')
      handleMessage()
  };

  if(!joined){
    return (
      <div className='join-page'>
        <div className='join-background'>
          <div className='icon-container'>
            <img src={Icon} className='icon' alt='' />
            <h1>WHATSAPP WEB</h1>
            <div className='join-container'> 
              <div className='join-content'>
                <div className='join-topics'>
                  <h2>Use o WhatsApp no seu computador</h2>
                  <h3>1. Abra a página do WhatsApp Web.</h3>
                  <h3>2. Coloque seu nome no campo ao lado.</h3>
                  <h3>3. Clique em entrar.</h3>
                  <h3>4. Aproveite o chat.</h3>
                </div>
                
                <div className='join-input-area'>
                <span className='title-input'>Digite seu nome:</span>
                <input className='join-input' value={name} onChange={(e) => setName(e.target.value)} />
                <button className='join-button' onClick={() => handleJoin()}>Entrar</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };   

  return (
    <div className='container'>
      <div className='back-ground'></div>
      <div className='chat-container'>

        <div className='chat-contacts'>
          <div className='chat-icons-area'>
              <img src={Profile} className='icon-profile' alt='' />
            <div className='chat-icons'>
              <img src={Communities} className='icons' alt='' />
              <img src={Status} className='icons' alt='' />
              <img src={New} className='icons' alt='' />
              <img src={Menu} className='icons' alt='' />
            </div>
          </div>
          <div className='search-area'>
            <div className='search-input'>
              <img src={Search} className='search-icon' alt='' />
              <input type='search' placeholder='Pesquisar ou começar uma nova conversa' />
            </div>
          </div>
          <div className='chat-item'>
            <img src={Image} className='image-profile' alt='' />
            <div className='title-chat-container'>
              <span className='title-message'>NetWorking Profissão Programador</span>
              <span className='last-message'>
                {messages.length ? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}` : ''}
              </span>
            </div> 
          </div>
        </div>
        
        <div className='chat-messages'>
          <div className='chat-options'>
            <div className='chat-item-messages'>
              <img src={Image} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='title-message'>NetWorking Profissão Programador</span>
                <span className='last-message-area'>
                  {users.map((user, index) => (
                    <span>{user.name}{index + 1 < users.length ? ', ' : ''}</span>
                  ))}
                </span>
              </div> 
            </div>
          </div>

          <div className='chat-messages-area'>
            {messages.map((message, index) => (
              <div className={message.name === name ? 'user-container-message right' : 'user-container-message left'}>
                <span key={index} className={message.name === name ? 'user-my-message' : 'user-other-message'}>
                  {message.name ? `${message.name}` : '' }<br />{message.message}
                </span>
              </div>
            ))}
          </div>
          
          <div className='chat-input-area'>
            <input 
              className='chat-input' 
              placeholder='Type a message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e)=>getEnterKey(e)}
            />
            <img  src={SendMessageIcon} alt='' className='send-message-icon' onClick={() => handleMessage()}/>
          </div>
        
        </div>

      </div>
  
    </div>
  );
}

export default App;
