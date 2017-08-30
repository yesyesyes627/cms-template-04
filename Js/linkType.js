define(function(){
	
	function main(env, opt, file){

		var $set = {
				externalClass: 'link', //外部連結的 class
				domains: [],
				debug: false
			}

		$.extend($set, opt);

		var $this = $(env),
			$a = $this.find('a').filter(function(i){ //沒有圖片的 a
				return !($(this).find('*').length)
			});

		var $domains = $set.domains;

		$domains.push(window.location.hostname);

		var $domains_l = $domains.length;

		$a.each(function(i, d){
			var $this = $(this),
				_href = $this.attr('href') || '',
				_dot_i = _href.lastIndexOf('.'),
				_slash = _href.lastIndexOf('/');

			var _has_http = !!(_href.match(/^https?\:\/\//)),
				_is_local = -1; //如果是本地或指定檔案

			if( _href === '#' || _href.indexOf('javascript:') === 0 ) {
				return true;
			}

			for( var i = 0; i < $domains_l; i++) {
				_is_local = Math.max(_is_local, _href.indexOf($domains[i])); //只要有一個大於-1，就是內部
			}

			if( _has_http && _is_local === -1 ) { //如果有 http(s) 又不是本地 就是外部連結
				$this.addClass($set.externalClass); //加入外部連結 class

			}else if( _dot_i > _slash ) { //最後是 .*
				var _dot_i = _href.lastIndexOf('.') + 1, //最後一個.
					_ques_i =_href.indexOf('?'), // 最後一個問候
					_length = _href.length,
					_type = 'other';

				if( _dot_i > _ques_i ){ //如果沒有問號或問號比.前面
					_length = _href.length - _dot_i;
				}else { //如果有問號
					_length = _ques_i - _dot_i;
				}

				_type = _href.substr(_dot_i, _length);

				$this.addClass(_type);
			}
		});

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});