import "../index.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
  React.useEffect(() => {
    document.body.classList.add("body");
  }, []);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([info, infoCard]) => {
        setCurrentUser(info);
        infoCard.forEach((cards) => {
          cards.myId = info._id;
        });
        setCards(infoCard);
      })
      .catch((error) => console.error(`Ошибка получения информации ${error}`));
  }, []);
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => console.error(`Ошибка удаления лайка ${error}`));
    } else {
      api
        .putLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => console.error(`Ошибка добавления лайка ${error}`));
    }
  }
  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== cardId));
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка удаления карточки ${error}`));
  }
  function handleUpdateUser(props) {
    api
      .setUserInfo(props)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) =>
        console.error(`Ошибка редактирования профиля ${error}`)
      );
  }
  function handleUpdateAvatar(props) {
    api
      .setUserAvatar(props)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) =>
        console.error(`Ошибка редактирования аватара ${error}`)
      );
  }
  function handleAddPlaceSubmit(props) {
    api
      .addCard(props)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка добавления карточки ${error}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateAvatar}
      />
      <PopupWithForm
        title="Вы уверены?"
        name="question"
        buttonText="Да"
      ></PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
