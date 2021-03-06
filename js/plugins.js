// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/* Object.assign polyfill */
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target, firstSource) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

/**
 * Wade v0.3.2
 * Copyright 2017 Kabir Shah
 * Released under the MIT License
 */
!function(e,n){"object"==typeof module&&module.exports?module.exports=n():e.Wade=n()}(this,function(){var e={stopWords:["about","after","all","also","am","an","and","another","any","are","as","at","be","because","been","before","being","between","both","but","by","came","can","come","could","did","do","each","for","from","get","got","has","had","he","have","her","here","him","himself","his","how","if","in","into","is","it","like","make","many","me","might","more","most","much","must","my","never","now","of","on","only","or","other","our","out","over","said","same","see","should","since","some","still","such","take","than","that","the","their","them","then","there","these","they","this","those","through","to","too","under","up","very","was","way","we","well","were","what","where","which","while","who","with","would","you","your","a","i"],punctuationRE:/[.,!?:;"']/g},n=function(e,n){for(var o=n,r=0;r<e.length&&void 0!==(o=o[e[r]]);r++);return o},o=function(e,n,o,r){for(var t=null,i=0;i<e.length;i++){var a=e[i];void 0===(t=o[a])?(o[a]=n.length,n.push({index:a,score:r})):n[t].score+=r}},r=function(e,r,t,i,a){var u=n(e,r);void 0!==u&&void 0!==u.id&&o(u.id,t,i,a)},t=function(e,r,t,i,a){var u=n(e,r);if(void 0!==u)for(var h=[u],s=null,d=0;0!==h.length;){void 0!==(s=h[d]).id&&o(s.id,t,i,a),h.pop(),d--;for(var l in s)h.push(s[l]),d++}},i=function(e){var n=e.length-1;return" "===e[0]&&(e=e.substring(1))," "===e[n]&&(e=e.substring(0,n)),e.split(" ")},a=function(e){return e.toLowerCase()},u=function(n){return n.replace(e.punctuationRE,"")},h=function(e){for(var n=i(e),o=n.length;0!=o--;)-1!==s.config.stopWords.indexOf(n[o])&&n.splice(o,1);return n.join(" ")},s=function(e){var n=function(e){var o=n.index,a=s.process(e);if(!1===a)return[];for(var u=i(a),h=u.length,d=h-1,l=1/h,f=[],c={},v=0;v<d;v++)r(u[v],o,f,c,l);return t(u[d],o,f,c,l),f};if(Array.isArray(e)){for(var o=[],a=null,u=0;u<e.length;u++)!1!==(a=s.process(e[u]))&&o.push(a);n.index=s.index(o),n.data=o}else n.index=e.index,n.data=e.data;return n};return s.pipeline=[a,u,h],s.process=function(e){for(var n=s.pipeline,o=0;o<n.length;o++)e=n[o](e);return 0!==e.length&&e},s.index=function(e){for(var n={},o=0;o<e.length;o++)for(var r=i(e[o]),t=0;t<r.length;t++){for(var a=r[t],u=a.length-1,h=n,s=0;s<u;s++){var d=a[s],l=h[d];l=void 0===l?{}:l,h[d]=l,h=l}var f=a[u];void 0===h[f]?h[f]={id:[o]}:void 0===(h=h[f]).id?h.id=[o]:h.id.push(o)}return n},s.save=function(e){return{data:e.data,index:e.index}},s.config=e,s.version="0.3.2",s});
