function Card({card, onCardClick}) {
    function handleClick () {
        onCardClick(card);
      } 
    return (
        <article className="elements__card">
        <img className="elements__image" alt={card.name} src={card.link} onClick={handleClick}/>
        <button
          className="elements__trash"
          type="button"
          name="trash"
          aria-label="Удалить"
        ></button>
        <div className="elements__text">
          <h2 className="elements__title">{card.name}</h2>
          <button
            className="elements__like"
            type="button"
            name="like"
            aria-label="Нравится"
          ></button>
          <span className="elements__counter">0</span>
        </div>
      </article>
    )
}
export default Card;