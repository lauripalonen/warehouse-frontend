import React, { useState, useEffect } from 'react'
import productService from './services/products'
import ProductTable from './components/ProductTable'
import CategoryButton from './components/CategoryButton'

const App = () => {
  const [display, setDisplay] = useState('beanies')
  const [beanies, setBeanies] = useState([])
  const [facemasks, setFacemasks] = useState([])
  const [gloves, setGloves] = useState([])

  useEffect(() => {

    let eventSource = new EventSource('/api/stream')
    eventSource.onmessage = message => {
      console.log('received message: ', message)
      const beanieUpdate = message.find(m => m.category === 'beanies').products
      const facemaskUpdate = message.find(m => m.category === 'facemasks').products
      const glovesUpdate = message.find(m => m.category === 'gloves').products

      setBeanies(beanieUpdate)
      setFacemasks(facemaskUpdate)
      setGloves(glovesUpdate)
    }

    productService.getBeanies()
      .then(beanies => {
        setBeanies(beanies)
        setDisplay('beanies')
      })

    productService.getFacemasks()
      .then(facemasks => {
        setFacemasks(facemasks)
      })

    productService.getGloves()
      .then(gloves => {
        setGloves(gloves)
      })

  }, [])

  const handleClick = (category, event) => {
    event.preventDefault()
    setDisplay(category)
  }

  const Header = () => {
    return (
      <div className={'header'}>
        <CategoryButton category={'beanies'} handleClick={handleClick} products={beanies} />
        <CategoryButton category={'facemasks'} handleClick={handleClick} products={facemasks} />
        <CategoryButton category={'gloves'} handleClick={handleClick} products={gloves} />
        <h2 className={'display-text'}>Displaying: {display}</h2>
      </div>
    )
  }

  return (
    <div className={'container'}>
     <Header />
      <ProductTable
        beanies={beanies}
        facemasks={facemasks}
        gloves={gloves}
        category={display} />
    </div>
  )
}

export default App
