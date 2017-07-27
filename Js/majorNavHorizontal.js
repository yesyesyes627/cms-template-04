define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				activeClass: 'is-active',
				clickToRemove: true,
				debug: false
			}

		$.extend($set, opt);

		var $env = $(env),
			$li = getNode.getCtItem(env), //取 li
			$child_node = $li.children('div'),
			$child_node_hd = getNode.getHd($child_node),
			$a = $child_node_hd.find('a'),
			$child_node_ct_in = getNode.getCtIn($child_node),
			$child_node_ct_in_length = $child_node_ct_in.length || 1,
			$all_a = $env.find('a'),
			$last_a = $all_a.eq(-1);

		for( var i = 0; i < $child_node_ct_in_length; i++ ) { //如果 child .in 有 a, 就是 is-parent
			var _this = $child_node_ct_in.eq(i) || $child_node_ct_in;

			if( _this.find('a').length ) {
				_this.closest('li').addClass('is-parent');
			}
		}

		var _eventNmae = file, //事件名稱
			_active = $set.activeClass, //被選擇的 class name
			_tab_key = 9;

		$li.on(_eventNmae, function(){
			var $this = $(this),
				_index = $this.closest('li').index();

			$li.removeClass(_active);
			$li.eq(_index).addClass(_active);

			$this.on('mouseleave', function(){
				$this.removeClass(_active);
			});
		});

		$li.on('mouseenter', function(evt){ //觸發事件
			evt.preventDefault();

			$(this).trigger(_eventNmae);
		});

		$li.on('focusin', function(){ //觸發事件
			$(this).mouseenter();
		});

		$last_a.on('keydown', function(evt){ //最後一個 a 按下 tab 時，關閉所有子選單

			if( evt.which === _tab_key ) {
				$li.removeClass(_active);
			}
		});

		$env.on('mouseleave', function(){
			$li.removeClass(_active);
		});

		if( $set.clickToRemove ) {
			var $body = $('body');

			$env.on('click', function(evt){
				evt.stopPropagation();
			});

			$body.on('click', function(){
				$li.removeClass($set.activeClass);
			});
		}

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});