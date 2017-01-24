define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				auto: false,
				delay: 5000,
				speed: 300,
				debug: false
			}

		$.extend($set, opt);

		var $content_in = getNode.getCtIn(env),
			$content_ul = $content_in.children('ul'),
			$content_li = $content_ul.children('li'),
			$content_li_length = $content_li.length || 1;

		if( $content_li_length <= 1 ) { //如果輪播項目在一個以下，就掰掰囉~
			return false;
		}

		var $prev_li = getNode.getFtItemBtn(env, 'prev'),
			$next_li = getNode.getFtItemBtn(env, 'next');

		var $env = $(env),
			$content_li_height = $content_li.height(),
			$prev_li_a = $prev_li.find('a'),
			$next_li_a = $next_li.find('a');

		var up = 1,
			down = 0;

		$content_in.css({
			'height': $content_li_height, //把 ul 的高度設成跟第一則一樣
			'overflow': 'hidden'
		});

		$content_li.css({
			'height': $content_li_height, //把 li 的高度設成跟第一則一樣
			'display': 'block'
		});

		$prev_li_a.on('click', function(evt){
			evt.preventDefault();

			slider(up);
		});

		$next_li_a.on('click', function(evt){
			evt.preventDefault()

			slider(down);
		});

		function slider(_away){

			$content_li = $content_ul.children('li'); //重取 dom

			if (_away) { //如果往上

				$content_ul.css('margin-top','-'+ $content_li_height +'px'); //預先調整 margin-top
				$content_li.eq(-1).prependTo($content_ul); //把最後一個變成第一個

				$content_ul.stop().animate({
					'margin-top': 0 //讓 ul 變成 -$content_li_height
				}, $set.speed);

			} else { //如果往下

				$content_ul.stop().animate({
					'margin-top': '-'+ $content_li_height //讓 ul 變成 - $content_li_height
				}, $set.speed, function(){
					$content_li.eq(0).appendTo($content_ul); //把第一個變成最後一個
					$content_ul.css('margin-top', 0); //調整 margin-left 為 0
				});
			}
		}

		if ($set.auto) { //如果要輪播
			var timer; //設定計時器

			function auto() { //設定自動撥放涵式

				slider(0);
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