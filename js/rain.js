(function () {
  // 定义 createRain 函数，接受一个 options 对象作为参数
  function createRain(options) {
    // 设置默认参数
    var defaults = {
      minSize: 10, // 雨滴最小尺寸
      maxSize: 20, // 雨滴最大尺寸
      newOn: 150, // 定义密集程度，数字越小越密集
      dropColor: "#BEBEBE", // 雨滴颜色，浅灰色
    };

    // 使用 Object.assign 合并默认参数和用户提供的参数
    options = Object.assign({}, defaults, options);

    // 获取文档的高度和宽度
    var documentHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    var documentWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    var scrollPosition = 0; // 初始化滚动位置

    // 更新滚动位置的函数
    function updateScrollPosition() {
      scrollPosition =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    }

    // 监听滚动事件，更新滚动位置
    window.addEventListener("scroll", updateScrollPosition);

    // 创建雨滴的函数
    function createDrop() {
      // 创建一个新的 div 元素作为雨滴
      var drop = document.createElement("div");
      drop.id = "raindrop"; // 设置 id 为 raindrop
      drop.style.position = "absolute"; // 绝对定位
      drop.style.zIndex = "9999"; // 设置层次位置，确保在页面顶部
      drop.style.top = "-30px"; // 初始位置在顶部上方 30px
      drop.style.width = "1px"; // 雨滴宽度为 1px
      drop.style.height = "0px"; // 雨滴高度为 0px
      drop.style.backgroundColor = "transparent"; // 设置背景颜色为透明

      // 使用伪元素 ::before 创建雨滴轨迹
      drop.style.content = "''";
      drop.style.position = "absolute";
      drop.style.borderLeft = "1px solid " + options.dropColor; // 设置雨滴轨迹颜色

      // 随机生成初始位置
      var startPositionLeft = Math.random() * documentWidth; // 左侧随机位置
      var startPositionTop = -30; // 顶部初始位置
      var endPositionTop = documentHeight + 50; // 结束位置在底部下方 50px
      var durationFall = documentHeight * 0.85 + Math.random() * 100; // 随机下落时间，加快速度

      // 计算轨迹长度
      var dropHeight =
        (endPositionTop - startPositionTop) *
        (durationFall / (documentHeight * 5 + 3000)) *
        0.5; // 截断轨迹长度

      // 设置初始位置和轨迹长度
      drop.style.left = startPositionLeft + "px";
      drop.style.height = dropHeight + "px";

      // 将雨滴添加到文档中
      document.body.appendChild(drop);

      // 延迟一段时间后开始动画
      setTimeout(function () {
        animateDrop(
          drop,
          startPositionLeft,
          startPositionTop,
          endPositionTop,
          durationFall
        );
      }, 0);
    }

    // 动画雨滴的函数
    function animateDrop(
      drop,
      startPositionLeft,
      startPositionTop,
      endPositionTop,
      durationFall
    ) {
      var startTime = performance.now(); // 获取当前时间

      // 动画步骤函数
      function step(currentTime) {
        var elapsedTime = currentTime - startTime; // 计算已过去的时间
        var progress = elapsedTime / durationFall; // 计算进度

        if (progress < 1) {
          // 如果进度小于 1，继续动画
          drop.style.top =
            startPositionTop +
            scrollPosition +
            progress * (endPositionTop - startPositionTop) +
            "px"; // 更新顶部位置
          drop.style.left = startPositionLeft + "px"; // 更新左侧位置

          requestAnimationFrame(step); // 继续下一帧动画
        } else {
          // 如果进度大于等于 1，移除雨滴
          document.body.removeChild(drop);
        }
      }

      requestAnimationFrame(step); // 开始动画
    }

    // 定时创建雨滴
    setInterval(createDrop, options.newOn);
  }

  // 窗口加载完成后调用 createRain 函数
  window.onload = function () {
    createRain({
      minSize: 5, // 定义雨滴最小尺寸
      maxSize: 20, // 定义雨滴最大尺寸
      newOn: 100, // 定义密集程度，数字越小越密集
    });
  };
})();
