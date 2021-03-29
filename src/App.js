import React, { useState, useEffect } from 'react'
import productService from './services/products'
import ProductTable from './components/ProductTable'
import CategoryButton from './components/CategoryButton'
import UpdateStatus from './components/UpdateStatus'

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : ''

const App = () => {
  const [display, setDisplay] = useState('')
  const [beanies, setBeanies] = useState([])
  const [facemasks, setFacemasks] = useState([])
  const [gloves, setGloves] = useState([])
  const [updateStatus, setUpdateStatus] = useState('')

  useEffect(() => {
    let eventSource = new EventSource(`${baseUrl}/api/stream`)
    eventSource.onopen = () => {
      setUpdateStatus('checking for updates')
    }
    eventSource.onmessage = message => {
      const products = JSON.parse(message.data)

      if (products) {
        const beaniesUpdate = products.find(product => product.category === 'beanies')
        const facemaskUpdate = products.find(product => product.category === 'facemasks')
        const glovesUpdate = products.find(product => product.category === 'gloves')

        if (beaniesUpdate) {
          setBeanies(beaniesUpdate)
        }
        if (facemaskUpdate) {
          setFacemasks(facemaskUpdate)
        }
        if (glovesUpdate) {
          setGloves(glovesUpdate)
        }
      }

      eventSource.close()
      setUpdateStatus('everything up-to-date!')
      setTimeout(() => {
        setUpdateStatus('')
      }, 5000)
    }
  }, [])

  useEffect(() => {
    const cachedBeanies = sessionStorage.getItem('beanies')
    const cachedFacemasks = sessionStorage.getItem('facemasks')
    const cachedGloves = sessionStorage.getItem('gloves')

    if (cachedBeanies) {
      setBeanies(JSON.parse(cachedBeanies))
      setDisplay('beanies')
    } else {
      productService.getBeanies()
        .then(beanies => {
          setBeanies(beanies)
          setDisplay('beanies')
          sessionStorage.setItem('beanies', JSON.stringify(beanies))
        })
    }

    if (cachedFacemasks) {
      setFacemasks(JSON.parse(cachedFacemasks))
    } else {
      productService.getFacemasks()
        .then(facemasks => {
          setFacemasks(facemasks)
          sessionStorage.setItem('facemasks', JSON.stringify(facemasks))
        })
    }

    if (cachedGloves) {
      setGloves(JSON.parse(cachedGloves))
    } else {
      productService.getGloves()
        .then(gloves => {
          setGloves(gloves)
          sessionStorage.setItem('gloves', JSON.stringify(gloves))
        })
    }
  }, [])

  const handleClick = (category, event) => {
    event.preventDefault()
    setDisplay(category)
  }

  const Header = () => {
    return (
      <div className={'header'}>
        <CategoryButton category={'beanies'} products={beanies} handleClick={handleClick} display={display} />
        <CategoryButton category={'facemasks'} products={facemasks} handleClick={handleClick} display={display} />
        <CategoryButton category={'gloves'} products={gloves} handleClick={handleClick} display={display} />
        <UpdateStatus status={updateStatus} />
      </div>
    )
  }

  return (
    <div className={'container'}>
      <Header />
      {display === '' ? <div>loading...</div> : <div></div>}
      <ProductTable products={beanies} display={display} />
      <ProductTable products={facemasks} display={display} />
      <ProductTable products={gloves} display={display} />
    </div>
  )
}

export default App
