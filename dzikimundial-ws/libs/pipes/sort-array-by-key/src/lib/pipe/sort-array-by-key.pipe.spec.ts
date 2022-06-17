import { SortArrayByKeyPipe } from './sort-array-by-key.pipe'

describe('TitleCasePipe', () => {
  const pipe = new SortArrayByKeyPipe()

  it('should sort array', () => {
    // given
    const array0 = [
      { id: 0, name: 'lorem 0' },
      { id: 1, name: 'lorem 1' },
      { id: 2, name: 'lorem 2' },
      { id: 3, name: 'lorem 3' },
    ]
    const array1 = [
      { id: 0, name: 'lorem 0' },
      { id: 3, name: 'lorem 1' },
      { id: 1, name: 'lorem 2' },
      { id: 2, name: 'lorem 3' },
    ]
    const array2 = [
      { id: 0, name: 'lorem ' },
      { id: 1, name: 'lorem 1' },
      { id: 2, name: 'lorem 2' },
      { id: 1, name: 'lorem 3' },
    ]
    const array3 = [] as any[]
    const array4 = [{}, {}]
    const array5 = ['lorem 1', 'lorem 2']

    // when
    const result0 = pipe.transform(array0, 'id')
    const result1 = pipe.transform(array1, 'id')
    const result2 = pipe.transform(array2, 'id')
    const result3 = pipe.transform(array3, 'id')
    const result4 = pipe.transform(array4, 'id')
    const result5 = pipe.transform(array5, 'id')

    // then
    expect(result0).toEqual([
      { id: 0, name: 'lorem 0' },
      { id: 1, name: 'lorem 1' },
      { id: 2, name: 'lorem 2' },
      { id: 3, name: 'lorem 3' },
    ])
    expect(result1).toEqual([
      { id: 0, name: 'lorem 0' },
      { id: 1, name: 'lorem 2' },
      { id: 2, name: 'lorem 3' },
      { id: 3, name: 'lorem 1' },
    ])
    expect(result2).toEqual([
      { id: 0, name: 'lorem ' },
      { id: 1, name: 'lorem 1' },
      { id: 1, name: 'lorem 3' },
      { id: 2, name: 'lorem 2' },
    ])
    expect(result3).toEqual([])
    expect(result4).toEqual([{}, {}])
    expect(result5).toEqual(['lorem 1', 'lorem 2'])
  })
})
