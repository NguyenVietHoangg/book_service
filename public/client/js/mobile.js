var Zepto = (function() {
  var slice = [].slice, key, css, $$, fragmentRE, container, document = window.document, undefined;

  // fix for iOS 3.2
  if (String.prototype.trim === undefined)
    String.prototype.trim = function(){ return this.replace(/^\s+/, '').replace(/\s+$/, '') };

  function classRE(name){ return new RegExp("(^|\\s)" + name + "(\\s|$)") }
  function compact(array){ return array.filter(function(item){ return item !== undefined && item !== null }) }
  function flatten(array){ return array.reduce(function(a,b){ return a.concat(b) }, []) }
  function camelize(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }

  fragmentRE = /^\s*<.+>/;
  container = document.createElement("div");
  function fragment(html) {
    container.innerHTML = ('' + html).trim();
    var result = slice.call(container.childNodes);
    container.innerHTML = '';
    return result;
  }

  function Z(dom, selector){
    this.dom = dom || [];
    this.length = this.dom.length;
    this.selector = selector || '';
  }

  function $(selector, context){
    if (selector == document) return new Z;
    else if (context !== undefined) return $(context).find(selector);
    else if (typeof selector === 'function') return $(document).ready(selector);
    else {
      var dom;
      if (selector instanceof Z) dom = selector.dom;
      else if (selector instanceof Array) dom = compact(selector);
      else if (selector instanceof Element || selector === window) dom = [selector];
      else if (fragmentRE.test(selector)) dom = fragment(selector);
      else dom = $$(document, selector);

      return new Z(dom, selector);
    }
  }

  $.extend = function(target, source){ for (key in source) target[key] = source[key]; return target }
  $.qsa = $$ = function(element, selector){ return slice.call(element.querySelectorAll(selector)) }

  $.fn = {
    ready: function(callback){
      document.addEventListener('DOMContentLoaded', callback, false); return this;
    },
    get: function(idx){ return idx === undefined ? this.dom : this.dom[idx] },
    size: function(){ return this.length },
    remove: function(){ return this.each(function(){ this.parentNode.removeChild(this) }) },
    each: function(callback){
      this.dom.forEach(function(el, idx){ callback.call(el, idx, el) });
      return this;
    },
    filter: function(selector){
      return $(this.dom.filter(function(element){
        return $$(element.parentNode, selector).indexOf(element) >= 0;
      }));
    },
    is: function(selector){
      return this.length > 0 && $(this.dom[0]).filter(selector).length > 0;
    },
    first: function(){ return $(this.get(0)) },
    last: function(){ return $(this.get(this.length - 1)) },
    find: function(selector){
      var result;
      if (this.length == 1) result = $$(this.get(0), selector);
      else result = flatten(this.dom.map(function(el){ return $$(el, selector) }));
      return $(result);
    },
    closest: function(selector, context){
      var node = this.dom[0], nodes = $$(context !== undefined ? context : document, selector);
      if (nodes.length === 0) node = null;
      while(node && node !== document && nodes.indexOf(node) < 0) node = node.parentNode;
      return $(node);
    },
    parents: function(selector){
      var ancestors = [], nodes = this.get();
      while (nodes.length > 0)
        nodes = compact(nodes.map(function(node){
          if ((node = node.parentNode) && node !== document && ancestors.indexOf(node) < 0) {
            ancestors.push(node);
            return node;
          }
        }));
      ancestors = $(ancestors);
      return selector === undefined ? ancestors : ancestors.filter(selector);
    },
    parent: function(selector){
      var node, nodes = [];
      this.each(function(){
        if ((node = this.parentNode) && nodes.indexOf(node) < 0) nodes.push(node);
      });
      nodes = $(nodes);
      return selector === undefined ? nodes : nodes.filter(selector);
    },
    show: function() {
      return this.each(function() {
        $(this).css('display', this.oldDisplay);
        if($(this).css('display') == 'none') { $(this).css('display', 'block'); }
      });
    },
    hide: function() {
      return this.each(function() {
        var tmp = $(this).css('display');
        this.oldDisplay = tmp != 'none' ? tmp : undefined;
        $(this).css('display', 'none');
      });
    },
    toggle: function() {
      return this.each(function() {
        var tmp = $(this).css('display');
        if (tmp == 'none') {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    },
    pluck: function(property){ return this.dom.map(function(element){ return element[property] }) },
    prev: function(){ return $(this.pluck('previousElementSibling')) },
    next: function(){ return $(this.pluck('nextElementSibling')) },
    html: function(html){
      return html === undefined ?
        (this.length > 0 ? this.dom[0].innerHTML : null) :
        this.each(function(){ this.innerHTML = html });
    },
    text: function(text){
      return text === undefined ?
        (this.length > 0 ? this.dom[0].innerText : null) :
        this.each(function(){ this.innerText = text });
    },
    attr: function(name, value){
      return (typeof name == 'string' && value === undefined) ?
        (this.length > 0 && this.dom[0].nodeName === 'INPUT' && this.dom[0].type === 'text' && name === 'value') ? (this.dom[0].value) :
        (this.length > 0 ? this.dom[0].getAttribute(name) || undefined : null) :
        this.each(function(){
          if (typeof name == 'object') for (key in name) this.setAttribute(key, name[key])
          else this.setAttribute(name, value);
        });
    },
    val: function(value){
      if (typeof value == 'string') {
        return this.each(function() {
          if ($(this).is('input, textarea')) { this.value = value; }
        });
      } else { return this.get(0).value || ""; }
    },
    removeAttr: function(name){
      return (typeof name != 'string') ? this : this.each(function() {
        if (this.hasAttribute(name)) { this.removeAttribute(name); }
      });
    },
    offset: function(){
      var obj = this.dom[0].getBoundingClientRect();
      return {
        left: obj.left + document.body.scrollLeft,
        top: obj.top + document.body.scrollTop,
        width: obj.width,
        height: obj.height
      };
    },
    css: function(property, value){
      if (typeof property == 'string') { property = camelize(property); }
      if (value === undefined && typeof property == 'string') { return this.dom[0].style[property] || window.getComputedStyle(this.dom[0]).getPropertyValue(property); }
      var css={};
      if (typeof property != 'string') { for(var key in property) { css[camelize(key)] = property[key]; } }
      else { css[property] = value; }
      return this.each(function(i, element){ for(var key in css) element.style[key] = css[key]; });

      //
      // if (value === undefined && typeof property == 'string') return this.dom[0].style[camelize(property)];
      // css = "";
      // for (key in property) css += key + ':' + property[key] + ';';
      // if (typeof property == 'string') css = property + ":" + value;
      // return this.each(function() { this.style.cssText += ';' + css });
      //d4d51fefa62ad8c505146c2a2ff60ca0e91be730
    },
    index: function(element){
      return this.dom.indexOf($(element).get(0));
    },
    hasClass: function(name){
      return classRE(name).test(this.dom[0].className);
    },
    addClass: function(name){
      return this.each(function(){
        !$(this).hasClass(name) && (this.className += (this.className ? ' ' : '') + name)
      });
    },
    removeClass: function(name){
      return this.each(function(){
        this.className = this.className.replace(classRE(name), ' ').trim()
      });
    },
    toggleClass: function(name, when){
      return this.each(function(){
       ((when !== undefined && !when) || $(this).hasClass(name)) ?
         $(this).removeClass(name) : $(this).addClass(name)
      });
    }
  };

  ['width', 'height'].forEach(function(property){
    $.fn[property] = function(){ return this.offset()[property] }
  });


  var adjacencyOperators = {append: 'beforeEnd', prepend: 'afterBegin', before: 'beforeBegin', after: 'afterEnd'};

  for (key in adjacencyOperators)
    $.fn[key] = (function(operator) {
      return function(html){
        return this.each(function(){
          this['insertAdjacent' + (html instanceof Element ? 'Element' : 'HTML')](operator, html);
        });
      };
    })(adjacencyOperators[key]);

  Z.prototype = $.fn;

  return $;
})();

'$' in window || (window.$ = Zepto);
(function($){
  var $$ = $.qsa, handlers = {}, _zid = 1;
  function zid(element) {
    return element._zid || (element._zid = _zid++);
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event);
    if (event.ns) var matcher = matcherFor(event.ns);
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || handler.fn == fn)
        && (!selector || handler.sel == selector);
    });
  }
  function parse(event) {
    var parts = ('' + event).split('.');
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')};
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
  }

  function add(element, events, fn, selector, delegate){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []));
    events.split(/\s/).forEach(function(event){
      var handler = $.extend(parse(event), {fn: fn, sel: selector, del: delegate, i: set.length});
      set.push(handler);
      element.addEventListener(handler.e, delegate || fn, false);
    });
  }
  function remove(element, events, fn, selector){
    var id = zid(element);
    (events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i];
        element.removeEventListener(handler.e, handler.del || handler.fn, false);
      });
    });
  }

  $.event = {
    add: function(element, events, fn){
      add(element, events, fn);
    },
    remove: function(element, events, fn){
      remove(element, events, fn);
    }
  };

  $.fn.bind = function(event, callback){
    return this.each(function(){
      add(this, event, callback);
    });
  };
  $.fn.unbind = function(event, callback){
    return this.each(function(){
      remove(this, event, callback);
    });
  };

  var eventMethods = ['preventDefault', 'stopImmediatePropagation', 'stopPropagation'];
  function createProxy(event) {
    var proxy = $.extend({originalEvent: event}, event);
    eventMethods.forEach(function(key) {
      proxy[key] = function() {return event[key].apply(event, arguments)};
    });
    return proxy;
  }

  $.fn.delegate = function(selector, event, callback){
    return this.each(function(i, element){
      add(element, event, callback, selector, function(e){
        var target = e.target, nodes = $$(element, selector);
        while (target && nodes.indexOf(target) < 0) target = target.parentNode;
        if (target && !(target === element) && !(target === document)) {
          callback.call(target, $.extend(createProxy(e), {
            currentTarget: target, liveFired: element
          }));
        }
      });
    });
  };
  $.fn.undelegate = function(selector, event, callback){
    return this.each(function(){
      remove(this, event, callback, selector);
    });
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback);
    return this;
  };
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback);
    return this;
  };

  $.fn.trigger = function(event){
    return this.each(function(){
      var e = document.createEvent('Events');
      this.dispatchEvent(e, e.initEvent(event, true, false));
    });
  };

  $.fn.submit = function(){
    return this.each(function(){ this.submit(); });
  };
})(Zepto);
(function($){
  function detect(ua){
    var ua = ua, os = {},
      android = ua.match(/(Android)\s+([\d.]+)/),
      iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/),
      ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      webos = ua.match(/(webOS)\/([\d.]+)/);
    if (android) os.android = true, os.version = android[2];
    if (iphone) os.ios = true, os.version = iphone[2].replace(/_/g, '.'), os.iphone = true;
    if (ipad) os.ios = true, os.version = ipad[2].replace(/_/g, '.'), os.ipad = true;
    if (webos) os.webos = true, os.version = webos[2];
    return os;
  }
  $.os = detect(navigator.userAgent);
  $.__detect = detect;

  var v = navigator.userAgent.match(/WebKit\/([\d.]+)/);
  $.browser = v ? { webkit: true, version: v[1] } : { webkit: false };
})(Zepto);
(function($){
  $.fn.anim = function(properties, duration, ease){
    var transforms = [], opacity, key;
    for (key in properties)
      if (key === 'opacity') opacity = properties[key];
      else transforms.push(key + '(' + properties[key] + ')');

    return this.css({
      '-webkit-transition': 'all ' + (duration !== undefined ? duration : 0.5) + 's ' + (ease || ''),
      '-webkit-transform': transforms.join(' '),
      opacity: opacity
    });
  }
})(Zepto);
(function($){
  var touch = {}, touchTimeout;

  function parentIfText(node){
    return 'tagName' in node ? node : node.parentNode;
  }

  $(document).ready(function(){
    $(document.body).bind('touchstart', function(e){
      var now = Date.now(), delta = now - (touch.last || now);
      touch.target = parentIfText(e.touches[0].target);
      touchTimeout && clearTimeout(touchTimeout);
      touch.x1 = e.touches[0].pageX;
      if (delta > 0 && delta <= 250) touch.isDoubleTap = true;
      touch.last = now;
    }).bind('touchmove', function(e){
      touch.x2 = e.touches[0].pageX
    }).bind('touchend', function(e){
      if (touch.isDoubleTap) {
        $(touch.target).trigger('doubleTap');
        touch = {};
      } else if (touch.x2 > 0) {
        Math.abs(touch.x1 - touch.x2) > 30 && $(touch.target).trigger('swipe') &&
          $(touch.target).trigger('swipe' + (touch.x1 - touch.x2 > 0 ? 'Left' : 'Right'));
        touch.x1 = touch.x2 = touch.last = 0;
      } else if ('last' in touch) {
        touchTimeout = setTimeout(function(){
          touchTimeout = null;
          $(touch.target).trigger('tap')
          touch = {};
        }, 250);
      }
    }).bind('touchcancel', function(){ touch = {} });
  });

  ['swipe', 'swipeLeft', 'swipeRight', 'doubleTap', 'tap'].forEach(function(m){
    $.fn[m] = function(callback){ return this.bind(m, callback) }
  });
})(Zepto);
(function($){

  var jsonpID = 0;

  function empty() {}

  $.ajaxJSONP = function(options){
    var jsonpString;
    jsonpString = 'jsonp' + ++jsonpID;
    window[jsonpString] = options.success;
    var script = document.createElement('script');
    $(script).attr({ src: options.url.replace(/callback=\?/, 'callback=' + jsonpString) });
    $('head').append(script);
  };

  $.ajax = function(options){
    // { type, url, data, success, dataType, contentType, cache }
    options = options || {};

    if (options.url && /callback=\?/.test(options.url))
      return $.ajaxJSONP(options);

    var data = options.data,
        url = options.url || window.location,
        callback = options.success || empty,
        errback = options.error || empty,
        mime = mimeTypes[options.dataType],
        content = options.contentType,
        cache = options.cache,
        method = options.type || 'GET',
        xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 0) {
          if (mime == mimeTypes.json) {
            var result, error = false;
            try {
              result = JSON.parse(xhr.responseText);
            } catch (e) {
              error = e;
            }
            if (error) errback(xhr, 'parsererror', error);
            else callback(result, 'success', xhr);
          } else if (mime == mimeTypes.script) {
            var result, error = false;
            try {
              result = eval(xhr.responseText);
            } catch (e) {
              error = e;
            }
            if (error) errback(xhr, 'parsererror', error);
            else callback(result, 'success', xhr);
          } else callback(xhr.responseText, 'success', xhr);
        } else {
          errback(xhr, 'error');
        }
      }
    };

    if (mime == mimeTypes.script) { cache = false; }
    if (cache === false && method === "GET") {
      // try replacing _= if it is there
      var ts = (new Date).getTime(), ret = url.replace(rts, "$1_=" + ts + "$2");
      // if nothing was replaced, add timestamp to the end
      url = ret + ((ret === url) ? (rquery.test(url) ? "&" : "?") + "_=" + ts : "");
    }
    url = url + (rquery.test(url) ? "&" : "?") + "format=mobile";
    xhr.open(method, url, true);
    if (mime) xhr.setRequestHeader('Accept', mime);
    if (data instanceof Object) data = JSON.stringify(data), content = content || 'application/json';
    if (content) xhr.setRequestHeader('Content-Type', content);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(data);
  };

  var mimeTypes = $.ajax.mimeTypes = {
    json: 'application/json',
    xml:  'application/xml',
    html: 'text/html',
    text: 'text/plain',
    script: 'text/javascript, application/javascript'
  };

  var rquery = /\?/, rts = /(\?|&)_=.*?(&|$)/;

  $.get = function(url, success){ $.ajax({ url: url, success: success }) };
  $.post = function(url, data, success, dataType){
    if (data instanceof Function) dataType = dataType || success, success = data, data = null;
    $.ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType });
  };
  $.getJSON = function(url, success){ $.ajax({ url: url, success: success, dataType: 'json' }) };
  $.getScript = function(url, success) { $.ajax({ url: url, success: success, dataType: 'script' }) };

  $.fn.load = function(url, success){
    if (!this.dom.length) return this;
    var self = this, parts = url.split(/\s/), selector;
    if (parts.length > 1) url = parts[0], selector = parts[1];
    $.get(url, function(response){
      self.html(selector ?
        $(document.createElement('div')).html(response).find(selector).html()
        : response);
      success && success();
    });
    return this;
  };
})(Zepto);
(function($){
  var cache = [], timeout;

  $.fn.remove = function(){
    return this.each(function(element){
      if(element.tagName == 'IMG'){
        cache.push(element);
        element.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(function(){ cache = [] }, 60000);
      }
      element.parentNode.removeChild(element);
    });
  }
})(Zepto);

