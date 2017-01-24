define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				auto: false,
				delay: 5000, //停留時間
				speed: 300, //輪播速度
				debug: false
			}

		$.extend($set, opt);

		var _event = 'change.node';

		var $env = $(env);

		var $content_li = getNode.getCtItem(env),
			$content_li_length = $content_li.length;

		if( $content_li_length <= 1 ) { //如果輪播項目在一個以下，就掰掰囉~
			return false;
		}

		var $dots = $();

		var _index = 0, //被播放的順序
			_right = 1,
			_left = -1;
		
		var $prev_li = getNode.getFtItemBtn(env, 'prev'),
			$next_li = getNode.getFtItemBtn(env, 'next');

		var $prev_li_a = $prev_li.find('a'),
			$next_li_a = $next_li.find('a');

		$prev_li_a.on(_event, function(){
			slider(_left);
		});

		$prev_li_a.on('click', function(evt){
			evt.preventDefault();

			$(this).trigger(_event);
		});

		$next_li_a.on(_event, function(){
			slider(_right);
		});

		$next_li_a.on('click', function(evt){
			evt.preventDefault();

			$(this).trigger(_event);
		});

		$env.touchwipe({
			wipeLeft: function() {

				slider(_left);
				clearTimeout(timer);
			},
			wipeRight: function() {

				slider(_right);
				clearTimeout(timer);
			},
			min_move_x: 20,
			min_move_y: 20,
			preventDefaultEvents: false
		});

		slider(0); //播放第一個

		function slider(_away) { //輪播特效

			_index = (_index + _away + $content_li_length) % $content_li_length; //算出第幾個要被撥放

			var $node = $content_li.eq(_index);

			$node.fadeIn($set.speed).siblings().hide(); //show 出物件並把其他隱藏
		}

		if ($set.auto) { //如果要輪播
			var timer; //設定計時器

			function auto() { //設定自動撥放涵式

				slider(_right); //預設向右撥放
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