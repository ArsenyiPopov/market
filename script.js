const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '',
    },
  });


// первый способ создание карточки
  
//   document.addEventListener("DOMContentLoaded", function() {
//     function createProductCard(product) {
//         const cardDiv = document.createElement('div');
//         cardDiv.className = 'flex flex-col items-center bg-white max-h-[330px] max-w-[255px]';

//         const recommendDiv = document.createElement('div');
//         recommendDiv.className = 'my-3';
//         const recommendP = document.createElement('p');
//         recommendP.textContent = 'Recommend';
//         recommendDiv.appendChild(recommendP);
//         cardDiv.appendChild(recommendDiv);

//         const productContainerDiv = document.createElement('div');
//         productContainerDiv.className = 'flex flex-col items-center w-full py-6 border-y-2 border-solid border-primaryBorder';
//         const productImageDiv = document.createElement('div');
//         productImageDiv.className = 'flex flex-col items-center';
//         const productImageA = document.createElement('a');
//         productImageA.href = '#';
//         const productImage = document.createElement('img');
//         productImage.src = product.image;
//         productImage.alt = 'product';
//         productImageA.appendChild(productImage);
//         productImageDiv.appendChild(productImageA);
//         productContainerDiv.appendChild(productImageDiv);

//         const productNameDiv = document.createElement('div');
//         productNameDiv.className = 'mt-6';
//         const productNameA = document.createElement('a');
//         productNameA.href = '#';
//         productNameA.textContent = product.name;
//         productNameDiv.appendChild(productNameA);
//         productContainerDiv.appendChild(productNameDiv);
//         cardDiv.appendChild(productContainerDiv);

//         const priceDiv = document.createElement('div');
//         priceDiv.className = 'my-4';
//         const priceP = document.createElement('p');
//         priceP.className = 'font-bold text-accentText';
//         priceP.textContent = `$ ${product.price}`;
//         priceDiv.appendChild(priceP);
//         cardDiv.appendChild(priceDiv);

//         return cardDiv;
//     }

//     fetch('/data.json')
//     .then(response => response.json())
//     .then(products => {
//         const productContainer = document.getElementById('product-container');
//         products.forEach(product => {
//             const productCard = createProductCard(product);
//             productContainer.appendChild(productCard);
//         });
//     })
//     .catch(error => console.error('Error fetching product data:', error));
// });

// второй способ создание карточки 

document.addEventListener("DOMContentLoaded", function() {
    // Функция для создания карточки товара в основном списке
    function createProductCard(product) {
        const template = `
            <div class="flex flex-col items-center bg-white max-h-[330px] max-w-[255px] shadow" data-id="${product.id}">
                <div class="my-3">
                    <p>${product.category}</p>
                </div>
                <div class="flex flex-col items-center w-full py-6 border-y-2 border-solid border-primaryBorder">
                    <div class="flex flex-col items-center click_viewed">
                        <a href="product.html?id=${product.id}" class="click_viewed">
                            <img src="${product.image}" alt="product">
                        </a>
                    </div>
                    <div class="mt-6 click_viewed">
                        <a href="product.html?id=${product.id}" class="click_viewed">${product.name}</a>
                    </div>
                </div>
                <div class="my-4">
                    <p class="font-bold text-accentText">$ ${product.price}</p>
                </div>
            </div>
        `;
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = template.trim();
    
        // Добавляем обработчик клика только на элементы с классом "click_viewed"
        cardDiv.querySelectorAll('.click_viewed').forEach(clickable => {
            clickable.addEventListener('click', () => {
                addToRecentlyViewed(product);
            });
        });
    
        return cardDiv.firstChild;
    }
    

    // Функция для создания карточки товара в списке "Recently viewed products"
    function createViewedProductCard(product) {
        const template = `
            <div class="flex items-center bg-white py-5 pr-1">
                <div class="">
                    <a href="product.html?id=${product.id}">
                        <img class="h-16" src="${product.image}" alt="product">
                    </a>
                </div>
                <div class="flex flex-col justify-between h-full">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                    <p>$ ${product.price}</p>
                </div>
            </div>
        `;
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = template.trim();
        return cardDiv.firstChild;
    }
    

    // Функция для добавления товара в список просмотренных
    function addToRecentlyViewed(product) {
        let recentlyViewed = getRecentlyViewed();

        // Проверяем, есть ли уже товар в просмотренных
        const isProductExist = recentlyViewed.some(item => item.id === product.id);

        if (!isProductExist) {
            // Если товара нет, добавляем его в начало массива
            recentlyViewed.unshift(product);

            // Ограничиваем количество просмотренных товаров (например, 4)
            recentlyViewed = recentlyViewed.slice(0, 4);

            // Сохраняем обновленный список в localStorage
            localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));

            // Обновляем отображение просмотренных товаров
            displayRecentlyViewed();
        }
    }

    // Функция для получения просмотренных товаров из localStorage
    function getRecentlyViewed() {
        const storedProducts = localStorage.getItem('recentlyViewed');
        return storedProducts ? JSON.parse(storedProducts) : [];
    }

    // Функция для отображения просмотренных товаров
    function displayRecentlyViewed() {
        const recentlyViewedContainer = document.getElementById('product-viewed');
        recentlyViewedContainer.innerHTML = ''; // Очищаем контейнер перед добавлением

        const recentlyViewed = getRecentlyViewed();

        recentlyViewed.forEach(product => {
            const viewedProductCard = createViewedProductCard(product);
            recentlyViewedContainer.appendChild(viewedProductCard);
        });
    }

    // Загрузка товаров при загрузке страницы
    fetch('/data.json')
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById('product-container');
            products.forEach(product => {
                const productCard = createProductCard(product);
                productContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching product data:', error));

    // Отображаем просмотренные товары при загрузке страницы
    displayRecentlyViewed();
});
