// api key not stored in env variable as: client side applications as this pure HTML/JavaScript application without a backend server or build tool cannot directly access or imprt env variables securely

const UNSPLASH_ACCESS_KEY = "irQVnnp1LzOnbNXR92Fi8TKoy4zCBHw71iZ5NF-AHo8";
const IMAGE_COUNT_PER_PAGE = 4; // number of images to fetch per request

let currentPage = 1;
let isLoading = false;
let hasMore = true;

const imageContainer = document.getElementById("image-container");
const loadingIndicator = document.getElementById("loading");

async function fetchImages(page) {
  if (
    !UNSPLASH_ACCESS_KEY ||
    UNSPLASH_ACCESS_KEY === "YOUR_UNSPLASH_ACCESS_KEY"
  ) {
    console.error(
      'Unsplash Access Key is missing or invalid.'
    );
    loadingIndicator.innerHTML =
      '<p class="text-red-500">Error: Unsplash Access Key is missing or invalid.';
    return [];
  }

  isLoading = true;
  loadingIndicator.classList.remove("hidden");

  const apiUrl = `https://api.unsplash.com/photos?page=${page}&per_page=${IMAGE_COUNT_PER_PAGE}&client_id=${UNSPLASH_ACCESS_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      // for HTTP errors
      const errorData = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          errorData.errors ? errorData.errors.join(", ") : "Unknown error"
        }`
      );
    }
    const data = await response.json();
    if (data.length === 0) {
      hasMore = false; 
    }
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    loadingIndicator.innerHTML = `<p class="text-red-500">Failed to load images: ${error.message}. Please try again later.</p>`;
    hasMore = false; // stops trying to load more in case of errors
    return [];
  } finally {
    isLoading = false;
    loadingIndicator.classList.add("hidden");
  }
}

function displayImage(imageData) {
  const imageItem = document.createElement("div");
  imageItem.classList.add("image-item");

  const img = document.createElement("img");
  img.src = imageData.urls.small;
  img.alt = imageData.alt_description || "Unsplash Image";
  img.loading = "lazy"; // lazy loading images

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("image-info");

  const photographer = document.createElement("p");
  photographer.classList.add("text-gray-700", "text-sm", "font-semibold");
  photographer.textContent = `By: ${imageData.user.name}`;

  const description = document.createElement("p");
  description.classList.add(
    "text-gray-600",
    "text-xs",
    "mt-1",
    "line-clamp-2"
  );
  description.textContent =
    imageData.description ||
    imageData.alt_description ||
    "No description available.";

  infoDiv.appendChild(photographer);
  infoDiv.appendChild(description);

  imageItem.appendChild(img);
  imageItem.appendChild(infoDiv);

  imageContainer.appendChild(imageItem);
}

// loads and display more images
async function loadMoreImages() {
  if (isLoading || !hasMore) {
    return;
  }

  const images = await fetchImages(currentPage);
  images.forEach(displayImage);
  currentPage++;
}


function isNearBottom() {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  // triggers load when user is within 500px of the bottom
  return scrollTop + clientHeight >= scrollHeight - 500;
}

// debounce function to limit how often a function is called
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

// event listener for infinite scroll
const debouncedScrollHandler = debounce(() => {
  if (isNearBottom()) {
    loadMoreImages();
  }
}, 200); 

window.addEventListener("scroll", debouncedScrollHandler);


window.onload = () => {
  loadMoreImages();
};