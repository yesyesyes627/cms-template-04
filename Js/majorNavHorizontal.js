define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				activeClass: 'is-active',
				parentClass: 'is-parent',
				clickToRemove: true,
				event: 'mouseenter', //jQuery 事件名稱
				debug: false
			}

		$.extend($set, opt);

		var $env = $(env),
			$li = getNode.getCtItem(env), //取 li
			$child_node = getNode.getChildGroup(env), //取 group nav
			$child_node_header = getNode.getHd($child_node),
			$a = $child_node_header.find('a'),
			$last_a = $env.find('a').eq(-1);

		var _tab_key = 9;

		//幫 .content 裡有 a 的物件加上 is-active
		$child_node.each(function(i, d){

			var $this = $(this),
				$li_parent = $this.parent('li'),
				$a = getNode.getCt($this).find('a');

			if( $a.length ) {
				$li_parent.addClass($set.parentClass);
			}
		});

		//為該 li 加入 class name，並刪除其他 li 的 class
		$a.on(file, function(){
			var $this = $(this),
				$li_parent = $this.closest('li');

			$li.removeClass($set.activeClass);
			$li_parent.addClass($set.activeClass);
		});

		$a.on($set.event, function(){ //觸發事件
			$(this).trigger(file);
		});

		//白癡的無障礙 tab 尋覽功能
		$a.on('keydown', function(evt){

			if( evt.which === _tab_key ) {
				$(this).trigger(file);
			}
		});

		$last_a.on('keydown', function(evt){ //最後一個 a 按下 tab 時，關閉所有子選單

			if( evt.which === _tab_key ) {
				$li.removeClass($set.activeClass);
			}
		});

		if( $set.event === 'mouseenter' ) {

			$env.on('mouseleave', function(){
				$li.removeClass($set.activeClass);
			});
		}

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