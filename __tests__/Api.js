  import {getpeople} from '../src/js/resources/zumbieapi'

describe('Test Api Calls', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  test('Get People', async function() {
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' }))
  })
})