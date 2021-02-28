import React from 'react'
import { Column, Table } from 'react-virtualized'
import AutoSizer from 'react-virtualized-auto-sizer'
import 'react-virtualized/styles.css'

const ProductTable = ({ beanies, gloves, facemasks, category }) => {

  var products = ''
  switch(category){
    case('beanies'): products = beanies; break
    case('facemasks'): products = facemasks; break
    case('gloves'): products= gloves; break
    default: products = ''; break
  }

  if(products === ''){
    return <div></div>
  }

  if (products.length > 0) {
    return (
      <div className={'product-list'}>
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width}
              height={height}
              headerHeight={50}
              rowHeight={30}
              rowCount={products.length}
              rowGetter={({ index }) => products[index]}>
              <Column width={250} label="Name" dataKey="name" />
              <Column width={150} label="Availability" dataKey="availability" />
              <Column width={80} label="Price" dataKey="price" />
              <Column width={150} label="Manufacturer" dataKey="manufacturer" />
              <Column width={100} label="Color" dataKey="color" />
            </Table>
          )}
        </AutoSizer>
      </div>
    )
  }

  return (
    <div>
      loading...
    </div>
  )

}

export default ProductTable