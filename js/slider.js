document.addEventListener("DOMContentLoaded", function () {
    const path = document.getElementById("slider-path").querySelector("path");
    const circle = document.getElementById("slider-circle");
    const tooltip = document.getElementById("tooltip");

    tooltip.innerText = "$420";


    const defaultValue = 321.01;
    const defaultPosition = (defaultValue / 500) * path.getTotalLength();
    const defaultPoint = path.getPointAtLength(defaultPosition);
    circle.style.left = defaultPoint.x - circle.clientWidth / 2 + "px";
    circle.style.top = defaultPoint.y - circle.clientHeight / 2 + "px";


    tooltip.style.left = defaultPoint.x + "px";
    tooltip.style.top = defaultPoint.y - 30 + "px";
    tooltip.style.display = "block";


    circle.addEventListener("mousedown", function (e) {
        e.preventDefault();

        document.addEventListener("mousemove", moveCircle);
        document.addEventListener("mouseup", function () {
            document.removeEventListener("mousemove", moveCircle);
        });
    });

    circle.addEventListener("touchstart", function (e) {
        e.preventDefault();

        const touch = e.touches[0];
        moveCircle(touch);

        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", function () {
            document.removeEventListener("touchmove", handleTouchMove);
        });
    });

    function handleTouchMove(e) {
        const touch = e.touches[0];
        moveCircle(touch);
    }

    function moveCircle(e) {
        const pathLength = path.getTotalLength();
        const rect = path.getBoundingClientRect();
        const mouseX = e.clientX || e.touches[0].clientX;

        const position = Math.min(Math.max(0, mouseX - rect.left) / rect.width, 1) * pathLength;

        const point = path.getPointAtLength(position);

        circle.style.left = point.x - circle.clientWidth / 2 + "px";
        circle.style.top = point.y - circle.clientHeight / 2 + "px";

        const value = Math.min((position / pathLength) * 800, 800);
        tooltip.innerText = `$${value.toFixed(2)}`;
        tooltip.style.left = point.x + "px";
        tooltip.style.top = point.y - 30 + "px";
        tooltip.style.display = "block";
    }
});
