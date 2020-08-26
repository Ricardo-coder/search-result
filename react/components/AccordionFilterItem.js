import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import classNames from 'classnames'
import { Tag } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { IconCaret } from 'vtex.store-icons'

import { getFilterTitle } from '../constants/SearchHelpers'
import { Collapse } from 'react-collapse'

const CSS_HANDLES = [
  'accordionFilterContainer',
  'accordionFilterContent',
  'accordionFilterItem',
  'filterAccordionItemBox',
  'accordionFilterItemActive',
  'accordionFilterItemHidden',
  'accordionFilterItemTitle',
  'accordionFilterItemTag',
  'accordionFilterItemIcon',
]

const AccordionFilterItem = ({
  title,
  show,
  open,
  onOpen,
  quantitySelected = 0,
  intl,
  children,
  navigationType,
  initiallyCollapsed,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const isNavigationCollapsible = navigationType === 'collapsible'
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed)

  const handleOnOpen = e => {
    if (isNavigationCollapsible) {
      setIsCollapsed(isCollapsed => !isCollapsed)
    }

    onOpen(e)
  }
  const handleKeyDown = e => {
    if (e.key === ' ') {
      handleOnOpen(e)
    }
  }

  return (
    <Fragment>
      {(!open || isNavigationCollapsible) && (
        <div className={`${handles.accordionFilterContainer} pl7`}>
          <div
            role="button"
            tabIndex={0}
            className={classNames(
              handles.accordionFilterItem,
              handles.filterAccordionItemBox,
              't-body pr5 pv3 pointer bb b--muted-5 outline-0',
              {
                [handles.accordionFilterItemActive]: open,
                [`${handles.accordionFilterItemHidden} dn`]: !show,
              }
            )}
            onKeyDown={handleKeyDown}
            onClick={handleOnOpen}
          >
            <div
              className={classNames(
                handles.accordionFilterContent,
                'pv4 c-on-base',
                {
                  't-small': open,
                  't-heading-5': !open,
                }
              )}
            >
              <span className={handles.accordionFilterItemTitle}>
                {getFilterTitle(title, intl)}
              </span>
              {quantitySelected !== 0 && (
                <div
                  className={classNames(
                    handles.accordionFilterItemTag,
                    'dib ml3'
                  )}
                >
                  <Tag>{quantitySelected}</Tag>
                </div>
              )}
              <span className={`${handles.accordionFilterItemIcon} fr`}>
                <IconCaret
                  orientation={
                    !isNavigationCollapsible ||
                    (isNavigationCollapsible && isCollapsed)
                      ? 'down'
                      : 'up'
                  }
                  size={10}
                />
              </span>
            </div>
          </div>
        </div>
      )}
      {!isNavigationCollapsible ? (
        open && children
      ) : (
        <Collapse isOpened={!isCollapsed && isNavigationCollapsible}>
          <div className="pl8">{children}</div>
        </Collapse>
      )}
    </Fragment>
  )
}

AccordionFilterItem.propTypes = {
  /** Title */
  title: PropTypes.string,
  /** Whether to show any of the content */
  show: PropTypes.bool,
  /** Whether to show the filter options */
  open: PropTypes.bool,
  /** Callback to open event */
  onOpen: PropTypes.func,
  /** Quantity of selected filters */
  quantitySelected: PropTypes.number,
  /** Intl instance */
  intl: intlShape,
  /** content */
  children: PropTypes.node,
  /** Defines the navigation method: 'page' or 'collapsible' */
  navigationType: PropTypes.oneOf(['page', 'collapsible']),
  /** Makes the search filters start out collapsed (`true`) or open (`false`) */
  initiallyCollapsed: PropTypes.bool,
}

export default injectIntl(AccordionFilterItem)
