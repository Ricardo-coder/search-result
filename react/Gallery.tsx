import React from 'react'
import GalleryLayout, { GalleryLayoutPropsWithSlots } from './GalleryLayout'
//@ts-ignore
import GalleryLegacy from './GalleryLegacy'

export type MobileLayoutMode = 'normal' | 'small' | 'inline'

export interface GalleryLegacyProps {
  lazyItemsRemaining: number
  maxItemsPerRow: number
  minItemWidth: number
  mobileLayoutMode: MobileLayoutMode
  products: any[]
  showingFacets: boolean
  summary: any
}

const Gallery: React.FC<
  GalleryLegacyProps | GalleryLayoutPropsWithSlots
> = props => {
  if ('layouts' in props && props.layouts.length > 0) {
    const {
      layouts,
      lazyItemsRemaining,
      products,
      showingFacets,
      summary,
      ...slots
    } = props as GalleryLayoutPropsWithSlots

    return (
      <GalleryLayout
        layouts={layouts}
        lazyItemsRemaining={lazyItemsRemaining}
        products={products}
        showingFacets={showingFacets}
        summary={summary}
        slots={slots}
      />
    )
  }

  return <GalleryLegacy {...(props as GalleryLegacyProps)} />
}

export default Gallery