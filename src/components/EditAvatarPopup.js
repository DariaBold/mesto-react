import React from "react";

import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const link = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      avatar: link.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_image"
        id="popup__input-avatar"
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar"
        required=""
        ref={link}
      />
      <span className="popup__input-avatar-error popup__error "></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
