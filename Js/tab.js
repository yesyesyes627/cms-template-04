define(['getNode', 'mobileFilter'], function(getNode, mobileFilter){
	
	function main(env, opt, file){

		var $set = {
				auto: false, //是否自動撥放
				delay: 5000, //停留時間
				event: 'click', //jQuery 事件名稱
				activeClass: 'is-active', //啟動的 class
				debug: false
			}

		$.extend($set, opt);

		var $env = $(env),
			$li = getNode.getCtItem(env),
			$tab = $li.eq(0).children('.tab'),
			$tab_li = $tab.find('li'),
			$tab_li_length = $tab_li.length,
			$tab_a = $tab_li.find('a'),
			$items = $li.filter(function(i) { //過濾第一個 jquery 物件，也就是 tab
				return !!i;
			});

		var _tab_key = 9,
			_index = 0;

		//如果不是手機就開啟白癡無障礙尋覽功能
		if( !mobileFilter ) {

			for( var i = 0; i < $tab_li_length; i++ ) {

				(function(i){
					var $this = $tab_a.eq(i),
						$item = $items.eq(i);
					
					//移除 hd
					getNode.getHd($item.children('[data-index]')).remove();

					var $item_all_a = $item.find('[href], input');

					//如果 item 裡沒有可以 focus 的 a 或 input，按下 tab 鍵要預覽下一個
					if( $item_all_a.length ) {

						var $item_first_a = $item_all_a.eq(0),
							$item_last_a = $item_all_a.eq(-1);

						//觸發 this 就 focus 目標裡的第一個 a
						$this.on('keydown', function(evt){

							if( evt.which === _tab_key ) {
								evt.preventDefault();

								slider(i);
								$item_first_a.focus();
							}
						});

						//當頁籤中的最後一個 a 被按下 tab，檢測自己是不是最後一個頁籤的最後一個 a
						if( $tab_li_length > i + 1 ) {
							
							//觸發 最後一個 a 就輪播並 focus 下個頁籤裡的 a
							$item_last_a.on('keydown', function(evt){

								if( evt.which === _tab_key ) {
									evt.preventDefault();

									$tab_a.eq(i + 1).focus();
								}
							});	
						}

					}else {

						//如果頁籤裡沒有任何 a，且又不是最後一個

						if( $tab_li_length > i + 1 ) {

							//focus 下個頁籤裡的 a
							$this.on('keydown', function(evt){

								if( evt.which === _tab_key ) {
									evt.preventDefault();
	
									$tab_a.eq(i + 1).focus();
								}
							});
						}
					}
				})(i)
			}
		}

		//代理事件
		$tab_a.on(file, function(){
			var $this = $(this),
				_index = $this.closest('li').index();

			slider(_index);
		});

		//觸發事件舊觸發代理事件
		$tab_a.on($set.event, function(evt){
			evt.preventDefault();

			$(this).trigger(file);
		});

		slider(0);

		function slider(_index) {
			$tab_li.removeClass($set.activeClass);
			$tab_li.eq(_index).addClass($set.activeClass);
			$items.hide();
			$items.eq(_index).show();
		}

		if ($set.auto) { //如果要輪播
			var timer; //設定計時器

			function auto() { //設定自動撥放涵式

				_index = (_index + 1 + $tab_li_length) % $tab_li_length; //算出第幾個要被撥放

				slider(_index); //預設向右撥放
				timer = setTimeout(auto, $set.delay);
			}

			function autoStart(){
				clearTimeout(timer);
				timer = setTimeout(auto, $set.delay);
			}

			function autoClear(){
				clearTimeout(timer);
			}
			
			$env.on('mouseenter', function(){ //設定滑進滑出項目
				autoClear();
			});

			$env.on('mouseleave', function(){
				autoStart();
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