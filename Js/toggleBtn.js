define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				bindNode: '.hd',
				targetNode: null,
				targetClass: 'is-active',
				toggleClass: 'is-active',
				btnOrangeText: null,
				btnActiveText: null,
				event: 'click', //jQuery 事件名稱
				focusActive: true, //是否可用 focus 啟用功能( 只限於 bindNode 是 .hd )
				cookie: false,
				debug: false
			}

		$.extend($set, opt);

		var _eventNmae = file; //事件名稱

		var $env = $(env),
			$btn = null, //按鈕物件
			$target = $($set.targetNode);

		var _uuid = $env.attr('class').replace($set.toggleClass, ''), //!!!!----要想一個 UUID 方法
			_flag = null, //0 未執行 / 1  執行中 / null 沒有
			_tab_key = 9;

		var _browserData = navigator.userAgent,
			_ios = !/(iPhone|iPad|iPod|iOS)/i.test(_browserData); //過濾 ios

		if( !$set.cookie ) {
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

		if( $set.bindNode === '.hd' ) { //綁頭、身體或尾巴
			$btn = getNode.getHdLink(env).find('a');
		}else if ( $set.bindNode === '.ct' ){
			$btn = getNode.getCtIn(env).find('a');
		}else if ( $set.bindNode === '.ft' ){
			$btn = getNode.getFtItemBtn(env).find('a');
		}else {
			$btn = $env.find($set.bindNode);
		}

		if( $set.focusActive && $set.bindNode === '.hd' && $set.event == 'click' && !_ios ) { //focus 到 hd 時會啟用程式，且離開時會關閉

			var $last_btn = getNode.getCtIn(env).find('a, input, select').eq(-1);

			$last_btn.on('keydown', function(evt){ //最後一個 a 按下 tab 時，關閉所有子選單

				if( evt.which === _tab_key ) {
					$btn.trigger(_eventNmae);
				}
			});

			$btn.on('focusin', function(){ //觸發事件
				$btn.trigger(_eventNmae);

				$btn.blur();
			});
		}

		if( !!$set.btnOrangeText && _flag && !!$set.btnActiveText ) { //如果有設定文字
			$btn.text($set.btnActiveText);
		}else if( !!$set.btnOrangeText ) {
			$btn.text($set.btnOrangeText);
		}

		$btn.on(_eventNmae, function(){
			$target.toggleClass($set.targetClass);
			$env.toggleClass($set.toggleClass);

			if( $env.attr('class').search($set.toggleClass) > -1 && $set.cookie ) { //如果有開啟 cookie 功能就紀錄
				$.cookie(_uuid, '1');
			}else if ( !!$set.cookie ){
				$.cookie(_uuid, '0');
			}

			if( $btn.text() === $set.btnOrangeText && !!$set.btnActiveText ) { //更改文字
				$btn.text($set.btnActiveText);
			}else if( $btn.text() === $set.btnActiveText && !!$set.btnOrangeText ) {
				$btn.text($set.btnOrangeText);
			}
		});

		$btn.on( $set.event, function(evt){ //觸發事件
			evt.preventDefault();

			if( !($set.focusActive && $set.bindNode === '.hd' && $set.event == 'click')) {
				$(this).trigger(_eventNmae);
			}
		});

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});