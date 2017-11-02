define(function(){ //取手機版檢測物件

    if( window.CCMS_focusNodeFilter === undefined ) {
        window.CCMS_focusNodeFilter = $('a[href], input, select');
    }

	return window.CCMS_focusNodeFilter;
});