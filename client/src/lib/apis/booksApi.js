export const booksApi = async (query, startIndex, maxResults) => {
  const apiKey = "AIzaSyDJRTvCt97uOOPTy9deEGXcmKghbyzjwLs";
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("failed to fetch books");
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    throw new Error(error.message);
  }
};
