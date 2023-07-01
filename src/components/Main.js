import React from "react";
import api from '../utils/api'
import Card from "./Card";
function Main({onAddPlace, onEditProfile, onEditAvatar, onCardClick}) {
    const [userName, setUserName] = React.useState('');
    const [userDescription , setUserDescription ] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([])
    React.useEffect(()=>{
        Promise.all([api.getUserInfo(),api.getInitialCards()])
        .then(([info, infoCard]) => {
            setUserName(info.name);
            setUserDescription(info.about);
            setUserAvatar(info.avatar);
            infoCard.forEach(cards =>{
                 cards.myId = info._id;
            });
            setCards(infoCard);
        })
        .catch((error => console.error(`Ошибка получения информации ${error}`)));
    },[])
    return (
    <main className="content">
      <section className="profile">
        <button type="button" className="profile__avatar" onClick={onEditAvatar}>
          <img className="profile__photo" alt="фото профиля" src={userAvatar} />
        </button>
        <div className="profile__text">
          <div className="profile__container">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="profile__edit"
              type="button"
              aria-label="Редактировать"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          className="profile__add"
          type="button"
          aria-label="Добавить"
          name="add"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map(info => {
            return(<Card card={info} key={info._id} onCardClick={onCardClick}/>)
        })}
      </section>
    </main>
    )
}
export default Main;