/**
 * @file
 * Provides Intersection Observer API AJAX helper.
 *
 * Blazy IO works fine with AJAX, until using VIS, or alike. Adds a helper.
 */

(function (Drupal) {

  'use strict';

  var _blazy = Drupal.blazy || {};
  var _ajax = Drupal.Ajax || {};
  var _proto = _ajax.prototype;
  var _revTimer;

  // Overrides Drupal.Ajax.prototype.success to re-observe new AJAX contents.
  _proto.success = (function (_ajax) {
    return function (response, status) {
      var me = _blazy.init;

      if (me !== null) {
        window.clearTimeout(_revTimer);
        // DOM ready fix. Be sure Views "Use field template" is disabled.
        _revTimer = window.setTimeout(function () {
          var elms = document.querySelectorAll(me.options.selector);
          if (elms !== null) {
            // ::load() means forcing them to load at once, great for small
            // amount of items, bad for large amount.
            // ::revalidate() means re-observe newly loaded AJAX contents without
            // forcing all images to load at once, great for large, bad for small.
            // Unfortunately revalidate() not always work, likely layout reflow.
            me.load(elms);
          }
        }, 100);
      }

      return _ajax.apply(this, arguments);
    };
  })(_proto.success);

})(Drupal);
;
!function(i,s,n){"use strict";function t(t,a){function e(i){if(g.find(".b-lazy:not(.b-loaded)").length){var n=g.find(i?".slide:not(.slick-cloned) .b-lazy:not(.b-loaded)":".slick-active .b-lazy:not(.b-loaded)");n.length&&s.blazy.init.load(n)}}function l(){b&&r(),y&&e(!1)}function o(s){var n=i(s),t=n.closest(".slide")||n.closest(".unslick");n.parentsUntil(t).removeClass(function(i,s){return(s.match(/(\S+)loading/g)||[]).join(" ")});var a=n.closest(".media--background");a.length&&a.find("> img").length&&(a.css("background-image","url("+n.attr("src")+")"),a.find("> img").remove(),a.removeAttr("data-lazy"))}function d(){g.children().sort(function(){return.5-Math.random()}).each(function(){g.append(this)})}function c(i){var s=i.slideCount<=i.options.slidesToShow,n=s||!1===i.options.arrows;if(g.attr("id")===i.$slider.attr("id")){i.options.centerPadding&&"0"!==i.options.centerPadding||i.$list.css("padding",""),s&&i.$slideTrack.width()<=i.$slider.width()&&i.$slideTrack.css({left:"",transform:""});var t=g.find(".b-loaded ~ .b-loader");t.length&&t.remove(),p[n?"addClass":"removeClass"]("visually-hidden")}}function r(){g.removeClass("is-paused"),g.find(".is-playing").length&&g.find(".is-playing").removeClass("is-playing").find(".media__icon--close").click()}function u(){g.addClass("is-paused").slick("slickPause")}function f(n){return _?{}:{slide:n.slide,lazyLoad:n.lazyLoad,dotsClass:n.dotsClass,rtl:n.rtl,prevArrow:i(".slick-prev",p),nextArrow:i(".slick-next",p),appendArrows:p,customPaging:function(i,t){var a=i.$slides.eq(t).find("[data-thumb]")||null,e='<img alt="'+s.t(a.find("img").attr("alt"))+'" src="'+a.data("thumb")+'">',l=a.length&&n.dotsClass.indexOf("thumbnail")>0?'<div class="slick-dots__thumbnail">'+e+"</div>":"",o=i.defaults.customPaging(i,t);return l?o.add(l):o}}}var k,g=i("> .slick__slider",a).length?i("> .slick__slider",a):i(a),p=i("> .slick__arrow",a),h=g.data("slick")?i.extend({},n.slick,g.data("slick")):i.extend({},n.slick),m=!("array"!==i.type(h.responsive)||!h.responsive.length)&&h.responsive,v=h.appendDots,y="blazy"===h.lazyLoad&&s.blazy,b=g.find(".media--player").length,_=g.hasClass("unslick");if(_||(h.appendDots=".slick__arrow"===v?p:v||i(g)),m)for(k in m)Object.prototype.hasOwnProperty.call(m,k)&&"unslick"!==m[k].settings&&(m[k].settings=i.extend({},n.slick,f(h),m[k].settings));g.data("slick",h),h=g.data("slick"),function(){h.randomize&&!g.hasClass("slick-initiliazed")&&d(),_||g.on("init.sl",function(n,t){".slick__arrow"===v&&i(t.$dots).insertAfter(t.$prevArrow);var a=g.find(".slick-cloned.slick-active .b-lazy:not(.b-loaded)");y&&a.length&&s.blazy.init.load(a)}),y?g.on("beforeChange.sl",function(){e(!0)}):i(".media--loading",g).closest(".slide__content").addClass("is-loading"),g.on("setPosition.sl",function(i,s){c(s)})}(),g.slick(f(h)),function(){g.parent().on("click.sl",".slick-down",function(s){s.preventDefault();var n=i(this);i("html, body").stop().animate({scrollTop:i(n.data("target")).offset().top-(n.data("offset")||0)},800,"easeOutQuad"in i.easing&&h.easing?h.easing:"swing")}),h.mouseWheel&&g.on("mousewheel.sl",function(i,s){return i.preventDefault(),g.slick(s<0?"slickNext":"slickPrev")}),y||g.on("lazyLoaded lazyLoadError",function(i,s,n){o(n)}),g.on("afterChange.sl",l),b&&(g.on("click.sl",".media__icon--close",r),g.on("click.sl",".media__icon--play",u))}(),_&&g.slick("unslick"),i(a).addClass("slick--initialized")}s.behaviors.slick={attach:function(s){i(".slick",s).once("slick").each(t)}}}(jQuery,Drupal,drupalSettings);
;
