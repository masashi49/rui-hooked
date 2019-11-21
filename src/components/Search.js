import React, { useState } from "react";


const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
    <form className='search'>
      <input type="text"
             value={searchValue}
             onChange={handleSearchInputChanges}/>

      <input onClick={callSearchFunction} type="submit" value="検索"/>
    </form>
  )
}

export default Search

//テキストを入力するたびに handleSearchInputChangesが走る
//searchValueに値をsetされる
//submitでcallSearchFunctionが走る
//e.preventDefault()は、submitの挙動をキャンセル。(デフォルトアクションを通常どおりに行うべきではないとする)
// props.search(searchValue);する
//searchValueの中身を空にする