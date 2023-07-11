import React from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from './PopupWithForm.js';
function AddPlacePopup(props){
    const currentUser = React.useContext(CurrentUserContext);
    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');
    function handleTitle(e) {
        setTitle(e.target.value);
    }
    function handleLink(e) {
        setLink(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
          name: title,
          link,
        });
    }
  return (
    <PopupWithForm title="Новое место" name="add" buttonText="Создать"
    isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_title"
        id="popup__input-title"
        type="text"
        placeholder="Название"
        name="name"
        required=""
        minLength={2}
        maxLength={30}
        onChange={handleTitle}
        value={title ? title : ''}
      />
      <span className="popup__input-title-error popup__error "></span>
      <input
        className="popup__input popup__input_type_image"
        id="popup__input-url"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required=""
        onChange={handleLink}
        value={link ? link : ''}
      />
      <span className="popup__input-url-error popup__error "></span>
    </PopupWithForm>
  )
}
export default AddPlacePopup;