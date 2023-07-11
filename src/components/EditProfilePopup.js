import React from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup(props){
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
      React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

      function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name,
          description,
        });

      }
    return (
    <PopupWithForm title="Редактировать профиль" name="profile" buttonText="Сохранить"
    isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_name"
        id="popup__input-name"
        type="text"
        placeholder="Введите имя"
        name="name"
        required=""
        minLength={2}
        maxLength={40}
        onChange={handleChangeName}
        value={name ? name : ''}
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
        onChange={handleChangeDescription}
        value={description ? description : ''}
      />
      <span className="popup__input-url-error popup__error "></span>
    </PopupWithForm>
)
}
export default EditProfilePopup;