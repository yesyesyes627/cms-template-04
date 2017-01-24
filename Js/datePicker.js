define(function(){
	
	function main(env, opt, file){

		var $set = {
				language: 'en',
				todayButton: new Date(),
				debug: false
			}

		$.extend($set, opt);

		// var $elem = document.createElement('input'); //建立一個虛擬 input
		// $elem.setAttribute('type', 'date'); //指定為日期欄位

		// if ( $elem.type === 'text' ) { //如果 type 仍是 text，及代表尚未實作 date picker

			var $this = $(env),
				$date = $this.find('[type="date"]');

			$date.each(function(i,n){
				$date.attr('type', 'text');
				$(n).datepicker($set);
			});
		// }

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});