define(['getNode', 'mobileFilter'], function(getNode, mobileFilter){
	
	function main(env, opt, file){

		var $set = {
				bindNode: '.hd',
				targetNode: null,
				targetClass: 'is-active',
				toggleClass: 'is-active',
				btnOrangeText: null,
				btnActiveText: null,
				clickToRemove: false,
				event: 'click', //jQuery 事件名稱
				focusActive: true, //是否開啟白癡的無障礙 tab 功能
				cookie: false,
				debug: false
			}

		$.extend($set, opt);

		var $env = $(env),
			$target = $($set.targetNode),
			_eventNmae = file;

		//取觸發 btn，都沒有就取第一個 a
		var $btn = null; //按鈕物件

		if( $set.bindNode === '.hd' ) { //綁頭、身體或尾巴
			$btn = getNode.getHdLink(env).find('a');
		}else if ( $set.bindNode === '.ct' ){
			$btn = getNode.getCtIn(env).find('a');
		}else if ( $set.bindNode === '.ft' ){
			$btn = getNode.getFtItemBtn(env).find('a');
		}else {
			$btn = $env.find('a');
		}

		//設定文字功能...有原生文字及觸發文字
		if( !!$set.btnOrangeText && _flag && !!$set.btnActiveText ) {
			$btn.text($set.btnActiveText);
			$btn.attr('title', $set.btnActiveText);
		}else if( !!$set.btnOrangeText ) {
			$btn.text($set.btnOrangeText);
			$btn.attr('title', $set.btnOrangeText);
		}

		//紀錄觸發過的事件 cookie(UUID)，有的話就還原它的動作
		var _uuid = $env.attr('class').replace($set.toggleClass, ''), //!!!!----還要想一個 UUID 方法
			_flag = null; //0 未執行 / 1  執行中 / null 沒有

		if( !$set.cookie ) { //如果物件有建立 cookie 記錄此 env
			$.cookie(_uuid, null);
		}else {
			_flag = $.cookie(_uuid);
		}

		if( _flag === '1' ) {
			$target.addClass($set.targetClass);
			$env.addClass($set.toggleClass);
		}else if( _flag === '0' ) {
			$target.removeClass($set.targetClass);
			$env.removeClass($set.toggleClass);
		}

		//如果是手機瀏覽器，就關閉白癡的無障礙 Tab 尋覽功能
		if( mobileFilter ) {
			$set.focusActive = false;
		}

		//如果符合條件就開啟白癡的無障礙 tab 尋覽功能，不符合就觸發原生功能
		if( $set.focusActive ) {
			var	_tab_key = 9,
				$last_btn = getNode.getCtIn(env).find('a, input, select').eq(-1),
				$btns = $btn.add($last_btn);

			//第一個 a 及最後一個 a 按下 tab 時，觸發事件
			$btns.on('keydown', function(evt){

				if( evt.which === _tab_key ) {
					$btn.trigger(_eventNmae);
				}
			});
		}

		//如果符合以下三條件，就開啟 click body 刪除 env class 的功能
		if( $set.event === 'click' && $set.clickToRemove ) {
			var $body = $('body');

			$env.on('click', function(evt){
				evt.stopPropagation();

				//把不是自己，且 data-funclog 有 'clickToRemove':true 的物件刪除 class
				var $clickToRemoveNodes = $('[data-funclog]').filter(function(i, d){
						var _log = d.getAttribute('data-funclog'),
							_isClickToRemoveNode = /('clickToRemove':true)/i.test(_log),
							_isSelf = (d != env);
							
						return ( _isClickToRemoveNode && _isSelf );
					});

				$clickToRemoveNodes.removeClass($set.toggleClass);
			});

			$body.on('click', function(){
				$env.removeClass($set.toggleClass);
			});
		}

		$btn.on( $set.event, function(evt){ //觸發事件
			evt.preventDefault();
			
			$(this).trigger(_eventNmae);
		});

		//觸發的事件
		$btn.on(_eventNmae, function(){

			//主要功能...換 class orz
			$target.toggleClass($set.targetClass);
			$env.toggleClass($set.toggleClass);

			//如果有開啟 cookie 功能就紀錄吧
			if( $env.attr('class').search($set.toggleClass) > -1 && $set.cookie ) {
				$.cookie(_uuid, '1');
			}else if ( !!$set.cookie ){
				$.cookie(_uuid, '0');
			}

			//如果有開啟更改文字功能就改吧
			if( $btn.text() === $set.btnOrangeText && !!$set.btnActiveText ) {
				$btn.text($set.btnActiveText);
			}else if( $btn.text() === $set.btnActiveText && !!$set.btnOrangeText ) {
				$btn.text($set.btnOrangeText);
			}
		});

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});