define(function(){

    //取手機板檢測物件

    var _browserData = window.navigator.userAgent,
        _filter = /(Android|iPhone|iPad|iPod|Windows Phone)/i.test(_browserData);
	
	return _filter;
});