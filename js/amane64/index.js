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
