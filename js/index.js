document.addEventListener("DOMContentLoaded", function() {

    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");

    setInterval(() => {
        img1.src = `./img/${Math.floor(Math.random() * (26 - 1 + 1)) + 1}.jpg`
        img2.src = `./img/${Math.floor(Math.random() * (26 - 1 + 1)) + 1}.jpg`
    }, 10000)
})