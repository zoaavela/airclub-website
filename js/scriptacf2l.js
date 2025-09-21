  const carouselWrapper = document.getElementById('carouselWrapper');
        const carouselCards = document.querySelectorAll('.carousel-item-custom');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let carouselIndex = 0;
        const visibleCards = 4;

        function updateCarousel() {
            const cardWidth = carouselCards[0].offsetWidth + 32;
            carouselWrapper.style.transform = `translateX(${-carouselIndex * cardWidth}px)`;
        }

        nextBtn.addEventListener('click', () => {
            carouselIndex++;
            if (carouselIndex > carouselCards.length - visibleCards) {
                carouselIndex = 0;
            }
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            carouselIndex--;
            if (carouselIndex < 0) {
                carouselIndex = carouselCards.length - visibleCards;
            }
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);

        // API Météo
        // Coordonnées Frotey-Les-Lures
        const lat = 47.656;
        const lon = 6.553;

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,relative_humidity_2m&timezone=Europe/Paris`)
            .then(res => res.json())
            .then(data => {
                const meteo = data.current;
                document.getElementById("temperature").textContent = meteo.temperature_2m + "°C";
                document.getElementById("precipitation").textContent = meteo.precipitation + " mm";
                document.getElementById("humidity").textContent = meteo.relative_humidity_2m + " %";
            })
            .catch(err => console.error(err));

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Europe/Paris`)
            .then(res => res.json())
            .then(data => {
                const meteo = data.current_weather;
                document.getElementById("wind").textContent = meteo.windspeed + " km/h";
            })
            .catch(err => console.error(err));

        // Main button action
        function handleMainAction() {
            document.querySelector('.contact-section').scrollIntoView({ behavior: 'smooth' });
        }