// 覆盖原 alert 弹窗
window.alert = function (message) {
  new Vue({
    data: function () {
      this.$notify({
        title: "注意",
        message: `${message}`,
        position: "top-left",
        offset: 50,
        showClose: true,
        type: "warning",
        duration: 5000,
      });
    },
  });
};

// 禁用控制台
document.onkeydown = function (e) {
  if (
    123 == e.keyCode ||
    (e.ctrlKey &&
      e.shiftKey &&
      (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) ||
    (e.ctrlKey && 85 === e.keyCode)
  )
    return (
      btf.snackbarShow("你真坏，不能打开控制台喔!"),
      (event.keyCode = 0),
      (event.returnValue = !1),
      !1
    );
};
