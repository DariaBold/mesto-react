function ImagePopup ({card, onClose, isOpen}) {
    return (
    <>
    <template id="elements-template" />
    <div className={`popup ${isOpen && "popup_opened"}`} id="photo">
        <div className="popup__photo">
        <button
            className="popup__close"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
        ></button>
        <img className="popup__image" name="image" alt={card.name} src={card.link}/>
        <p className="popup__description">{card.name}</p>
        </div>
    </div>
    </>
  )
}
export default ImagePopup;