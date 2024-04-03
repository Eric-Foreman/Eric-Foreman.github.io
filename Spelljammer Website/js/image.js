document.addEventListener("DOMContentLoaded", function () {
    const reviereImage = document.getElementById("reviereImage");
    const vikerthImage = document.getElementById("vikerthImage");
    const holyOrderImage = document.getElementById("holyOrderImage");

    function handleImageHover(imageElement, populationSuffix) {
        const originalSrc = imageElement.src;
        const populationSrc = originalSrc.replace(/\.(png|jpg)$/, populationSuffix + ".png");
        imageElement.addEventListener("mouseover", function () {
            imageElement.src = populationSrc;
        });

        imageElement.addEventListener("mouseout", function () {
            imageElement.src = originalSrc;
        });
    }

    if (reviereImage) {
        handleImageHover(reviereImage, "Population");
    }

    if (vikerthImage) {
        handleImageHover(vikerthImage, "Population");
    }

    if (holyOrderImage) {
        handleImageHover(holyOrderImage, "Population");
    }
});