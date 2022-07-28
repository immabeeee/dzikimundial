// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { isDefined } from '../../../utils/src/lib/is-defined'
import { SortDirection } from './api-interfaces'

export class Page {
  public pageNumber: number
  public pageSize: number
  public totalElements: number | undefined
  public totalPages: number | undefined
  public rowsPerPageOptions: number[] = [10, 15, 20, 30, 50, 100]

  constructor(pageNumber: number, pageSize: number, totalElements?: number, totalPages?: number) {
    this.pageNumber = pageNumber
    this.pageSize = pageSize
    this.totalElements = isDefined(totalElements) ? totalElements : this.totalElements
    this.totalPages = isDefined(totalElements) ? totalPages : this.totalPages
  }
}

export class Filter {
  public name: string
  public value: any

  constructor(name: string, value: any) {
    this.name = name
    this.value = value
  }
}

export class Sort {
  public orderBy: SortDirection
  public sortBy: string

  constructor(sortBy: string, orderBy: SortDirection) {
    this.sortBy = sortBy
    this.orderBy = orderBy
  }
}

export class ListQuery {
  public page: Page
  public filters: Filter[]
  public sort?: Sort

  constructor(page: Page, filters: Filter[], sort?: Sort) {
    this.page = page
    this.filters = filters
    this.sort = sort
  }

  resetFilters(): ListQuery {
    return new ListQuery(this.page, [], this.sort as Sort)
  }

  setFilters(filters: Filter[]): ListQuery {
    const pageFirst = new Page(0, this.page.pageSize, this.page.totalElements, this.page.totalPages)

    return new ListQuery(pageFirst, filters, this.sort as Sort)
  }

  updateFilter(filter: Filter): ListQuery {
    const filters = this.filters.filter((e) => e.name !== e.name)

    const pageFirst = new Page(0, this.page.pageSize, this.page.totalElements, this.page.totalPages)

    return new ListQuery(pageFirst, [...filters, filter], this.sort as Sort)
  }

  updateFilters(filters: Filter[]): ListQuery {
    const pageFirst = new Page(0, this.page.pageSize, this.page.totalElements, this.page.totalPages)

    return new ListQuery(pageFirst, filters, this.sort as Sort)
  }

  updateSort(sort: Sort): ListQuery {
    return new ListQuery(this.page, this.filters, sort)
  }

  updatePage(pageNumber: number, pageSize: number, totalElements?: number, totalPages?: number): ListQuery {
    return new ListQuery(
      new Page(
        isDefined(pageNumber) ? pageNumber : this.page.pageNumber,
        isDefined(pageSize) ? pageSize : this.page.pageSize,
        isDefined(totalElements) ? totalElements : this.page.totalElements,
        isDefined(totalPages) ? totalPages : this.page.totalPages,
      ),
      this.filters,
      this.sort as Sort,
    )
  }

  nextPage(): ListQuery {
    return new ListQuery(new Page(this.page.pageNumber + 1, this.page.pageSize), this.filters, this.sort as Sort)
  }
}

export const generateDefaultListQuery = (pageNumber = 0, pageSize = 10, sortBy?: string, orderBy?: SortDirection) => {
  const sort = sortBy && orderBy && new Sort(sortBy, orderBy)

  return new ListQuery(new Page(pageNumber, pageSize), [], sort as Sort)
}
