define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				activeClass: 'is-active',
				parentClass: 'is-parent',
				event: 'click', //jQuery 事件名稱
				debug: false
			}

		$.extend($set, opt);

		var $li = getNode.getCtItem(env), //取 li
			$child_node = getNode.getChildGroup(env), //取 group nav
			$child_node_header = getNode.getHd($child_node),
			$a = $child_node_header.find('a'),
			$last_a = $(env).find('a').eq(-1);

		//幫 .content 裡有 a 的物件加上 is-active
		$child_node.each(function(i, d) { 

			var $this = $(this),
				$li_parent = $this.parent('li'),
				$a = getNode.getCt($this).find('a');

			if( $a.length ) {
				$li_parent.addClass($set.parentClass);
			}
		});

		$a.on($set.event, function(evt){ //觸發事件
			var $this = $(this),
				$li_parent = $this.closest('li');

			if( $li_parent.hasClass($set.parentClass) ) {
				evt.preventDefault();
			}

			$this.trigger(file);
		});

		$a.on(file, function(){
			var $this = $(this),
				$li_parent = $this.closest('li');

			if( $li_parent.hasClass($set.activeClass) ) {
				$li_parent.removeClass($set.activeClass);
			}else {
				$li.removeClass($set.activeClass);
				$li_parent.addClass($set.activeClass);
			}
		});

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});