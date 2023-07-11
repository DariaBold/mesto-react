
function PopupWithForm (props) {
    return (
    <div className={`popup ${props.isOpen && "popup_opened"}`} id={props.name} >
        <div className="popup__container">
        <button
            className="popup__close"
            type="button"
            aria-label="Закрыть"
            onClick={props.onClose}
        ></button>
        <form className="popup__form" name="form" noValidate="" onSubmit={props.onSubmit}>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button
                className="popup__save popup__save_disabled"
                type="submit"
                value={props.buttonText}
                disabled=""
            >{props.buttonText}
            </button>
        </form>
        </div>
    </div>
    )
}
export default PopupWithForm;