import React from 'react'

const CategoryButton = ({ category, products, handleClick, display }) => {
  const disabled = (!products.catalog || products.catalog.length === 0)
  var bgColor = 'white'
  var fontColor = '#ff5544'

  if (display === category) {
    bgColor = '#ff5544'
    fontColor = 'white'
  }

  const styles = {
    backgroundColor: bgColor,
    color: fontColor,
  }

  return (
    <button
      style={styles}
      disabled={disabled}
      onClick={(event) => handleClick(category, event)}>
      {category}
    </button>
  )
}

export default CategoryButton