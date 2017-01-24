define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				auto: false, //是否自動撥放
				delay: 5000, //停留時間
				event: 'click focusin', //jQuery 事件名稱
				activeClass: 'is-active', //啟動的 class
				debug: false
			}

		$.extend($set, opt);

		var $env = $(env),
			$all_item = getNode.getCtItem(env),
			$items = $all_item.filter(function(i) { //過濾第一個 jquery 物件，也就是 tab
				return !!i;
			}),
			$items_l = $items.length,
			$tabs = $all_item.eq(0),
			$tabs_li = $tabs.find('li'),
			$tab_a = $tabs_li.find('a, input'),
			$tab_a_length = $tab_a.length - 1;

		var _tab_key = 9,
			_index = 0;

		$items.each(function(i, n){
			var $this = $(this),
				$hd = getNode.getHd($this),
				$hd_a = $hd.find('a');

			$hd_a.each(function(i, n){
				var $this = $(this),
					_href = $this.attr('href');

				if( !_href || _href === '#' ) {
					$this.removeAttr('href');
				}
			});

			if( $hd.css('display') === 'none' ) {
				$hd.find('a').removeAttr('href');
			}
		});

		for( var i = 0; i < $tab_a_length; i++ ) { //註冊無障礙 tab 事件

			(function(i){
				var $a = $items.eq(i).find('a[href], input');

				if($a.length) {

					$tab_a.eq(i).on('keydown', function(evt){ //觸發事件

						if( evt.which === _tab_key ) {
							evt.preventDefault();

							$a.eq(0).focus();
						}
					});

					$a.eq(-1).on('keydown', function(evt){ //觸發事件

						if( evt.which === _tab_key ) {
							evt.preventDefault();

							$tab_a.eq(i + 1).focus();
						}
					});
				}
			})(i)
		}

		var _eventNmae = file, //事件名稱
			_active = $set.activeClass; //被選擇的 class name

		$tab_a.on(_eventNmae, function(){
			var $this = $(this);

			_index = $this.closest('li').index();

			slider(_index);
		});

		$tab_a.on( $set.event, function(evt){ //觸發事件
			evt.preventDefault();

			$(this).trigger(_eventNmae);
		});

		slider(0);

		function slider(_index) {
			$tabs_li.removeClass(_active);
			$tabs_li.eq(_index).addClass(_active);
			$items.hide();
			$items.eq(_index).show();
		}

		if ($set.auto) { //如果要輪播
			var timer; //設定計時器

			function auto() { //設定自動撥放涵式

				_index = (_index + 1 + $items_l) % $items_l; //算出第幾個要被撥放

				slider(_index); //預設向右撥放
				timer = setTimeout(auto, $set.delay);
			}
			
			$env.on('mouseenter', function(){ //設定滑進滑出項目
				clearTimeout(timer);
			});

			$env.on('mouseleave', function(){
				timer = setTimeout(auto, $set.delay);
			});

			timer = setTimeout(auto, $set.delay); //輪播開始
		}

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});