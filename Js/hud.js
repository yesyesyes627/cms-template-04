define(function(){
	
	function main(env, opt, file){

		var $set = {
				activeClass: 'is-fixed',
				debug: false
			}

		$.extend($set, opt);

		var $win = $(window),
			$menu = $(env),
			$in = $menu.children('.in'),
			$in_h = $in.outerHeight(),
			$in_t = $in.offset().top;

		var _eventNmae = 'fixed', //事件名稱
			_active = $set.activeClass; //被選擇的 class name

		$win.on(_eventNmae, function () { //開始監測滾動多少的事件
			var $win_t = $win.scrollTop();

			if ($win_t > $in_t) {
				$menu.css({'height': $in_h});
				$menu.addClass(_active);
			} else {
				$menu.css({'height': 'auto'});
				$menu.removeClass(_active);
			}
		});

		$win.on('scroll resize', function(){
			$win.trigger(_eventNmae);
		});

		$win.trigger(_eventNmae);

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});