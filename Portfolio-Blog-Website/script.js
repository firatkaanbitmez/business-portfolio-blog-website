document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-button");
    const topBar = document.querySelector(".top-bar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 150) {
            menuButton.classList.add("fixed");
        } else {
            menuButton.classList.remove("fixed");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const toggleButtons = document.querySelectorAll(".toggle-button");

    toggleButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const targetId = button.getAttribute("data-target");
            const projectDetails = document.getElementById(targetId);

            // Proje detayını aç veya kapat
            if (projectDetails.style.display === "block") {
                projectDetails.style.display = "none";
            } else {
                projectDetails.style.display = "block";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const thinTopBar = document.querySelector(".thin-top-bar");
    const topBar = document.querySelector(".top-bar");

    // İlk açıldığında thin-top-bar'ı ve top-bar'ı alt alta getir
    topBar.style.top = thinTopBar.offsetHeight + "px";

    window.addEventListener("scroll", function () {
        if (window.scrollY > thinTopBar.offsetHeight) {
            thinTopBar.style.transform = "translateY(-100%)";
            topBar.style.top = "0";
        } else {
            thinTopBar.style.transform = "translateY(0)";
            topBar.style.top = thinTopBar.offsetHeight + "px";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-button");
    const menuList = document.querySelector(".menu-list");

    // Menü düğmesine tıklanınca menüyü göster/gizle
    menuButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Bu satırı ekleyin
        menuList.classList.toggle("show-menu");
    });


    // Menü öğelerine tıklanınca sayfaya gitme ve menüyü kapatma
    const menuItems = document.querySelectorAll(".menu-list a");

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener("click", function (event) {
            // Sayfaya gitme işlemini iptal et
            event.preventDefault();

            // Sayfaya gitme kodunu burada ekleyin
            // Örnek olarak, href özelliğine göre sayfaya gitmek için:
            window.location.href = menuItem.getAttribute("href");

            // Menüyü kapat
            menuList.classList.remove("show-menu");
        });
    });

    // Sayfaya her tıklandığında menüyü kapat
    document.body.addEventListener("click", function () {
        menuList.classList.remove("show-menu");
    });

    // Menü düğmesine tıklanıp menüyü kapatma olayını engelle
    menuButton.addEventListener("click", function (event) {
        event.stopPropagation();
    });
});


// Sayfa yüklendiğinde ve scroll olayı gerçekleştiğinde çalışacak olan kod
document.addEventListener("DOMContentLoaded", function () {
    const topBar = document.querySelector(".top-bar");
    const mobileMenu = document.querySelector(".mobile-menu");
    const body = document.body;

    window.addEventListener("scroll", function () {
        if (window.scrollY > topBar.clientHeight) {
            // Scroll yeterince aşağıda ise hamburger menüyü göster ve top-bar'ı kaybet
            mobileMenu.classList.add("show-menu");
            body.classList.add("scrolled");
        } else {
            // Scroll yukarıdayken hamburger menüyü gizle ve top-bar'ı göster
            mobileMenu.classList.remove("show-menu");
            body.classList.remove("scrolled");
        }
    });
});


