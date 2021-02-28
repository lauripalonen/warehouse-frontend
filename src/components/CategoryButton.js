import React from 'react'

const CategoryButton = ({ category, handleClick, products}) => {
  if(!products){
    return (
      <div>loading...</div>
    )
  }

  const disabled = !(products.length > 0)

  return (
    <button
      disabled={disabled}
      onClick={(event) => handleClick(category, event)}>
      {category}
    </button>
  )
}

export default CategoryButton