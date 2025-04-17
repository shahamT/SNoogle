
export function NoteTxt({ note }) {
    const { title, txt } = note.info


   

    return <article className='note-preview'>
        
        <h3>{title}</h3>
        <p>{txt}</p>
        {/* <p><span className='bold-txt'>Currency:</span> {listPrice.currencyCode}</p>
        {listPrice.isOnSale && <img className="on-sale-icon" src="/assets/booksImages/onSale.png.png" alt="" />}
        <img src={book.thumbnail} alt="" /> */}
    </article>

}