define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				auto: true, //是否自動撥放
				delay: 5000, //停留時間
				speed: 300, //輪播速度
				event: 'focus', //jQuery 事件名稱
				activeClass: 'is-active', //啟動的 class
				debug: false
			}

		$.extend($set, opt);

		var $env = $(env),
			$list = $env.find('.list-area'),
			$item = $list.find('li'),
			$a = $item.find('a'),
			$a_l = $a.length;

		var $pic_area = $env.find('.pic-area'),
			$pic_area_a = $pic_area.find('a'),
			$pic_area_img = $pic_area_a.find('img'),
			$pic_area_span = $pic_area_img.closest('span'),
			$pic_area_caption = $pic_area_a.find('.figcaption span'),
			$pic_area_p = $pic_area_a.find('.p span');

		var _index = 0,
			_eventNmae = file, //事件名稱
			_active = $set.activeClass; //被選擇的 class name

		$a.on(_eventNmae, function(){
			var $this = $(this);

			_index = $this.closest('li').index();

			slider(_index);
		});

		$a.on( $set.event, function(evt){ //觸發事件
			evt.preventDefault();

			$(this).trigger(_eventNmae);
		});

		slider(0);

		function slider(_index) {
			var $this = $a.eq(_index),
				$img = $this.find('img'),
				$li = $this.closest('li'),
				_href = $this.attr('href'),
				_src = $img.attr('src'),
				_alt = $img.attr('alt'),
				_title = $img.attr('title');

			$pic_area_a.stop().fadeOut($set.speed, function() {

				$item.removeClass($set.activeClass);
				$li.addClass($set.activeClass);

				$pic_area_a.attr('href', _href);
				$pic_area_img.attr('src', _src);
				$pic_area_span.css({
					'background-image': _src
				});
				$pic_area_caption.text(_title);
				$pic_area_p.text(_alt);
			}).fadeIn($set.speed);
		}

		if ($set.auto) { //如果要輪播
			var timer; //設定計時器

			function auto() { //設定自動撥放涵式

				_index = (_index + 1 + $a_l) % $a_l; //算出第幾個要被撥放

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