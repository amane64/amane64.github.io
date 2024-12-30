(function () {
  function createSnow(options) {
    var defaults = {
      minSize: 10,
      maxSize: 20,
      newOn: 1000,
      flakeColor: "#AFDAEF", // 此处可以定义雪花颜色，若要白色可以改为#FFFFFF
    };

    options = Object.assign({}, defaults, options);

    var documentHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    var documentWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    var scrollPosition = 0;

    function updateScrollPosition() {
      scrollPosition =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    }

    window.addEventListener("scroll", updateScrollPosition);

    function createFlake() {
      var flake = document.createElement("div");
      flake.id = "snowbox";
      flake.style.position = "absolute";
      flake.style.zIndex = "9999";
      flake.style.top = "-50px";
      flake.innerHTML = "&#10052;";

      var startPositionLeft = Math.random() * documentWidth - 100;
      var startPositionTop = -50; // 设置初始顶部位置
      var startOpacity = 0.5 + Math.random();
      var sizeFlake = options.minSize + Math.random() * options.maxSize;
      var endPositionTop = documentHeight - 200;
      var endPositionLeft = startPositionLeft - 500 + Math.random() * 500;
      var durationFall = documentHeight * 10 + Math.random() * 5000;

      flake.style.left = startPositionLeft + "px";
      flake.style.opacity = startOpacity;
      flake.style.fontSize = sizeFlake + "px";
      flake.style.color = options.flakeColor;

      document.body.appendChild(flake);

      setTimeout(function () {
        animateFlake(
          flake,
          startPositionLeft,
          startPositionTop,
          startOpacity,
          endPositionTop,
          endPositionLeft,
          durationFall
        );
      }, 0);
    }

    function animateFlake(
      flake,
      startPositionLeft,
      startPositionTop,
      startOpacity,
      endPositionTop,
      endPositionLeft,
      durationFall
    ) {
      var startTime = performance.now();

      function step(currentTime) {
        var elapsedTime = currentTime - startTime;
        var progress = elapsedTime / durationFall;

        if (progress < 1) {
          flake.style.top =
            startPositionTop +
            scrollPosition +
            progress * (endPositionTop - startPositionTop) +
            "px";
          flake.style.left =
            startPositionLeft +
            progress * (endPositionLeft - startPositionLeft) +
            "px";
          flake.style.opacity = 0.2 + (1 - progress) * (startOpacity - 0.2);

          requestAnimationFrame(step);
        } else {
          document.body.removeChild(flake);
        }
      }

      requestAnimationFrame(step);
    }

    setInterval(createFlake, options.newOn);
  }

  window.onload = function () {
    createSnow({
      minSize: 5, // 定义雪花最小尺寸
      maxSize: 50, // 定义雪花最大尺寸
      newOn: 300, // 定义密集程度，数字越小越密集
    });
  };
})();
