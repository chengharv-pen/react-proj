import { expect, test } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../custom-hooks/useBreedList";

// Faking a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});

// Hooks only work inside a component, so is there a way to test it outside?
// Answer: No, so we will make a React component

// ----------------- The old way -----------------
// function getBreedList(animal) {
//   let list;

//   function TestComponent() {
//     list = useBreedList(animal);
//     return null;
//   }

//   render(
//     <QueryClientProvider client={queryClient}>
//       <TestComponent />
//     </QueryClientProvider>
//   );

//   return list;
// }

// test("gives an empty list with no animal provided", async () => {
//   const [breedList, status] = getBreedList();
//   expect(breedList).toHaveLength(0);
//   expect(status).toBe("loading");
// });
// -------------------------------------------------------------------------------------

// New way
test("gives an empty list with no animal", async () => {
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
});

// Testing an API request.
// A mocked breedlist is passed to the request.
// When the result is received, the test validates the request was successful and checks the breeds returned are equal to the mocked data.
test("gives back breeds when given an animal", async () => {
  const breeds = [
    "Havanese",
    "Bichon Frise",
    "Poodle",
    "Maltese",
    "Golden Retriever",
    "Labrador",
    "Husky",
  ];

  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    })
  );

  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  // await is used to delay running expect() until all the data is fetched.
  await waitFor(() => expect(result.current[1]).toBe("success"));

  const [breedList] = result.current;
  expect(breedList).toEqual(breeds);
});
