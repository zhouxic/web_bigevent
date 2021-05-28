$(function () {
  /* 实现登录注册的切换 */
  $("#link_login a").on("click", function () {
    $("#link_login").hide();
    $("#link_reg").show();
  });
  $("#link_reg a").on("click", function () {
    $("#link_login").show();
    $("#link_reg").hide();
  });
  // 从layui中获取form对象
  const form = layui.form;
  const layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验用户两次输入密码是否正确
    repwd: function (value) {
      const pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "密码输入不一致";
      }
    },
  });
  //监听注册表单事件
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "/api/reguser",
      {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      function (res) {
        // console.log(res);
        if (res.status !== 0) {
          // return console.log(res.message);
          return layer.msg(res.message);
        }
        layer.msg("注册成功");
        $("#link_login a").click();
      }
    );
  });
  // 监听登录表单事件
  $("#form_login ").submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败");
        }
        layer.msg("登录成功");
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
