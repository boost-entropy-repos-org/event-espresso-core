this.eejs=this.eejs||{},this.eejs.hocs=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=22)}([function(t,e){!function(){t.exports=this.wp.element}()},function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e){!function(){t.exports=this.wp.compose}()},function(t,e,n){t.exports=n(20)()},function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},function(t,e,n){"use strict";var r=function(){};t.exports=r},function(t,e){function n(){return t.exports=n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},n.apply(this,arguments)}t.exports=n},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}},function(t,e,n){var r=n(18);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}},function(t,e,n){var r=n(19),o=n(5);t.exports=function(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?o(t):e}},function(t,e){!function(){t.exports=this.lodash}()},function(t,e){!function(){t.exports=this.eejs.valueObjects}()},function(t,e){!function(){t.exports=this.wp.data}()},function(t,e){!function(){t.exports=this.eejs.validators}()},function(t,e){!function(){t.exports=this.wp.components}()},function(t,e){!function(){t.exports=this.wp.isShallowEqual}()},function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,r)}t.exports=n},function(t,e){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}t.exports=n},function(t,e,n){"use strict";var r=n(21);function o(){}function c(){}c.resetWarningCache=o,t.exports=function(){function t(t,e,n,o,c,i){if(i!==r){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:c,resetWarningCache:o};return n.PropTypes=n,n}},function(t,e,n){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,e,n){"use strict";n.r(e),n.d(e,"withBaseControl",(function(){return x})),n.d(e,"withMoney",(function(){return I})),n.d(e,"withLatestCheckin",(function(){return U}));var r=n(7),o=n.n(r),c=n(8),i=n.n(c),u=n(9),a=n.n(u),s=n(10),f=n.n(s),p=n(11),l=n.n(p),h=n(4),y=n.n(h),b=n(1),d=n.n(b),v=n(0),O=n(2),m=n(16),j=n(3),g=n.n(j);function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=y()(t);if(e){var o=y()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return l()(this,n)}}var x=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return Object(O.createHigherOrderComponent)(Object(O.compose)([O.withInstanceId,function(e){var n,r;return r=n=function(n){f()(c,n);var r=w(c);function c(){return i()(this,c),r.apply(this,arguments)}return a()(c,[{key:"render",value:function(){var n=this.props,r=n.label,c=n.instanceId,i=n.className,u=n.help,a="inspector-".concat(t,"-control-").concat(c);return Object(v.createElement)(m.BaseControl,{label:r,id:a,className:i,help:u},Object(v.createElement)(e,o()({},this.props,{label:"",id:a})))}}]),c}(v.Component),d()(n,"propTypes",{label:g.a.string,instanceId:g.a.oneOfType([g.a.number,g.a.string]),className:g.a.string,help:g.a.string}),d()(n,"defaultProps",{label:e.defaultProps&&e.defaultProps.label?e.defaultProps.label:""}),r}]),"withBaseControl")},P=n(5),S=n.n(P),C=n(12),k=n(17),_=n.n(k),M=n(6),T=n.n(M),E=n(13);function R(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function V(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?R(Object(n),!0).forEach((function(e){d()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function D(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=y()(t);if(e){var o=y()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return l()(this,n)}}var N=function(t){T()(t&&t.hasOwnProperty("convertedValues"),'The propNameMap callback for the withMoney HOC should return an object with a "convertedValues" key.'),t&&t.hasOwnProperty("convertedValues")&&T()(Object(C.isArray)(t.convertedValues),'The propNameMap callback for the withMoney HOC should return an object with a "convertedValues" key that has an array of numbers as the value.'),T()(t&&t.hasOwnProperty("props"),'The propNameMap callback for the withMoneyHOC should return an object with a "props" key.')},I=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return function(e){return function(n){f()(c,n);var r=D(c);function c(){var e;i()(this,c);for(var n=arguments.length,o=new Array(n),u=0;u<n;u++)o[u]=arguments[u];return e=r.call.apply(r,[this].concat(o)),d()(S()(e),"state",{convertedValues:[]}),d()(S()(e),"getNextState",(function(e){var n,r={},o=[];return Object(C.isFunction)(t)?(n=t(e,E.Money),N(n),n&&n.props&&(r=V({},n.props)),o=n.convertedValues||o):Object(C.isArray)(t)?t.forEach((function(t){e[t]&&(r[t]=new E.Money(e[t],E.SiteCurrency),o.push(r[t].toNumber()))})):T()(!1,"The propNameMap argument provided to withMoney must be either a function or an array"),r.convertedValues=o,r})),d()(S()(e),"shouldUpdateStateWithConvertedValues",(function(t,e,n){return!_()(n.convertedValues,e.convertedValues)&&n.convertedValues[0]!==e.convertedValues[0]})),e}return a()(c,[{key:"componentDidMount",value:function(){this.setState(this.getNextState(this.props))}},{key:"componentDidUpdate",value:function(t,e){var n=this.getNextState(this.props);this.shouldUpdateStateWithConvertedValues(t,e,n)&&this.setState(n)}},{key:"render",value:function(){return Object(v.createElement)(e,o()({},this.props,this.state))}}]),c}(v.Component)}},H=n(14),L=n(15),U=Object(O.createHigherOrderComponent)(Object(O.compose)([Object(H.withSelect)((function(t,e){var n=e.registration,r=e.datetimeId;if(!Object(L.isModelEntityOfModel)(n,"registration"))return{};var o=t("eventespresso/core").getLatestCheckin,c=t("core/data").hasFinishedResolution;return{checkinEntity:o(n.id,r)||null,hasResolvedCheckin:c("eventespresso/core","getLatestCheckin",[n.id,r])}})),Object(H.withDispatch)((function(t,e){var n=e.registration,r=e.datetimeId,o=t("eventespresso/core").toggleCheckin;return{onClick:function(){Object(L.isModelEntityOfModel)(n,"registration")&&o(n.id,r)}}}))]),"withLatestCheckin")}]);