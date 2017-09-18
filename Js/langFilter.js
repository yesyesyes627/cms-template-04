define(function(){
    
    //取得網頁語系是否為中文，是的話回傳 true，不是的話回傳 false

    var _lang = $('body').data('lang') || window.CCMS_LanguageSN;
    
    if( _lang === 1 ) {
        return true;
    }else {
        return false;
    }
});