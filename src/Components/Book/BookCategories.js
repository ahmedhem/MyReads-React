const BookCategories = ({currentCategory, shelves, onChangeShelf}) => {
    return (
        <div className="book-shelf-changer">
            <select onChange={onChangeShelf} defaultValue={currentCategory}>
                <option value="notoptions" disabled>
                    Move to...
                </option>
                {
                    shelves.map((category) => {
                        const val = category.replace(/\s/g, "");
                        return (<option key={val} value={val}>{category}</option>)
                    })
                }
                <option value="none">
                    None
                </option>

            </select>
        </div>
    )
}
export default BookCategories;