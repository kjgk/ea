(function ($) {
    $.fn.textedit = function (options) {
        debug(this);
        // build main options before element iteration
        var options = $.extend({
        }, $.fn.textedit.defaults, options);
        // iterate and reformat each matched element
        return this.each(function () {
            var textfield = $(this), button, text, _width = 12, editText = '修改';
            if (options.type == 1) {
                button = $('<div class="ea-textfield-button">' + editText + '</div>');
            }
            if (options.type == 2) {
                button = $('<div class="ea-textfield-button">' + options.buttonText + '</div>');
            }
            if (options.type == 3) {

            }
            if (button) {
                _width += 48;
                button.bind('click', function () {
                    if (options.type == 2) {
                        if (options.onClick) {
                            options.onClick.call(textfield, text);
                        }
                    }
                    if (options.type == 1) {
                        if (text.attr('readonly')) {
                            button.text(options.buttonText);
                            text.removeAttr('readonly');
                            text.focus();
                        } else {
                            var result = true;
                            if (options.onClick) {
                                result = options.onClick.call(textfield, text);
                            }
                            if (result) {
                                button.text(editText);
                                text.attr('readonly', 'readonly');
                            }
                        }
                    }
                });
            }

            if (options.textarea) {
                text = $('<textarea class="ea-textfield-text" placeholder="' + options.emptyText + '" style="width: ' + ($(this).width() - _width) + 'px; height: ' + ($(this).height() - 6) + 'px; line-height: 18px;"></textarea>');
            } else {
                text = $('<input class="ea-textfield-text" placeholder="' + options.emptyText + '" style="width: ' + ($(this).width() - _width) + 'px;"/>');
            }

            if (options.inputType === 'password') {
                text.attr('type', 'password');
            }
            textfield.append(text);
            if (button) {
                textfield.append(button);
            }
            if (options.type == 1) {
                text.attr('readonly', 'readonly');
            }
            if (options.value) {
                text.val(options.value);
            }
            text.bind('focus', function () {
                textfield.addClass('ea-textfield-highlight');
            });
            text.bind('blur', function () {
                textfield.removeClass('ea-textfield-highlight');
            });
            text.placeholder();
        });
    };
    // 私有函数：debugging
    function debug($obj) {
        if (window.console && window.console.log)
            window.console.log('textedit selection count: ' + $obj.size());
    };
    // 定义暴露函数
    $.fn.textedit.getValue = function () {
    };
    // 插件的defaults
    $.fn.textedit.defaults = {
        buttonText: '确认',
        type: 1,
        textarea: false
    };
})(jQuery);