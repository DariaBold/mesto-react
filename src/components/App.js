import '../index.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';

function App() {
  React.useEffect(() => {
    document.body.classList.add('body');
  },[]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick (card){
    setSelectedCard(card);
  }
  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups(){
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  return (
<>
  <div className="page">
    <Header />
    <Main 
    onAddPlace={handleAddPlaceClick} 
    onEditProfile={handleEditProfileClick} 
    onEditAvatar={handleEditAvatarClick}
    onCardClick={handleCardClick}
    />
    <Footer />
    <PopupWithForm title="Редактировать профиль" name="profile" buttonText="Сохранить"
    isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
      <input
        className="popup__input popup__input_type_name"
        id="popup__input-name"
        type="text"
        placeholder="Введите имя"
        name="name"
        required=""
        minLength={2}
        maxLength={40}
      />
      <span className="popup__input-title-error popup__error "></span>
      <input
        className="popup__input popup__input_type_description"
        id="popup__input-description"
        type="text"
        placeholder="Описание"
        name="description"
        required=""
        minLength={2}
        maxLength={200}
      />
      <span className="popup__input-url-error popup__error "></span>
    </PopupWithForm>
    <PopupWithForm title="Новое место" name="add" buttonText="Создать"
    isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
      <input
        className="popup__input popup__input_type_title"
        id="popup__input-title"
        type="text"
        placeholder="Название"
        name="name"
        required=""
        minLength={2}
        maxLength={30}
      />
      <span className="popup__input-title-error popup__error "></span>
      <input
        className="popup__input popup__input_type_image"
        id="popup__input-url"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required=""
      />
      <span className="popup__input-url-error popup__error "></span>
    </PopupWithForm>
  </div>
  <ImagePopup card={selectedCard} onClose={closeAllPopups} />
  <PopupWithForm title="Обновить аватар" name="avatar" buttonText="Сохранить"
  isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
    <input
      className="popup__input popup__input_type_image"
      id="popup__input-avatar"
      type="url"
      placeholder="Ссылка на аватар"
      name="avatar"
       required=""
    />
    <span className="popup__input-avatar-error popup__error "></span>
  </PopupWithForm>
  <PopupWithForm title="Вы уверены?" name="question" buttonText="Да">
  </PopupWithForm>
</>

  );
}

export default App;
