/* eslint-env jest */
import { getSpecificationFilterFromLink, getPagesArgs } from '../../constants/SearchHelpers'

describe('getSpecificationFilterFromLink', () => {
  it('should return the only specification in link', () => {
    const link = '/eletronicos/smartphones/Android 7.0?map=c,c,specificationFilter_20'
    const map = ['c', 'c']

    const filterMap = getSpecificationFilterFromLink(link, map)

    expect(filterMap).toBe('specificationFilter_20')
  })

  it('should return the first non-equal specification', () => {
    const link =
      '/eletronicos/smartphones/Android 7.0/3 GB?map=c,c,specificationFilter_20,specificationFilter_21'
    const map = ['c', 'c', 'specificationFilter_20']

    const filterMap = getSpecificationFilterFromLink(link, map)

    expect(filterMap).toBe('specificationFilter_21')
  })

  it('should return the duplicated specification', () => {
    const link =
      '/eletronicos/smartphones/Android 7.0/Android 7.1?map=c,c,specificationFilter_20,specificationFilter_20'
    const map = ['c', 'c', 'specificationFilter_20']

    const filterMap = getSpecificationFilterFromLink(link, map)

    expect(filterMap).toBe('specificationFilter_20')
  })

  it('should ignore the order of the elements', () => {
    const link =
      '/eletronicos/smartphones/3 GB/Android 7.1?map=c,c,specificationFilter_20,specificationFilter_21,specificationFilter_22'
    const map = ['c', 'c', 'specificationFilter_20', 'specificationFilter_22']

    const filterMap = getSpecificationFilterFromLink(link, map)

    expect(filterMap).toBe('specificationFilter_21')
  })

  it('should bail out if can\'t match the params', () => {
    const link = '/eletronics/smartphones/android 7.1?map=c,c,specificationFilter_20'
    const map = ['c', 'c', 'specificationFilter_21']

    const filterMap = getSpecificationFilterFromLink(link, map)

    expect(filterMap).toBe('specificationFilter_20')
  })
})

describe('getPagesArgs', () => {
  it('should stay in the search page', () => {
    const filterSpec = {
      type: 'Brands',
      Name: 'Samsung',
      rest: [],
      map: ['ft'],
      pagesPath: 'store/search',
      params: {
        term: 'samsung',
        _rest: '',
      },
    }

    const { page, query: { map, rest } } = getPagesArgs(filterSpec)

    expect(map).toEqual(['ft', 'b'])
    expect(rest).toEqual(['Samsung'])
    expect(page).toEqual('store/search')
  })

  it('should add single category on department page', () => {
    const filterSpec = {
      type: 'Categories',
      Name: 'Smartphones',
      path: 'Eletronicos/Smartphones',
      rest: [],
      map: ['c'],
      pagesPath: 'store/department',
      params: {
        department: 'eletronicos',
        _rest: '',
      },
    }

    const { query: { map, rest } } = getPagesArgs(filterSpec)

    expect(map).toEqual(['c', 'c'])
    expect(rest).toEqual(['Smartphones'])
  })

  it('should add single category on search page', () => {
    const filterSpec = {
      type: 'Categories',
      Name: 'Smartphones',
      path: 'Eletronicos/Smartphones',
      rest: [],
      map: ['ft'],
      pagesPath: 'store/search',
      params: {
        term: 'samsung',
        _rest: '',
      },
    }

    const { page, query: { map, rest } } = getPagesArgs(filterSpec)

    expect(page).toEqual('store/search')
    expect(map).toEqual(['ft', 'c', 'c'])
    expect(rest).toEqual(['Eletronicos', 'Smartphones'])
  })

  it('should only remove subcategory on category page', () => {
    const filterSpec = {
      type: 'Categories',
      isUnselectLink: true,
      Name: 'Acessórios',
      path: 'Eletronicos/Smartphones/Acessorios',
      rest: ['Acessorios'],
      map: ['c', 'c', 'c'],
      pagesPath: 'store/category',
      params: {
        department: 'Eletronicos',
        category: 'Smartphones',
        _rest: '',
      },
    }

    const { query: { map, rest } } = getPagesArgs(filterSpec)

    expect(map).toEqual(['c', 'c'])
    expect(rest).toEqual([])
  })

  it('should remove one sub-subcategory on subcategory page', () => {
    const filterSpec = {
      type: 'Categories',
      isUnselectLink: true,
      Name: 'foo',
      path: 'Eletronicos/Smartphones/Acessorios/foo',
      rest: ['Samsung', 'foo'],
      map: ['c', 'b', 'c', 'c', 'c'],
      pagesPath: 'store/subcategory',
      params: {
        department: 'Eletronicos',
        category: 'Smartphones',
        subcategory: 'Acessorios',
        _rest: '',
      },
    }

    const { query: { map, rest } } = getPagesArgs(filterSpec)

    expect(map).toEqual(['c', 'b', 'c', 'c'])
    expect(rest).toEqual(['Samsung'])
  })
})
