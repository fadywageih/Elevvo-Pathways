document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = [
        {
            id: 1,
            title: "Getting Started with React Hooks",
            description: "Learn how to use React Hooks to simplify your functional components and manage state effectively.",
            image: "https://picsum.photos/400/300",
            date: "May 15, 2023",
            category: "tech",
        },
        {
            id: 2,
            title: "My Journey Through the Italian Countryside",
            description: "Exploring the beautiful landscapes and delicious cuisine of Tuscany and Umbria.",
            image: "https://picsum.photos/200/200",
            date: "April 22, 2023",
            category: "travel",
        },
        {
            id: 3,
            title: "The Perfect Homemade Pizza Recipe",
            description: "After years of experimentation, I've perfected my homemade pizza recipe. Here's how you can make it too!",
            image: "https://picsum.photos/300/300",
            date: "March 30, 2023",
            category: "food",
        },
        {
            id: 4,
            title: "Why I Switched to a Standing Desk",
            description: "After experiencing back pain from sitting all day, I made the switch to a standing desk. Here's what I learned.",
            image: "https://picsum.photos/500/300",
            date: "March 12, 2023",
            category: "lifestyle",
        },
        {
            id: 5,
            title: "Top 5 JavaScript Frameworks in 2023",
            description: "A comparison of the most popular JavaScript frameworks and when to use each one.",
            image: "https://picsum.photos/400/100",
            date: "February 28, 2023",
            category: "tech",
        },
        {
            id: 6,
            title: "Hiking the Swiss Alps: A Complete Guide",
            description: "Everything you need to know to plan your perfect hiking trip in the Swiss Alps.",
            image: "https://picsum.photos/250/300",
            date: "February 15, 2023",
            category: "travel",
        },
        {
            id: 7,
            title: "My Favorite Coffee Shops in Portland",
            description: "After living in Portland for 5 years, these are my top picks for the best coffee in the city.",
            image: "https://picsum.photos/400/300",
            date: "January 22, 2023",
            category: "food"
        },
        {
            id: 8,
            title: "Minimalism: Living With Less",
            description: "How adopting a minimalist lifestyle helped me reduce stress and focus on what matters.",
            image: "https://picsum.photos/400/300",
            date: "January 10, 2023",
            category: "lifestyle"
        },
        {
            id: 9,
            title: "Building a REST API with Node.js",
            description: "A step-by-step guide to creating your own REST API using Node.js and Express.",
            image: "https://picsum.photos/400/300",
            date: "December 5, 2022",
            category: "tech"
        }
    ];
    const blogPostsContainer = document.getElementById('blogPosts');
    const searchInput = document.getElementById('searchInput');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageInfo = document.getElementById('pageInfo');
    const postsPerPage = 6;
    let currentPage = 1;
    let filteredPosts = [...blogPosts];
    let currentCategory = 'all';
    function initBlog() {
        renderPosts();
        updatePagination();
    }
    function renderPosts() {
        blogPostsContainer.innerHTML = '';
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToDisplay = filteredPosts.slice(startIndex, endIndex);

        if (postsToDisplay.length === 0) {
            blogPostsContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-xl font-medium text-gray-700">No posts found</h3>
                    <p class="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }
        postsToDisplay.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow';
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xs font-semibold px-2 py-1 rounded-full ${getCategoryColor(post.category)}">
                            ${capitalizeFirstLetter(post.category)}
                        </span>
                    </div>
                    <h2 class="text-xl font-bold mb-2">${post.title}</h2>
                    <p class="text-gray-600 mb-4">${post.description}</p>
                    <div class="flex justify-between items-center text-sm text-gray-500">
                        <span>${post.date}</span>
                        <a href="#" class="text-indigo-600 hover:text-indigo-800 font-medium">Read more →</a>
                    </div>
                </div>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    }
    function updatePagination() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
    function filterBySearch(term) {
        filteredPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(term.toLowerCase()) ||
            post.description.toLowerCase().includes(term.toLowerCase())
        );
        
        if (currentCategory !== 'all') {
            filteredPosts = filteredPosts.filter(post => post.category === currentCategory);
        }
        
        currentPage = 1;
        renderPosts();
        updatePagination();
    }
    function filterByCategory(category) {
        currentCategory = category;
        
        if (category === 'all') {
            filteredPosts = [...blogPosts];
        } else {
            filteredPosts = blogPosts.filter(post => post.category === category);
        }
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            filteredPosts = filteredPosts.filter(post => 
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        currentPage = 1;
        renderPosts();
        updatePagination();
        categoryButtons.forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.remove('bg-gray-200', 'text-gray-700');
                btn.classList.add('bg-indigo-600', 'text-white');
            } else {
                btn.classList.remove('bg-indigo-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            }
        });
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function getCategoryColor(category) {
        const colors = {
            tech: 'bg-blue-100 text-blue-800',
            travel: 'bg-green-100 text-green-800',
            food: 'bg-yellow-100 text-yellow-800',
            lifestyle: 'bg-purple-100 text-purple-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    }
    searchInput.addEventListener('input', (e) => {
        filterBySearch(e.target.value.trim());
    });
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterByCategory(btn.dataset.category);
        });
    });
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
            updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderPosts();
            updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    initBlog();
});