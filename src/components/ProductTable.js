import React from 'react'
import { Column, Table } from 'react-virtualized'
import AutoSizer from 'react-virtualized-auto-sizer'
import 'react-virtualized/styles.css'

const ProductTable = ({ products, display }) => {
  if (!products || display !== products.category) {
    return <div></div>
  }

  const catalog = products.catalog

  if (catalog.length > 0) {
    return (
      <div className={'product-list'}>
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width}
              height={height}
              headerHeight={50}
              rowHeight={30}
              rowCount={catalog.length}
              rowGetter={({ index }) => catalog[index]}>
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