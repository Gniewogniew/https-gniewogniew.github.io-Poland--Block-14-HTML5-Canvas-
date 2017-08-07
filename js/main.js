function main() {
    var canvas = document.getElementsByTagName("newCanvas");
    var ctx = newCanvas.getContext("2d");
    var container = {
        x: 100,
        y: 100,
        width: 1200,
        height: 800
    }
    var circles = [{
            x: 400,
            y: 400,
            r: 50,
            color: 25,
            vx: 4,
            vy: 1
        },
        {
            x: 500,
            y: 300,
            r: 10,
            color: 125,
            vx: 2,
            vy: -3
        },
        {
            x: 800,
            y: 200,
            r: 40,
            color: 300,
            vx: 3,
            vy: -2
        },
        {
            x: 700,
            y: 700,
            r: 25,
            color: 175,
            vx: -2,
            vy: -1
        },
        {
            x: 200,
            y: 600,
            r: 65,
            color: 215,
            vx: 5,
            vy: -4
        },
        {
            x: 200,
            y: 500,
            r: 15,
            color: 50,
            vx: -4,
            vy: 2
        }
    ];

    function draw() {

        ctx.fillStyle = "black";
        ctx.fillRect(container.x, container.y, container.width, container.height);

        for (var i = 0; i < circles.length; i++) {
            ctx.fillStyle = 'hsl(' + circles[i].color + ',100%,50%)';
            ctx.beginPath();
            ctx.arc(circles[i].x, circles[i].y, circles[i].r, 0, 2 * Math.PI);
            ctx.fill();
            if ((circles[i].x + circles[i].vx + circles[i].r > container.x + container.width) || (circles[i].x - circles[i].r + circles[i].vx < container.x)) {
                circles[i].vx = -circles[i].vx;
            }
            if ((circles[i].y + circles[i].vy + circles[i].r > container.y + container.height) || (circles[i].y - circles[i].r + circles[i].vy < container.y)) {
                circles[i].vy = -circles[i].vy;
            }
            circles[i].x += circles[i].vx;
            circles[i].y += circles[i].vy;
        }
        raf = requestAnimationFrame(draw);
    }

    function attachEventHandlers() {
        $("#pause").click(function(event) {
            if (this.textContent === "Pause") {
                cancelAnimationFrame(raf);
                this.textContent = "Start";
            } else {
                requestAnimationFrame(draw);
                this.textContent = "Pause";
            }
        });

        $("#addingBalls").click(function(event) {
            var circle = {
                x: 500 + 100 * Math.random(),
                y: 400 + 100 * Math.random(),
                r: 20 + 50 * Math.random(),
                color: 360 * Math.random(),
                vx: 10 * Math.random(),
                vy: 10 * Math.random(),
            }
            circles.push(circle);
        });
        $("#removingBalls").click(function(event) {
            circles.pop();
        });

        $("#addspeed").click(function(event) {
            var factor = 2;
            for (var i = 0; i < circles.length; i++) {
                circles[i].vx = factor * circles[i].vx;
                circles[i].vy = factor * circles[i].vy;
            }
        });
        $("#slowspeed").click(function(event) {
            var factor = 0.5;
            for (var i = 0; i < circles.length; i++) {
                circles[i].vx = factor * circles[i].vx;
                circles[i].vy = factor * circles[i].vy;
            }
        });
    }
    draw();
    attachEventHandlers();
}
main()