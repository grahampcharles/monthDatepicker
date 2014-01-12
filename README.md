monthDatepicker
===============

An extension to the jqueryUI datepicker to allow month/year selection only.

This technique was suggested [here](http://stackoverflow.com/questions/2208480/jquery-ui-datepicker-to-show-month-year-only "Stack Overflow question"); I have wrapped it into a jquery extension.

Usage: 

    $('#elementID').monthDatepicker(); 
	$('#elementID').monthDatepicker(options); 

You can use most options of the [jquery UI datepicker](http://api.jqueryui.com/datepicker/), with the exception of:
* changeMonth
* changeYear
* showButtonPanel