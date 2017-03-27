$('img').each(function(){
    $(this).addClass('preload-img');
});

$(".preload-img").load(function(e){
    $(this).fadeIn(1000);
});

function generateValue(val){
    return val * 100;
}