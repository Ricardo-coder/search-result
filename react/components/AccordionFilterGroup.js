import React from 'react'
import { useIntl } from 'react-intl'
import classNames from 'classnames'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import AccordionFilterItem from './AccordionFilterItem'
import FacetCheckboxList from './FacetCheckboxList'
import useSelectedFilters from '../hooks/useSelectedFilters'

import { getFilterTitle } from '../constants/SearchHelpers'
import { searchSlugify } from '../utils/slug'

const CSS_HANDLES = ['accordionFilterOpen']

const AccordionFilterGroup = ({
  className,
  title,
  facets,
  show,
  open,
  onOpen,
  onFilterCheck,
  onClearFilter,
  showClearByFilterOnMobile,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const filters = useSelectedFilters(facets)
  const quantitySelected = filters.filter(facet => facet.selected).length
  const intl = useIntl()
  const facetTitle = getFilterTitle(title, intl)
  const slugifiedFacetTitle = searchSlugify(facetTitle)
  const facetKey = filters.length > 0 ? filters[0].key : null

  return (
    <AccordionFilterItem
      facetKey={facetKey}
      title={title}
      open={open}
      show={show}
      onOpen={onOpen}
      quantitySelected={quantitySelected}
      onFilterCheck={onFilterCheck}
      onClearFilter={onClearFilter}
      showClearByFilterOnMobile={showClearByFilterOnMobile}
    >
      <div
        className={classNames(
          applyModifiers(handles.accordionFilterOpen, slugifiedFacetTitle),
          className
        )}
      >
        <FacetCheckboxList
          onFilterCheck={onFilterCheck}
          facets={filters}
          facetTitle={facetTitle}
        />
      </div>
    </AccordionFilterItem>
  )
}

export default AccordionFilterGroup
