// 1. import the class we want to test
const DealerService = require('../dealerService');

// 2. create a test suite for the class (MOCKING THE DATABASE)
describe('DealerService', () => {
  let mockRepository;
  let dealerService;

  // 3. before each test, create a new instance of the class with a mocked repository
  beforeEach(() => {
    // we create a mock repository object with the methods that our service will call.
    mockRepository = {
      getAllDealersWithCarCount: jest.fn(),
    }
    // we pass the mocked repository to the service when we create an instance of it
    dealerService = new DealerService(mockRepository);
  })

  test('getAllDealersWithCarCount should return a list of dealers with car count', async () => {
    // 4. arrange - set up the mock to return a specific value
    const mockDealers = [
      { id: 1, name: 'Dealer One', carCount: 5 },
      { id: 2, name: 'Dealer Two', carCount: 3 },
    ];
    // when the service calls the repository method, it will return our mockDealers array
    mockRepository.getAllDealersWithCarCount.mockResolvedValue(mockDealers);

    // 5. act - call the method we want to test
    const result = await dealerService.getDealers();

    // 6. assert - check that the result is what we expect
    expect(result).toEqual(mockDealers);
    // also check that the repository method was called once
    // this ensures that our service actually used the repository.
    expect(mockRepository.getAllDealersWithCarCount).toHaveBeenCalledTimes(1);
  });

})
