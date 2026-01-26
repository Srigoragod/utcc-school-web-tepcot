document.addEventListener("DOMContentLoaded", () => {
  // Set the timeout duration (e.g., 5 seconds)
  const timeoutDuration = 3000; // 2000 milliseconds = 2 seconds

  setTimeout(() => {
    // Redirect to the home page
    window.location.href = "/";
  }, timeoutDuration);
});
