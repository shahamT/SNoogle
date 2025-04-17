const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    
    const [isShowFullTxt, setIsShowFullTxt] = useState(false)

    function onToggleIsShowFullTxt() {
        setIsShowFullTxt(isShowFullTxt => !isShowFullTxt)
    }

    const isLongText = txt.length > length
    const textToShow = (isShowFullTxt || !isLongText) ? txt : (txt.substring(0, length)) + '...'
    return (
        <section className="long-txt">
                <p className="txt">{textToShow}</p>
                {isLongText &&
                    <div>
                        <button className="show-txt-btn" onClick={onToggleIsShowFullTxt}>
                            {isShowFullTxt ? 'Show Less' : 'Read More'}
                        </button>
                    </div>
                }
        </section>
    );
}