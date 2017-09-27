define(['getNode', 'mobileFilter', 'getFocusNode'], function(getNode, mobileFilter, getFocusNode){
	
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
			$child_node_content = getNode.getCt($child_node),
			$a = $child_node_header.find('a'),
			$a_length = $a.length,
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
		
		//如果不是手機就開啟白癡無障礙尋覽功能
		if( !mobileFilter ) {
			var _tab_key = 9;

			var $after_a = getFocusNode($last_a);

			$after_a.on('keydown', function(evt){ //模組後第一個 a
				
				if( evt.which === _tab_key && evt.shiftKey ) {
					evt.preventDefault();
					$a.eq($a_length - 1).trigger(file);
					$last_a.focus();
				}
			});
			
			for( var i = 0; i < $a_length; i++ ) {

				(function(i){
					var $this = $a.eq(i),
						$item = $child_node_content.eq(i),
						$before_item = $child_node_content.eq(i - 1);
						
					var $item_all_a = $item.find('[href], input'),
						$before_item_all_a = $before_item.find('[href], input');

					var _isFirst = ( i === 0 ),
						_isLast = ( i === $a_length - 1 );
						
					var $item_last_a = $item_all_a.eq(-1),
						$before_item_last_a = $before_item_all_a.eq(-1);

					// 觸發 this 就 focus 目標裡的第一個 a
					$this.on('keydown', function(evt){
						$li.removeClass($set.activeClass);
						
						if( evt.which === _tab_key && !evt.shiftKey ) {

							if( $item_all_a.length ) {
								$this.trigger(file);
							}

						}else if( evt.which === _tab_key && evt.shiftKey && !_isFirst ) {
							evt.preventDefault();

							if( $before_item_all_a.length ) {
								$a.eq(i - 1).trigger(file);
								$before_item_last_a.focus();
							}else {
								$a.eq(i - 1).focus();
							}
						}
					});
					
					$item_last_a.on('keydown', function(evt){

						if( evt.which === _tab_key && !evt.shiftKey ) {
							$li.removeClass($set.activeClass);
						}
					});
				})(i);
			}
		}

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