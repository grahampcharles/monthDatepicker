/*jslint todo: true */
(function ($) {
    'use strict';
    // insert calendar-hiding style into CSS
    $("<style type='text/css'> .ui-datepicker.monthDatepicker .ui-datepicker-calendar { display: none; } </style>").appendTo("head");
    $.fn.monthDatepicker = function (options) {
        $(this).data("originalOnClose", options ? options.onClose : null);
        $(this).data("originalBeforeShow", options ? options.beforeShow : null);
        var settings = $.extend({
            // defaults
            dateFormat: 'MM yy',
            currentText: 'current'
        },
            // user-selected
            options,
            // non-overrideable options
            {
                changeMonth: true,
                // TODO: support false here
                changeYear: true,
                // TODO: support false here
                showButtonPanel: true,
                onClose: function (dateText, inst) {
                    var div = inst.dpDiv[0],
					    month = $(div).find(".ui-datepicker-month :selected").val(),
                        year = $(div).find(".ui-datepicker-year :selected").val(),
                        date = new Date(year, month, 1),
					    theOnClose = $(this).data("originalOnClose");
                    
					$(this).datepicker('option', 'defaultDate', date);
                    $(this).datepicker('setDate', date);
                    
					// execute existing onClose
                    if ($.isFunction(theOnClose)) {
                        theOnClose.call(this, $(inst.input).val(), inst);
                    }
					
                    // remove monthDatepicker class to allow showing calendar on other datepickers on the page
                    $(inst.dpDiv[0]).removeClass("monthDatepicker");
                },
                beforeShow: function (input, inst) {
					
                    var theBeforeShow = $(this).data("originalBeforeShow");

                    // add monthDatepicker class to prevent showing month
                    $(inst.dpDiv[0]).addClass("monthDatepicker");
                    // execute existing beforeShow
					if ($.isFunction(theBeforeShow)) {
                        theBeforeShow.call(this, inst.input, inst);
                    }
                    
					// use existing value from input
                    var datestr = $(this).val();
                    if (datestr.length > 0) {
                        // TODO: parse this correctly regardless of date format
                        var year = datestr.substring(datestr.length - 4, datestr.length);
                        var month = $.inArray(datestr.substring(0, datestr.length - 5), $(this).datepicker('option', 'monthNames'));
                        $(this).datepicker('option', 'defaultDate', new Date(year, month, 1));
                        $(this).datepicker('setDate', new Date(year, month, 1));
                    }
                }
            });
        return this.datepicker(settings);
    };
}(jQuery));