import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";

// Enables mocks on fetch in this entire application
const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();
