import React from 'react'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'progressBarContainer',
  'progressBar',
  'progressBarFiller',
]

const SearchProductsProgressBar = () => {
  const { searchQuery } = useSearchPage()

  const handles = useCssHandles(CSS_HANDLES)
  const products = searchQuery?.data?.productSearch?.products ?? []
  const recordsFiltered = searchQuery?.data?.productSearch?.recordsFiltered ?? 0

  const productsLoadedPercentage = Math.round(
    (100 * products.length) / recordsFiltered
  )
  if (products.length === 0) {
    return null
  }

  return (
    <div
      className={`${handles.progressBarContainer} flex justify-center items-center`}
    >
      <div
        className={`${handles.progressBar} relative flex bg-action-secondary items-center mv4 br-pill w-50 w-30-m w-25-l h1`}
      >
        <span
          className={`${handles.progressBarFiller} absolute br-pill bg-action-primary h1`}
          style={{ width: `${productsLoadedPercentage}%` }}
        />
      </div>
    </div>
  )
}

export default SearchProductsProgressBar
