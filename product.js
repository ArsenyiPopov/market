document.addEventListener("DOMContentLoaded", function() {
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function loadProductDetail(productId) {
        fetch('/data.json')
            .then(response => response.json())
            .then(products => {
                const product = products.find(p => p.id === parseInt(productId));
                if (product) {
                    displayProductDetail(product);
                } else {
                    console.error('Product not found');
                }
            })
            .catch(error => console.error('Error fetching product data:', error));
    }

    function displayProductDetail(product) {
        const productDetailContainer = document.getElementById('product-detail');
        productDetailContainer.innerHTML = `
            <div class="flex flex-col items-center bg-white shadow p-4">
                <h1 class="text-2xl font-bold">${product.name}</h1>
                <img src="${product.image}" alt="${product.name}" class="my-4">
                <p class="text-lg">${product.category}</p>
                <p class="text-xl font-bold text-accentText">$ ${product.price}</p>
                <p class="mt-4">${product.description}</p>
            </div>
        `;
    }

    const productId = getUrlParameter('id');
    if (productId) {
        loadProductDetail(productId);
    } else {
        console.error('No product ID in URL');
    }
});
