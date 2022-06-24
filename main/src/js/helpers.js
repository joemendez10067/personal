export const requestTimeout = function (seconds) {
  return new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error("Request took too long.")),
      seconds * 1000
    )
  );
};
