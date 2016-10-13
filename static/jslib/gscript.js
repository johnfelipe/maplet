jQuery.extend(jQuery.validator.messages, {
required: "<span class='red'>必选字段</span>",
remote: "<span class='red'>请修正该字段</span>",
email: "<span class='red'>请输入正确格式的电子邮件</span>",
url: "<span class='red'>请输入合法的网址</span>",
date: "<span class='red'>请输入合法的日期</span>",
dateISO: "<span class='red'>请输入合法的日期 (ISO).</span>",
number: "<span class='red'>请输入合法的数字</span>",
digits: "<span class='red'>只能输入整数</span>",
creditcard: "<span class='red'>请输入合法的信用卡号</span>",
equalTo: "<span class='red'>请再次输入相同的值</span>",
accept: "<span class='red'>请输入拥有合法后缀名的字符串</span>",
maxlength: jQuery.validator.format("<span class='red'>请输入一个 长度最多是 {0} 的字符串</span>"),
minlength: jQuery.validator.format("<span class='red'>请输入一个 长度最少是 {0} 的字符串</span>"),
rangelength: jQuery.validator.format("<span class='red'>请输入 一个长度介于 {0} 和 {1} 之间的字符串</span>"),
range: jQuery.validator.format("<span class='red'>请输入一个介于 {0} 和 {1} 之间的值</span>"),
max: jQuery.validator.format("<span class='red'>请输入一个最大为{0} 的值</span>"),
min: jQuery.validator.format("<span class='red'>请输入一个最小为{0} 的值</span>")
});

$.ready()
{

    // 提交修改密码的动作
    function js_update_pass() {
        // 模拟Form提交
        $.ajax({
            type: "POST",
            url: "/user/reset-password",
            data: "email=" + $("#user_email").val()                   ,

            success: function (msg) {
                alert('已经成功重置了密码！请检查电子邮箱！');
                location.href = '/user/info';
            },
            error: function () {
                alert('密码重置失败，请确认Email是否有效，并且两次重置时间大于1分钟！');
            }
        })
    }

    $("#form_reset").validate(
        {
            rules: {
                user_email: {
                    required: true,
                    email: true
                }

            },
            messages: {
                user_email: {
                    required: "<span class='red'>请输入正确电子邮箱</span>",
                    email: "<span class='red'>请输入正确的电子邮箱</span>"
                }
            }
        }
    );


    $('#sub_reset').click(function () {
        alert('Hello');
        if ($("#form_reset").valid()) {
            // do some stuff
            js_update_pass();
        }
        else {
            alert('Error');
            // just show validation errors, dont post
        }
    });

    $("#findform").validate(
                    {
                        rules: {
                            keyword: {
                                required: true
                            }
                        },
                        messages: {
                            keyword: {
                                required: "<span class='red'>请输入要查询的关键词</span>"
                            }
                        }
                    }
            );

    $("#find_calc").validate(
                    {
                        rules: {
                            keyword: {
                                required: true
                            }
                        },
                        messages: {
                            keyword: {
                                required: "<span class='red'>请输入要查询的关键词</span>"
                            }
                        }
                    }
            );

    $("#searchForm").validate({
        rules: {
            searchheader: "required"
        },
        messages: {
            searchheader: "<span class='red'>Please enter keywords</span>"

        }
    });

    $('#act_collect').click(function () {
        $.ajax({
            url: "/collect/" + post_uid,
            type: 'GET',
            cache: false,
            data: {},
            dataType: 'html',
            timeout: 1000,
            error: function () {
                alert('请登陆后进行收藏！')
            },
            success: function (result) {
                var uu = $.parseJSON(result);
                $('#text_collect').text('成功收藏');
                $('#text_collect').css('color', 'red');
            }
        });
    });

    function g_load_postcat(ii) {
        if ($('#pcat' + ii.toString()).val() == 0) {
            $('#gcat' + ii.toString()).empty();
        }
        else {
            $.ajax({
                url: '/category/j_subcat/' + $('#pcat' + ii.toString()).val(),
                type: 'GET',
                data: {},
                timeout: 1000,
                error: function () {
                    alert('重新加载');
                },
                success: function (result) {
                    var data = eval("(" + result + ")");
                    $('#gcat' + ii.toString()).empty();
                    $.each(data, function (tagidx, tagname) {
                        $("<option></option>")
                            .val(tagidx)
                            .text(tagname)
                            .appendTo($('#gcat' + ii.toString()));
                    });
                }
            });
        }
    }

    function g_load_infocat(ii) {
        if ($('#pcat' + ii.toString()).val() == 0) {
            $('#gcat' + ii.toString()).empty();
        }
        else {
            $.ajax({
                url: '/tag/j_subcat/' + $('#pcat' + ii.toString()).val(),
                type: 'GET',
                data: {},
                timeout: 1000,
                error: function () {
                    alert('重新加载');
                },
                success: function (result) {
                    var data = eval("(" + result + ")");
                    $('#gcat' + ii.toString()).empty();
                    $.each(data, function (tagidx, tagname) {
                        $("<option></option>")
                            .val(tagidx)
                            .text(tagname)
                            .appendTo($('#gcat' + ii.toString()));
                    });
                }
            });
        }
    }

    function reply_zan(sig, reply_id, id_num) {
        id_num = id_num.toString();
        zans = $('#text_zan').val();
        var AjaxUrl = "/" + sig + "/reply/zan/" + reply_id;
        $.getJSON(AjaxUrl, function (Json) {
            if (Json.text_zan == 0) {
            }
            else {
                $("#text_zan_" + id_num).html(Json.text_zan);
            }
        });
    }

    function reply_del(sig, reply_id, id_num) {
        id_num = id_num.toString();
        var AjaxUrl = "/" + sig + "/reply/delete/" + reply_id;
        $.getJSON(AjaxUrl, function (Json) {
            if (Json.del_zan == 1) {
                $("#del_zan_" + id_num).html('');
            }
            else {
                alert('删除失败！');
            }
        });
    }


    function reply_it(sig, view_id) {
        var txt = $("#cnt_md").val();
        if (txt.length < 10) {
            return;
        }
        $.post("/" + sig + "/reply/add/" + view_id, {cnt_md: txt}, function (result) {
            var msg_json = $.parseJSON(result);
            $("#pinglun").load('/reply/get/' + msg_json.pinglun);
        });
        $('#cnt_md').val('');
        $('#cnt_md').attr("disabled", true);
        $('#btn_submit_reply').attr('disabled', true);
    }

}
