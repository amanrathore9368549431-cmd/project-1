const restaurants = [
  {
    name: "Pizza Palace",
    category: "Pizza",
    description: "Italian Pizza, Garlic Bread",
    price: 250,
    rating: 4.3,
    time: "25-30 min",
    image: "https://images.unsplash.com/photo- pizza"
  },
  {
    name: "Burger House",
    category: "Burger",
    description: "Burgers, Fries, Fast Food",
    price: 180,
    rating: 4.2,
    time: "20-25 min",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Royal Biryani",
    category: "Biryani",
    description: "Chicken Biryani, Indian Food",
    price: 220,
    rating: 4.5,
    time: "30-35 min",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Chinese Wok",
    category: "Chinese",
    description: "Noodles, Manchurian, Momos",
    price: 200,
    rating: 4.1,
    time: "25-30 min",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Sweet Treats",
    category: "Dessert",
    description: "Cakes, Ice Cream, Brownies",
    price: 150,
    rating: 4.4,
    time: "20-25 min",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "South Indian Cafe",
    category: "South Indian",
    description: "Dosa, Idli, Uttapam",
    price: 130,
    rating: 4.3,
    time: "20-30 min",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80"
  }
];

// Correct the first restaurant image separately
restaurants[0].image =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80";

const grid = document.getElementById("restaurantGrid");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("search");
const heroInput = document.getElementById("heroInput");
const toast = document.getElementById("toast");

let activeCategory = "All";

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function renderRestaurants() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = restaurants.filter((restaurant) => {
    const matchesCategory =
      activeCategory === "All" ||
      restaurant.category === activeCategory;

    const matchesSearch =
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.category.toLowerCase().includes(query) ||
      restaurant.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map((restaurant) => `
    <article class="restaurant-card">
      <img
        class="restaurant-image"
        src="${restaurant.image}"
        alt="${restaurant.name}"
        loading="lazy"
      >

      <div class="restaurant-info">
        <div class="restaurant-heading">
          <h3>${restaurant.name}</h3>
          <span class="rating">★ ${restaurant.rating}</span>
        </div>

        <p>${restaurant.description}</p>
        <p>Delivery in ${restaurant.time}</p>

        <div class="restaurant-bottom">
          <span class="price">₹${restaurant.price} for one</span>
          <button
            class="view-btn"
            data-name="${restaurant.name}"
          >View</button>
        </div>
      </div>
    </article>
  `).join("");

  noResults.hidden = filtered.length > 0;
}

document.querySelectorAll(".category").forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    document.querySelectorAll(".category").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    renderRestaurants();
  });
});

searchInput.addEventListener("input", renderRestaurants);

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  renderRestaurants();
  document.getElementById("restaurants").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("heroForm").addEventListener("submit", (event) => {
  event.preventDefault();
  searchInput.value = heroInput.value;
  activeCategory = "All";

  document.querySelectorAll(".category").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.category === "All"
    );
  });

  renderRestaurants();
  document.getElementById("restaurants").scrollIntoView({
    behavior: "smooth"
  });
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest(".view-btn");

  if (button) {
    showToast(
      `${button.dataset.name}: Demo restaurant. Online ordering is not connected yet.`
    );
  }
});

document.getElementById("loginBtn").addEventListener("click", () => {
  showToast("Login feature needs a backend to work.");
});

renderRestaurants();