(function($){

Zepto.fn.autoHeight = function(){
  return this.each(function(i, el){
    var height = 0;
    for (var i=0; i < el.childNodes.length; i++){
      if (el.childNodes[i].nodeType == 1){
        height += el.childNodes[i].offsetHeight + 15;
      }
    }
    el.style.maxHeight = (height ? height + 5 : 0) + "px";
  });
};

$(document).ready(function(){
  /*
    iOS detection
  */
  if ($.os.ios) { $('html').addClass('ios'); }

  if (!isNaN(window.orientation)) {
    $(window).bind("orientationchange", function() {
      var orientation = (window.orientation == 0 || window.orientation == 180) ? "portrait" : "landscape";
      $('html').removeClass("portrait").removeClass("landscape").addClass(orientation);
    }).trigger("orientationchange");
  }

  /*
    Panel actions
  */
  var eventType = ($.os.ios || $.os.android) ? 'tap' : 'click';
  $(".m-panel-header").live(eventType, function() {
    var panel = $(this).closest("li");
    var content = $('.m-panel-content', panel);
    if ($(panel).hasClass("m-panel-open")) {
      panel.attr('class', "");
      content.css('max-height', '');
    } else {
      $(panel).addClass("m-panel-open");
      var loadURL = $(content).attr('data-load-url');
      if (loadURL){
        $('img', content).show();
        content.css('max-height', '20px');
        $.getScript(loadURL);
      } else {
        $('#post_comment', content).show();
        content.autoHeight();
      }
    }
  });

  $(".m-description .more").live(eventType, function() {
    $(this).closest('.m-description').addClass('open').removeClass('closed');
  });

  if ($('.hidden-facet').dom.length > 0) {
    $('.more-facets').show();

    $('.more-facets a').live("click", function(evt) {
      evt.preventDefault();
      var label = $(this).attr("data-label");
      $(this).attr("data-label", $(this).text());
      $(this).text(label);
      var elem = $('.hidden-facet').dom;
      var offset = elem[elem.length-1].offsetTop;
      $('.hidden-facet').toggleClass("show");
      $('html, body').each(function(){ this.scrollTop = offset; });
    });
  }

  /*
    Comments actions
  */
  $('a[href="#post_comment"]').live('click', function() {
    $('#post_comment').show();
  });

  $('#post_comment .left-button a').live('click', function(evt) {
    evt.preventDefault();
    $('body').append('<iframe id="comment_post_iframe"></iframe>');
    $('#post_comment form').attr('target', 'comment_post_iframe').submit();
    var container = $('#post_comment');
    $(container.get(0).parentNode).append('<div>'+container.attr('data-message')+'</div>');
    container.remove();
  });

  $('#post_comment .right-button a').live('click', function(evt){
    evt.preventDefault();
    $('#post_comment form textarea').val('');
    var post = $('#post_comment').hide().get(0);
    if ($(post.parentNode.parentNode).hasClass("m-panel-open")) {
      $(post.parentNode.parentNode).attr('class', '');
      $(post.parentNode).css('max-height', '');
    }
  });

  /*
    Search Field actions
  */
  $(".search-box input").bind('change focus blur keyup mouseup', function(evt) {
    if ($(this).val() != "") {
      $('.search-field-clear-button').show();
    } else {
      $('.search-field-clear-button').hide();
    }
  }).trigger('change');

  $(".search-field-clear-button").bind('click', function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    $(".search-box input").val('').trigger('change');
  });

  $(".search-field-side-button").bind('click', function(evt) {
    var panel_open = (document.body.className == "m-sidebar-open");
    document.body.className = (panel_open ? "" : "m-sidebar-open");
  });

  $('.search-field-submit-button').bind('click', function() {
    $('.search-top form').submit();
  });

  /*
    Credit Cards actions
  */
  $("#credit-cards .m-navigation li:last-child>a").bind('click', function(evt) {
    evt.preventDefault();
    var target = $(this);
    if (!confirm(target.attr('data-confirm'))) {
      return false;
    }
    $.get(target.attr('href'), function() {
      target.closest('li').closest('li').remove();
    });
  });

  $("#credit-cards .default").bind('click', function(evt) {
    evt.preventDefault();
    var target = $(this);
    if (target.attr('data-remote')){
      $.get(target.attr('href'), function() {
        var defaultString;
        $("#credit-cards .default").each(function(i, link) {
          if (!link.hasAttribute('data-remote')){
            defaultString = $(link).html();
            $(link).attr('data-remote', 'true');
          }
          $(link).html(target.html());
        });
        target.html(defaultString);
        target.removeAttr('data-remote');
      });
    }
  });

  /*
    Buy actions
  */
  $('.m-list a[rel*="http://opds-spec.org/acquisition/buy"]').live('click', function(evt) {
    var target = $(this);
    if (target.hasClass('buy')) {
      evt.preventDefault();
      target.attr('class', 'confirm').html(target.attr('data-label'));
    }
  });

  /*
    Links actions
  */
  $('a[data-rel="submit"]').live('click', function(evt) {
    evt.preventDefault();
    $(this).closest('form').append('<input type="hidden" name="commit"/>').submit();
  });

  $('a[data-method]').live('click', function(evt) {
    evt.preventDefault();
    var url = $(this).attr('href'),
        method = $(this).attr('data-method'),
        tokenName = $('meta[name="csrf-param"]').attr('content'),
        tokenValue = $('meta[name="csrf-token"]').attr('content');
    $('body').append('<form id="submit-with-method" action="'+url+'" method="'+method+'"><input type="hidden" name="'+tokenName+'" value="'+tokenValue+'"/></form>');
    $('#submit-with-method').submit();
  });

  /*
    Price range
  */
  $('[href="#price-range"] img').hide();
  $('#price-range.hide').hide();

  $('[href="#price-range"]').live('click', function(evt) {
    evt.preventDefault();
    $('#price-range').toggle();
    $('img', this).toggle();
  });

  $('[href="#price-range-submit"]').live('click', function(evt) {
    evt.preventDefault();
    var form = $(this).closest('form');
    var data = {};
    data.from_price = form.find('[name=from_price]').val();
    data.to_price = form.find('[name=to_price]').val();
    var url = form.attr('action'), range = {};
    for (key in data) {
      range[key] = parseInt(data[key]);
    }
    if (range.from_price > 0 && range.to_price > 0 && range.from_price < range.to_price) {
      url = url.replace('__range__', range.from_price+"|"+range.to_price);
      window.location.href = url;
    }
  });

  $('.show_password').live('click', function(evt) {
    var field = $('#user_password');
    var field_type = field.attr("type")
    if (field_type == "password") {
      field.attr('type', "text");
    } else {
      field.attr('type', "password");
    }
  });

});

})(Zepto);
