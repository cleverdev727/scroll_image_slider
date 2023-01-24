var lastScrollTop = 0;
var trackTime = true;
$(document).scroll(function() {
   var viewPortStatus = elementInViewport2($('#image-sequence-scroll')[0]);
   var st = window.pageYOffset || document.documentElement.scrollTop;
   if (viewPortStatus && st % 5 == 0 && trackTime) {
      var oldVal = $('#image-sequence-scroll')[0].style.backgroundImage.split('360s_')[1].split('.jpg')[0];
      if (st > lastScrollTop){
         // downscroll code
         var newVal = (oldVal * 1 == 3) ? '0000' : '000' + (oldVal * 1 + 1);
         var nextVal = (newVal * 1 == 3) ? '0000' : '000' + (newVal * 1 + 1);
      } else {
         // upscroll code
         var newVal = (oldVal * 1 == 0) ? '0003' : '000' + (oldVal * 1 - 1);
         var nextVal = (newVal * 1 == 0) ? '0003' : '000' + (newVal * 1 - 1);
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      var newUrl = $('#image-sequence-scroll')[0].style.backgroundImage.replace(oldVal, newVal);
      var img=new Image();
      console.log(newUrl);
      img.src=newUrl.split('url("').join('').split('")').join('');
      console.log(img.src, typeof(img.src));
      img.onload = function(){
         $('#image-sequence-scroll')[0].style.backgroundImage = $('#image-sequence-scroll')[0].style.backgroundImage.replace(oldVal, newVal);
         trackTime = false;
         setTimeout(function() {
            trackTime = true;
         }, 500)
      }
   }
});

function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

function elementInViewport2(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}