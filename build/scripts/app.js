!function(n){var e={};function t(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return n[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=n,t.c=e,t.d=function(n,e,i){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:i})},t.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=6)}([function(module,exports){eval("\n            // переключение по кнопкам\n\n\n  var button1 = document.getElementById('button1');\n  var button2 = document.getElementById('button2');\n  var list1 = document.getElementById('list1');\n  var list2 = document.getElementById('list2');\n  var text1 = document.getElementById('text1');\n  var text2 = document.getElementById('text2');\n  var bg2 = document.getElementById('bg2');\n\n\n    \n\n    button2.addEventListener('click', function () {\n        button1.classList.add('colorbutton1');\n        button2.classList.add('colorbutton2');\n        list1.classList.add('hidden');\n        list2.classList.add('visible');\n        text1.classList.add('textcolor1');\n        text2.classList.add('textcolor2');\n        bg2.classList.add('bg2');\n    });\n\n    button1.addEventListener('click', function () {\n        button1.classList.remove('colorbutton1');\n        button2.classList.remove('colorbutton2');\n        list1.classList.remove('hidden');\n        list2.classList.remove('visible');\n        text1.classList.remove('textcolor1');\n        text2.classList.remove('textcolor2');\n        bg2.classList.remove('bg2');\n    });\n\n\n\n    // Переключение по времени\n\n    var bgpo4emu = document.getElementById('bgpo4emu');\n    var i = 0;\n    var classmass = ['bgpo4emu1', 'bgpo4emu2', 'bgpo4emu3'];\n    function func() {\n        bgpo4emu.classList.add(classmass[i]);\n        i++;\n        if(i > 2){\n            i = 0;\n        }\n\n    }\n\n    setInterval(func, 2000);\n\n\n\n    // popap\n\n    var popap = document.getElementById('popap'); \n    var button = document.getElementById('button');\n\n\n    button.addEventListener('click', function () {\n        popap.classList.add('popapvisibl');\n        \n    });\n\n\n\n    // burger\n\n    var burger = document.getElementById('burger');\n    var adaptmenu = document.getElementById('adaptmenu');\n    var close  = document.getElementById('close');\n\n    burger.addEventListener('click', function () {\n        adaptmenu.classList.add('adaptvisible');    \n    });\n\n    close.addEventListener('click', function () {\n        adaptmenu.classList.remove('adaptvisible');    \n    });\n\n\n//# sourceURL=webpack:///./src/scripts/common/scriptcustom.js?")},function(module,exports){eval("var initPhotoSwipeFromDOM = function(gallerySelector) {\n\n    // parse slide data (url, title, size ...) from DOM elements \n    // (children of gallerySelector)\n    var parseThumbnailElements = function(el) {\n        var thumbElements = el.childNodes,\n            numNodes = thumbElements.length,\n            items = [],\n            figureEl,\n            linkEl,\n            size,\n            item;\n\n        for(var i = 0; i < numNodes; i++) {\n\n            figureEl = thumbElements[i]; // <figure> element\n\n            // include only element nodes \n            if(figureEl.nodeType !== 1) {\n                continue;\n            }\n\n            linkEl = figureEl.children[0]; // <a> element\n\n            size = linkEl.getAttribute('data-size').split('x');\n\n            // create slide object\n            item = {\n                src: linkEl.getAttribute('href'),\n                w: parseInt(size[0], 10),\n                h: parseInt(size[1], 10)\n            };\n\n\n\n            if(figureEl.children.length > 1) {\n                // <figcaption> content\n                item.title = figureEl.children[1].innerHTML; \n            }\n\n            if(linkEl.children.length > 0) {\n                // <img> thumbnail element, retrieving thumbnail url\n                item.msrc = linkEl.children[0].getAttribute('src');\n            } \n\n            item.el = figureEl; // save link to element for getThumbBoundsFn\n            items.push(item);\n        }\n\n        return items;\n    };\n\n    // find nearest parent element\n    var closest = function closest(el, fn) {\n        return el && ( fn(el) ? el : closest(el.parentNode, fn) );\n    };\n\n    // triggers when user clicks on thumbnail\n    var onThumbnailsClick = function(e) {\n        e = e || window.event;\n        e.preventDefault ? e.preventDefault() : e.returnValue = false;\n\n        var eTarget = e.target || e.srcElement;\n\n        // find root element of slide\n        var clickedListItem = closest(eTarget, function(el) {\n            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');\n        });\n\n        if(!clickedListItem) {\n            return;\n        }\n\n        // find index of clicked item by looping through all child nodes\n        // alternatively, you may define index via data- attribute\n        var clickedGallery = clickedListItem.parentNode,\n            childNodes = clickedListItem.parentNode.childNodes,\n            numChildNodes = childNodes.length,\n            nodeIndex = 0,\n            index;\n\n        for (var i = 0; i < numChildNodes; i++) {\n            if(childNodes[i].nodeType !== 1) { \n                continue; \n            }\n\n            if(childNodes[i] === clickedListItem) {\n                index = nodeIndex;\n                break;\n            }\n            nodeIndex++;\n        }\n\n\n\n        if(index >= 0) {\n            // open PhotoSwipe if valid index found\n            openPhotoSwipe( index, clickedGallery );\n        }\n        return false;\n    };\n\n    // parse picture index and gallery index from URL (#&pid=1&gid=2)\n    var photoswipeParseHash = function() {\n        var hash = window.location.hash.substring(1),\n        params = {};\n\n        if(hash.length < 5) {\n            return params;\n        }\n\n        var vars = hash.split('&');\n        for (var i = 0; i < vars.length; i++) {\n            if(!vars[i]) {\n                continue;\n            }\n            var pair = vars[i].split('=');  \n            if(pair.length < 2) {\n                continue;\n            }           \n            params[pair[0]] = pair[1];\n        }\n\n        if(params.gid) {\n            params.gid = parseInt(params.gid, 10);\n        }\n\n        return params;\n    };\n\n    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {\n        var pswpElement = document.querySelectorAll('.pswp')[0],\n            gallery,\n            options,\n            items;\n\n        items = parseThumbnailElements(galleryElement);\n\n        // define options (if needed)\n        options = {\n\n            // define gallery index (for URL)\n            galleryUID: galleryElement.getAttribute('data-pswp-uid'),\n\n            getThumbBoundsFn: function(index) {\n                // See Options -> getThumbBoundsFn section of documentation for more info\n                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail\n                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,\n                    rect = thumbnail.getBoundingClientRect(); \n\n                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};\n            }\n\n        };\n\n        // PhotoSwipe opened from URL\n        if(fromURL) {\n            if(options.galleryPIDs) {\n                // parse real index when custom PIDs are used \n                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url\n                for(var j = 0; j < items.length; j++) {\n                    if(items[j].pid == index) {\n                        options.index = j;\n                        break;\n                    }\n                }\n            } else {\n                // in URL indexes start from 1\n                options.index = parseInt(index, 10) - 1;\n            }\n        } else {\n            options.index = parseInt(index, 10);\n        }\n\n        // exit if index not found\n        if( isNaN(options.index) ) {\n            return;\n        }\n\n        if(disableAnimation) {\n            options.showAnimationDuration = 0;\n        }\n\n        // Pass data to PhotoSwipe and initialize it\n        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);\n        gallery.init();\n    };\n\n    // loop through all gallery elements and bind events\n    var galleryElements = document.querySelectorAll( gallerySelector );\n\n    for(var i = 0, l = galleryElements.length; i < l; i++) {\n        galleryElements[i].setAttribute('data-pswp-uid', i+1);\n        galleryElements[i].onclick = onThumbnailsClick;\n    }\n\n    // Parse URL and open gallery if it contains #&pid=3&gid=1\n    var hashData = photoswipeParseHash();\n    if(hashData.pid && hashData.gid) {\n        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );\n    }\n};\n\n// execute above function\ninitPhotoSwipeFromDOM('.my-gallery');\n\n//# sourceURL=webpack:///./src/scripts/common/photoswipe.js?")},function(module,exports){eval("\n{\n    var swiper = new Swiper('.swiper-container', {\n        loop: true,\n        slidesPerView: 1,\n        pagination: {\n          el: '.swiper-pagination',\n          clickable: true,\n        },\n        navigation: {\n            nextEl: '.swiper-button-next',\n            prevEl: '.swiper-button-prev',\n          },\n      });\n}\n\n//# sourceURL=webpack:///./src/scripts/common/slider.js?")},function(module,exports){eval("\n// const menu = document.getElementById('menu');\n\n// const link = document.getElementById('link');\n// const number = document.getElementById('number');\n{\nvar b = document.getElementById(\"humburger\");\n\nif (b){\n\n\nconst humburger = document.getElementById('humburger');\nconst menuadpt = document.getElementById('menuadpt');\nconst burgerline2 = document.getElementById('line2');\nconst burgerline1 = document.getElementById('line1');\nconst burgerline3 = document.getElementById('line3');\nconst foto1 = document.getElementById('foto1');\nconst foto2 = document.getElementById('foto2');\nconst foto3 = document.getElementById('foto3');\nconst foto4 = document.getElementById('foto4');\nconst foto5 = document.getElementById('foto5');\nconst itemmenu = document.getElementById('itemmenu');\nconst itemmenu1 = document.getElementById('itemmenu1');\nconst itemmenu2 = document.getElementById('itemmenu2');\nconst itemmenu3 = document.getElementById('itemmenu3');\n\nhumburger.addEventListener('click', () => {\n    humburger.classList.toggle('mrg');\n    menuadpt.classList.toggle('menuadapt');\n    burgerline2.classList.toggle('line-hidden');\n    burgerline1.classList.toggle('line1-transform');\n    burgerline3.classList.toggle('line3-transform');\n});\n\nitemmenu.addEventListener('click', () => {\n    menuadpt.classList.remove('menuadapt');\n    burgerline2.classList.toggle('line-hidden');\n    burgerline1.classList.toggle('line1-transform');\n    burgerline3.classList.toggle('line3-transform');\n    \n});\nitemmenu1.addEventListener('click', () => {\n    menuadpt.classList.remove('menuadapt');\n    burgerline2.classList.toggle('line-hidden');\n    burgerline1.classList.toggle('line1-transform');\n    burgerline3.classList.toggle('line3-transform');\n    \n});\nitemmenu2.addEventListener('click', () => {\n    menuadpt.classList.remove('menuadapt');\n    burgerline2.classList.toggle('line-hidden');\n    burgerline1.classList.toggle('line1-transform');\n    burgerline3.classList.toggle('line3-transform');\n    \n});\nitemmenu3.addEventListener('click', () => {\n    menuadpt.classList.remove('menuadapt');\n    burgerline2.classList.toggle('line-hidden');\n    burgerline1.classList.toggle('line1-transform');\n    burgerline3.classList.toggle('line3-transform');\n    \n});\n\n\n}\n};\n\n\n\n\n\n//# sourceURL=webpack:///./src/scripts/common/burger.js?")},function(module,exports){eval("// require('../../dist/js/scrolloverflow.min.js');\n// require('../../dist/js/fullpage.min.js');\n\n// if ($(document).width() > 1279) {\n//     $('#fullpage').fullpage({\n//         // anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage'],\n//         //responsiveHeight: 1279,\n//         // scrollOverflow: true,\n//     });\n// }\n\n\n//# sourceURL=webpack:///./src/scripts/common/fp.js?")},function(module,exports,__webpack_require__){eval("// require('./common/fp')\n__webpack_require__(3);\n__webpack_require__(2);\n__webpack_require__(1);\n// require('./common/jquery-3.2.1.min');\n__webpack_require__(0);\n\n\n\n\n//# sourceURL=webpack:///./src/scripts/app.js?")},function(module,exports,__webpack_require__){eval("__webpack_require__(5);\n__webpack_require__(3);\n__webpack_require__(4);\n__webpack_require__(1);\n__webpack_require__(0);\nmodule.exports = __webpack_require__(2);\n\n\n//# sourceURL=webpack:///multi_./src/scripts/app.js_./src/scripts/common/burger.js_./src/scripts/common/fp.js_./src/scripts/common/photoswipe.js_./src/scripts/common/scriptcustom.js_./src/scripts/common/slider.js?")}]);