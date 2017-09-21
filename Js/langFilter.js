define(function(){ //取得網頁語系是否為中文，是的話回傳 true，不是的話回傳 false

    if( window.CCMS_IsChinese === undefined ) {
        var _lang = window.CCMS_LanguageSN || $('body').data('lang');

        if( _lang === 1 ) {
            window.CCMS_IsChinese = true;
        }else {
            window.CCMS_IsChinese = false;
        }
    }
    
    return window.CCMS_IsChinese;
});