const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndex = 0;

// Resimleri bir diziye yerleştirin
const images = [
    'data/1.jpeg',
    'data/2.jpeg',
    'data/3.jpeg',
];

// İleri gitme işlevi
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
}

// Geri gitme işlevi
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
}

// Slider'ı güncelleme işlevi
function updateSlider() {
    slider.innerHTML = '';
    const img = document.createElement('img');
    img.src = images[currentIndex];
    img.alt = `Fotoğraf ${currentIndex + 1}`;
    slider.appendChild(img);
}

// JavaScript ile scroll olayını dinleyin
window.addEventListener("scroll", function() {
    // Sayfanın altına ulaşmadan önce, görüntüyü yavaşça kaybolmasını sağlayın
    const scrollGif = document.getElementById("scroll-gif");
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollPosition > windowHeight) {
        const opacity = 1 - (scrollPosition - windowHeight) / windowHeight;
        scrollGif.style.opacity = opacity;
    } else {
        scrollGif.style.opacity = 1;
    }
});

// Resimleri yavaşça yüklemek için kullanacağımız resimlerin URL'leri
const imageUrls = [
    'data/1.jpg',
    'data/2.jpg',
    'data/3.jpg',
    // Daha fazla resim URL'si ekleyebilirsiniz
];

// Resimleri yavaşça yüklemek için kullanacağımız işlev
function preloadImages(urls, allImagesLoadedCallback) {
    const images = [];
    let loadedImages = 0;

    urls.forEach((url) => {
        const image = new Image();
        image.onload = () => {
            loadedImages++;
            if (loadedImages === urls.length) {
                allImagesLoadedCallback(images);
            }
        };
        image.src = url;
        images.push(image);
    });
}

// Tüm resimler yüklendiğinde çağrılacak işlev
function allImagesLoaded(images) {
    const imageContainer = document.getElementById('image-container');
    images.forEach((image) => {
        imageContainer.appendChild(image);
    });
}

const gallery = document.getElementById('gallery');

// Resimleri yavaşça yükleme işlevi
function lazyLoadImages() {
  const imageUrls = [
    'data/1.jpg',
    'data/2.jpg',
    'data/3.jpg',
    // Daha fazla resim URL'si ekleyebilirsiniz
];

    imageUrls.forEach((imageUrl, index) => {
        setTimeout(() => {
            const img = new Image();
            img.src = imageUrl;
            img.alt = 'Resim ' + (index + 1);
            gallery.appendChild(img);
        }, index * 1000); // Her resmi saniyede bir yükler (1000 milisaniye)
    });
}

const galleryLink = document.getElementById('gallery-link');
const galleryPage = document.createElement('iframe');

// İkinci sayfayı gizle
galleryPage.style.display = 'none';

// Gallerie Anzeigen bağlantısına tıklanınca ikinci sayfayı göster
galleryLink.addEventListener('click', (e) => {
    e.preventDefault(); // Bağlantıya tıklamayı engelle
    galleryPage.src = 'gallery.html'; // İkinci sayfayı yükle
    galleryPage.style.display = 'block'; // İkinci sayfayı göster
    galleryLink.style.display = 'none'; // Bağlantıyı gizle
    document.body.appendChild(galleryPage);
});

// Sayfa yukarı kaydırıldığında ikinci sayfayı gizle
window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        galleryPage.style.display = 'none';
        galleryLink.style.display = 'block';
        galleryPage.src = ''; // Sayfayı sıfırla
    }
});

.video-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
}

#video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: blur(5px); /* Burada blurlu efekti ayarlayabilirsiniz */
}


// Sayfa yüklendiğinde resimleri yavaşça yükle
window.addEventListener('load', lazyLoadImages);

// Resimleri yavaşça yüklemek için işlevi çağırın
preloadImages(imageUrls, allImagesLoaded);


// İleri ve geri butonlarının olay dinleyicilerini ekleyin
nextButton.addEventListener('click', nextImage);
prevButton.addEventListener('click', prevImage);

// Başlangıçta ilk resmi gösterin
updateSlider();
