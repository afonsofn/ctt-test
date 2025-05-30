import "@testing-library/jest-dom";

import { resetMockData, setupFetchMock } from "../__mocks__/fetchMock";

beforeEach(() => {
  setupFetchMock();
  resetMockData();
});
