(this.webpackJsonproot=this.webpackJsonproot||[]).push([[23],{2885:function(e,t,n){},2886:function(e,t,n){"use strict";var a=n(0),c=n.n(a),l=n(1198),r=n(4),i=n(57),s=n(17),o=n(22),u=n(21),b=n(30),m=n(18),p=function(e){var t=e.ticket,n=Object(u.useConfig)().siteUrl.admin,a=Object(s.getAdminUrl)({adminSiteUrl:n,page:i.ADMIN_ROUTES.REGISTRATIONS}),o=Object(s.useEventId)(),p=Object(l.addQueryArgs)(a,{event_id:o,ticket_id:t.dbId,return:"edit"}),d=Object(r.__)("total registrations."),O=Object(r.__)("view ALL registrations for this ticket."),f=Object(b.useMemoStringify)({placement:"top"});return c.a.createElement(m.ItemCount,{count:t.registrationCount,title:d,emphasizeZero:!1},c.a.createElement(m.RegistrationsLink,{href:p,tooltip:O,tooltipProps:f}))};t.a=c.a.memo(p,Object(o.getPropsAreEqual)(["ticket","cacheId"]))},2887:function(e,t,n){"use strict";var a=n(0),c=n.n(a),l=n(4),r=n(22),i=n(18),s=n(17),o=function(e){var t=e.entity,n=Object(s.useTicketMutator)(t.id).updateEntity,o=Object(a.useCallback)((function(e){var a=Object(r.parseInfinity)(e);a!==t.quantity&&n({quantity:a})}),[t.quantity,n]);return c.a.createElement(i.InlineEditInfinity,{onChangeValue:o,value:"".concat(t.quantity),tooltip:Object(l.__)("edit quantity of tickets available...")})};t.a=c.a.memo(o,Object(r.getPropsAreEqual)(["entity","cacheId"]))},2888:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return E}));var a=n(0),c=n.n(a),l=n(4),r=n(17),i=n(18),s=n(22),o=function(e){var t=e.className,n=e.entity,s=e.view,o=void 0===s?"card":s,u=Object(r.useTicketMutator)(n.id).updateEntity,b="card"===o&&2,m=Object(a.useCallback)((function(e){e!==n.name&&u({name:e})}),[n.name,u]),p=Object(l.__)("edit title..."),d=n.name||p;return c.a.createElement(i.InlineEditText,{className:t,fitText:"card"===o,lineCount:b,onChangeValue:m,tag:"table"===o?"div":"h4",tooltip:p,value:d})},u=c.a.memo(o,Object(s.getPropsAreEqual)(["entity","name"])),b=n(43),m=n.n(b),p=n(6),d=n.n(p),O=n(569),f=n(19);function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){d()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var k=function(e){var t=Object(O.useInitialState)({ticketId:e}),n=Object(O.useDefaultBasePrice)(),c=Object(O.useMutatePrices)(),l=Object(r.useTicketMutator)(e).updateEntity;return Object(a.useCallback)((function(e){var a,r,i=t(null),s=j(j({},null===(a=i)||void 0===a?void 0:a.ticket),{},{price:e});if(i=j(j({},i),{},{ticket:s}),!Object(f.getBasePrice)(null===(r=i)||void 0===r?void 0:r.prices)){var o,u=[j(j({},n),{},{order:1,isNew:!0})].concat(m()(null===(o=i)||void 0===o?void 0:o.prices));i=j(j({},i),{},{prices:u})}var b=Object(O.calculateBasePrice)(i);c(b).then((function(t){l({price:e,reverseCalculate:!0,prices:t})}))}),[n,t,c,l])},v=n(30),_=function(e){var t=e.entity,n=e.className,r=k(t.id),s=Object(a.useCallback)((function(e){var n=e.amount,a=parseFloat(n);a!==t.price&&r(a)}),[r,t.price]),o=Object(v.useMemoStringify)({className:n});return c.a.createElement(i.CurrencyInput,{id:t.id,amount:t.price,placeholder:Object(l.__)("set price..."),wrapperProps:o,onChange:s,tag:"h3",tooltip:Object(l.__)("edit ticket total...")})},E=c.a.memo(_,Object(s.getPropsAreEqual)(["entity","price"]))},2891:function(e,t,n){"use strict";var a=n(3),c=n.n(a),l=n(9),r=n.n(l),i=n(0),s=n.n(i),o=n(18),u=n(22),b=n(979),m=function(e){return Object(b.b)("ticket",e)},p=function(e){var t=e.entity,n=r()(e,["entity"]),a=m(t);return s.a.createElement(o.EntityActionsMenu,c()({},n,{menuItems:a}))};t.a=s.a.memo(p,Object(u.getPropsAreEqual)(["entity","cacheId"]))},2893:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(4),r=n(18),i=n(17),s=n(3),o=n.n(s),u=n(21),b=Object(u.withFeature)("use_bulk_edit")((function(e){var t=Object(i.useEdtrState)().visibleTicketIds;return c.a.createElement(r.ActionCheckbox,o()({},e,{visibleEntityIds:t}))})),m=function(){return Object(a.useCallback)((function(e){var t=e.displayStartOrEndDate;return{cells:[{key:"stripe",type:"cell",className:"ee-ticket-list-col-hdr ee-entity-list-status-stripe ee-rspnsv-table-column-nano",value:""},{key:"checkbox",type:"cell",className:"ee-date-list-col-hdr ee-date-list-col-checkbox ee-rspnsv-table-column-micro",value:c.a.createElement("div",{className:"ee-rspnsv-table-hide-on-mobile"},c.a.createElement(b,null))},{key:"id",type:"cell",className:"ee-ticket-list-col-hdr ee-ticket-list-col-id ee-number-column ee-rspnsv-table-column-nano",value:Object(l.__)("ID")},{key:"name",type:"cell",className:"ee-ticket-list-col-hdr ee-ticket-list-col-name ee-rspnsv-table-column-bigger",value:Object(l.__)("Name")},{key:"start",type:"cell",className:"ee-ticket-list-col-hdr ee-ticket-list-col-name-start ee-rspnsv-table-column-default",value:c.a.createElement(c.a.Fragment,null,c.a.createElement("span",{className:"ee-rspnsv-table-long-label"},Object(l.__)("Goes on Sale")),c.a.createElement("span",{className:"ee-rspnsv-table-short-label"},Object(l.__)("On Sale")))},{key:"end",type:"cell",className:"ee-ticket-list-col-hdr ee-ticket-list-col-end ee-rspnsv-table-column-default",value:c.a.createElement(c.a.Fragment,null,c.a.createElement("span",{className:"ee-rspnsv-table-long-label"},Object(l.__)("Sale Ends")),c.a.createElement("span",{className:"ee-rspnsv-table-short-label"},Object(l.__)("Ends")))},{key:"price",type:"cell",className:"ee-ticket-list-col-hdr ee-ticket-list-col-price ee-rspnsv-table-column-tiny ee-number-column",value:Object(l.__)("Price")},{key:"quantity",type:"cell",className:"ee-ticket-list-col-hdr ee-ticket-list-col-quantity ee-rspnsv-table-column-tiny ee-number-column",value:Object(l.__)("Quantity")},{key:"sold",type:"cell",className:"ee-ticket-list-col-hdr ee-ticket-list-col-sold ee-rspnsv-table-column-tiny ee-number-column",value:Object(l.__)("Sold")},{key:"registrations",type:"cell",className:"ee-ticket-list-col-hdr ee-ticket-list-col-registrations ee-rspnsv-table-column-smaller ee-centered-column",value:c.a.createElement(c.a.Fragment,null,c.a.createElement("span",{className:"ee-rspnsv-table-long-label"},Object(l.__)("Registrations")),c.a.createElement("span",{className:"ee-rspnsv-table-short-label"},Object(l.__)("Regs")))},{key:"actions",type:"cell",className:"ee-ticket-list-col-hdr ee-actions-column ee-rspnsv-table-column-big ee-centered-column",value:c.a.createElement("span",{className:"ee-rspnsv-table-long-label"},Object(l.__)("Actions"))}].filter(Object(i.filterCellByStartOrEndDate)(t)),className:"ee-editor-ticket-list-items-header-row",key:"ticket-header-row",primary:!0,type:"row"}}),[])},p=n(24),d=n(10),O=n(57),f=n(1104),y=n(22),j=n(2891),k=n(2887),v=n(2888),_=n(2886),E=(n(2885),function(){var e=Object(u.useMoneyDisplay)().formatAmount;return Object(a.useCallback)((function(t){var n=t.entity,a=t.filterState,l=a.displayStartOrEndDate,s=a.sortingEnabled,o=Object(f.getTicketBackgroundColorClassName)(n),u=n.dbId||Object(y.shortenGuid)(n.id),m=Object(f.ticketStatus)(n),E={key:"name",type:"cell",className:"ee-ticket-list-cell ee-ticket-list-col-name ee-col-name ee-rspnsv-table-column-bigger ee-rspnsv-table-hide-on-mobile",value:s?n.name:c.a.createElement(v.a,{className:"ee-entity-list-text ee-focus-priority-5",entity:n,view:"table"})},h={key:"quantity",type:"cell",className:"ee-ticket-list-cell ee-ticket-list-col-quantity ee-rspnsv-table-column-tiny ee-number-column",value:s?n.quantity:c.a.createElement(k.a,{entity:n})},g=[{key:"stripe",type:"cell",className:"ee-ticket-list-cell ee-entity-list-status-stripe ".concat(o," ee-rspnsv-table-column-nano"),value:c.a.createElement("div",{className:"ee-rspnsv-table-show-on-mobile"},n.name)},{key:"checkbox",type:"cell",className:"ee-date-list-cell ee-date-list-col-checkbox ee-rspnsv-table-column-micro",value:c.a.createElement(b,{id:n.id})},{key:"id",type:"cell",className:"ee-ticket-list-cell ee-ticket-list-col-id ee-rspnsv-table-column-nano ee-number-column",value:u},E,{key:"start",type:"cell",className:"ee-ticket-list-cell ee-ticket-list-col-start ee-rspnsv-table-column-default",value:Object(p.format)(new Date(n.startDate),O.ENTITY_LIST_DATE_TIME_FORMAT)},{key:"end",type:"cell",className:"ee-ticket-list-cell ee-ticket-list-col-end ee-rspnsv-table-column-default",value:Object(p.format)(new Date(n.endDate),O.ENTITY_LIST_DATE_TIME_FORMAT)},{key:"price",type:"cell",className:"ee-ticket-list-col-hdr ee-ticket-list-col-price ee-rspnsv-table-column-tiny ee-number-column",value:e(n.price)},h,{key:"sold",type:"cell",className:"ee-ticket-list-cell ee-ticket-list-col-sold ee-rspnsv-table-column-tiny ee-number-column",value:n.sold},{key:"registrations",type:"cell",className:"ee-ticket-list-cell ee-ticket-list-col-registrations ee-rspnsv-table-column-smaller ee-centered-column",value:s?"-":c.a.createElement(_.a,{ticket:n})},{key:"actions",type:"cell",className:"ee-ticket-list-cell ee-actions-column ee-rspnsv-table-column-big",value:s?"-":c.a.createElement(j.a,{entity:n})}];return{cells:Object(d.I)(Object(d.m)(Object(i.filterCellByStartOrEndDate)(l)),Object(r.addZebraStripesOnMobile)(["row","stripe","name","actions"]))(g),className:"ee-editor-date-list-view-row ".concat(m),id:"ee-editor-date-list-view-row-".concat(n.id),key:"row-".concat(n.id),type:"row"}}),[e])}),h=n(44),g=n(26),C=n.n(g),T=n(216),w=n(30),S=n(6),P=n.n(S),N=n(2881),D=n(1875),x=n(2882),I=n(116),A=n(134),B=n.n(A),M=n(217),R=n.n(M),F=n(736),q=n(496),L=function(){var e=R()(B.a.mark((function e(t){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(q.yupToFinalFormErrors)(G,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),G=F.object({name:F.string().min(3,(function(){return Object(l.__)("Name must be at least three characters")}))});function U(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?U(Object(n),!0).forEach((function(t){P()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):U(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var V=Object(I.intervalsToOptions)(Object(d.G)(["months","weeks","days","hours","minutes"],I.DATE_INTERVALS),!0),Y=function(e){var t=e.onSubmit,n=Object(a.useCallback)((function(e,n){for(var a=arguments.length,c=new Array(a>2?a-2:0),l=2;l<a;l++)c[l-2]=arguments[l];return t.apply(void 0,[e,n].concat(c))}),[t]),c=Object(w.useMemoStringify)({className:"ee-form-item-pair"});return Object(a.useMemo)((function(){return Q(Q({},e),{},{onSubmit:n,validate:L,layout:"horizontal",debugFields:["values","errors"],sections:[{name:"basics",icon:N.a,title:Object(l.__)("Basics"),fields:[{name:"name",label:Object(l.__)("Name"),fieldType:"text",min:3},{name:"description",label:Object(l.__)("Description"),fieldType:"rich-text-editor"}]},{name:"dates",icon:D.a,title:Object(l.__)("Dates"),fields:[{name:"shiftDates",label:Object(l.__)("Shift dates"),fieldType:"group",formControlProps:{className:"shift-dates"},subFields:[{name:"value",fieldType:"number",min:1},{name:"unit",fieldType:"select",options:V},{name:"type",fieldType:"select",options:[{label:"",value:""},{label:Object(l.__)("earlier"),value:"earlier"},{label:Object(l.__)("later"),value:"later"}]}]}]},{name:"details",icon:x.a,title:Object(l.__)("Details"),fields:[{name:"quantity",label:Object(l.__)("Quantity For Sale"),fieldType:"number",formControlProps:c,parseAsInfinity:!0,min:-1},{name:"uses",label:Object(l.__)("Number of Uses"),fieldType:"number",parseAsInfinity:!0,formControlProps:c,min:0},{name:"min",label:Object(l.__)("Minimum Quantity"),fieldType:"number",formControlProps:c,min:0},{name:"max",label:Object(l.__)("Maximum Quantity"),fieldType:"number",parseAsInfinity:!0,formControlProps:c,min:-1},{name:"isRequired",label:Object(l.__)("Required Ticket"),fieldType:"switch",formControlProps:c}]}]})}),[c,e,n])},z=function(e){var t=Object(u.useBulkEdit)(),n=t.getSelected,c=t.unSelectAll,l=Object(i.useTickets)(),r=Object(i.useBulkEditTickets)().updateEntities;return Object(a.useCallback)((function(t){e(),c();var a=Object(i.formToBulkUpdateInput)(t,l,n());r(a)}),[l,n,e,c,r])},J=function(e){var t=e.onClose,n=e.isOpen,a=z(t),i=Y({onSubmit:a});return c.a.createElement(r.BulkEditDetails,{formConfig:i,isOpen:n,onClose:t,title:Object(l.__)("Bulk edit ticket details"),warning:Object(l.__)("any changes will be applied to ALL of the selected tickets.")})},Z=function(e){var t=e.areTrashedTickets,n=e.onClose,c=Object(u.useBulkEdit)(),l=c.getSelected,r=c.unSelectAll,s=Object(i.useBulkDeleteTickets)();return Object(a.useCallback)((function(){n(),r(),s(l(),t)}),[t,s,l,n,r])},H=function(e){var t=e.areTrashedTickets,n=e.onClose,i=Z({areTrashedTickets:t,onClose:n}),s=Object(r.useConfirmationDialog)({message:t?Object(l.__)("Are you sure you want to permanently delete these tickets? This action can NOT be undone!"):Object(l.__)("Are you sure you want to trash these tickets?"),title:t?Object(l.__)("Delete tickets permanently"):Object(l.__)("Trash tickets"),onConfirm:i,onCancel:n}),o=s.confirmationDialog,u=s.onOpen;return Object(a.useEffect)((function(){return u()}),[]),c.a.createElement(c.a.Fragment,null,o)},K=n(23),W=function(e){var t=e.setEditMode,n=Object(a.useCallback)((function(){return t("together")}),[t]),i=Object(a.useCallback)((function(){return t("separate")}),[t]);return c.a.createElement(K.Box,{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"},c.a.createElement(K.Box,null,c.a.createElement(r.Button,{onClick:n,buttonText:Object(l.__)("Edit all prices together")}),c.a.createElement("p",null,Object(l.__)("Edit all the selected ticket prices dynamically"))),c.a.createElement(K.Divider,{orientation:"vertical",height:"50%"}),c.a.createElement(K.Box,null,c.a.createElement(r.Button,{onClick:i,buttonText:Object(l.__)("Edit prices individually")}),c.a.createElement("p",null,Object(l.__)("Edit prices for each ticket individually"))))},X=function(e){var t=e.onSubmit,n=e.onReset,a=e.onCancel;return c.a.createElement(r.ButtonRow,{align:"right",topBordered:!0},n&&c.a.createElement(r.Button,{buttonText:Object(l.__)("Reset"),onClick:n,type:"reset"}),a&&c.a.createElement(r.Button,{buttonText:Object(l.__)("Cancel"),onClick:a}),c.a.createElement(r.Button,{buttonText:Object(l.__)("Submit"),buttonType:r.ButtonType.PRIMARY,onClick:t,type:"submit"}))},$=n(569),ee=n(19),te=function(e){var t=Object($.useDataState)(),n=t.prices,c=t.ticket,l=Object(u.useBulkEdit)().getSelected,r=Object(i.useTicketMutator)().updateEntity,s=Object($.useMutatePrices)(),o=Object(i.useTicketPrices)(l()),b=Object(i.useBulkDeletePrices)(),m=o.filter(ee.isNotDefault);return Object(a.useCallback)(R()(B.a.mark((function t(){return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(),t.next=3,b(Object(ee.getGuids)(m));case 3:return t.next=5,Promise.all(l().map(function(){var e=R()(B.a.mark((function e(t){var a;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(n);case 2:return a=e.sent,e.next=5,r({id:t,price:Object(y.parsedAmount)(c.price||0),reverseCalculate:Object(y.toBoolean)(c.reverseCalculate),isTaxable:Object(y.toBoolean)(c.isTaxable),prices:a});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 5:case"end":return t.stop()}}),t)}))),[b,l,s,m,e,n,c,r])},ne=Object($.withContext)((function(e){var t=e.onClose,n=Object($.useAddDefaultPrices)();Object(a.useEffect)((function(){n()}),[]);var l=te(t);return c.a.createElement(c.a.Fragment,null,c.a.createElement($.TicketPriceCalculator,null),c.a.createElement(X,{onSubmit:l,onReset:n}))}),{ticketId:""}),ae=function(e){var t=e.setTPCState,n=Object($.useDataState)(),r=n.ticket,i=n.getData;return Object(a.useEffect)((function(){t(i())}),[i]),c.a.createElement(c.a.Fragment,null,c.a.createElement("header",null,Object(l.sprintf)(Object(l.__)("Edit prices for Ticket: %s"),r.name)),c.a.createElement($.TicketPriceCalculator,null))};function ce(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function le(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ce(Object(n),!0).forEach((function(t){P()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ce(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var re=function(e,t){var n=Object($.useOnSubmitPrices)();return Object(a.useCallback)(R()(B.a.mark((function a(){return B.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return e(),a.next=3,Promise.all(Object.values(t()).map(function(){var e=R()(B.a.mark((function e(t){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 3:case"end":return a.stop()}}),a)}))),[t,e,n])},ie=function(e){var t=e.onClose,n=Object(u.useBulkEdit)().getSelected,l=function(){var e=Object(a.useRef)({}),t=Object(a.useCallback)((function(t){var n;e.current=le(le({},e.current),{},P()({},null===t||void 0===t||null===(n=t.ticket)||void 0===n?void 0:n.id,t))}),[e]),n=Object(a.useCallback)((function(){return e.current}),[e]);return Object(a.useMemo)((function(){return{setTPCState:t,getDataStates:n}}),[t,n])}(),r=l.getDataStates,i=l.setTPCState,s=re(t,r),o=n();return c.a.createElement(c.a.Fragment,null,o.map((function(e){var t=Object($.withContext)(ae,{ticketId:e});return c.a.createElement(t,{key:e,setTPCState:i})})),c.a.createElement(X,{onSubmit:s,onCancel:t}))},se=function(e){var t=e.onClose,n=e.isOpen,i=Object(a.useState)(),s=C()(i,2),o=s[0],u=s[1];return c.a.createElement(r.EntityEditModal,{isOpen:n,onClose:t,closeOnOverlayClick:!0,title:Object(l.__)("Bulk edit ticket prices")},!o&&c.a.createElement(W,{setEditMode:u}),"together"===o&&c.a.createElement(ne,{onClose:t}),"separate"===o&&c.a.createElement(ie,{onClose:t}))},oe=Object(u.withFeature)("use_bulk_edit")((function(){var e=Object(a.useState)(""),t=C()(e,2),n=t[0],i=t[1],s=Object(T.useDisclosure)(),o=s.isOpen,u=s.onOpen,m=s.onClose,p=Object(h.j)().status===h.d.trashedOnly,d=Object(w.useMemoStringify)([{value:"",label:Object(l.__)("bulk actions")},{value:"edit-details",label:Object(l.__)("edit ticket details")},{value:"delete",label:p?Object(l.__)("delete tickets"):Object(l.__)("trash tickets")},{value:"edit-prices",label:Object(l.__)("edit ticket prices")}]),O=Object(a.useCallback)((function(e){i(e),u()}),[u]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(r.BulkActions,{Checkbox:b,options:d,onApply:O,defaultAction:""}),o&&c.a.createElement(c.a.Fragment,null,"edit-details"===n&&c.a.createElement(J,{isOpen:!0,onClose:m}),"delete"===n&&c.a.createElement(H,{areTrashedTickets:p,onClose:m}),"edit-prices"===n&&c.a.createElement(se,{isOpen:!0,onClose:m})))}));t.default=Object(u.withBulkEdit)((function(){var e=Object(h.j)(),t=Object(h.h)(),n=Object(i.useReorderTickets)(t).sortResponder,a=E(),s=m();return c.a.createElement(c.a.Fragment,null,c.a.createElement(oe,null),c.a.createElement(r.EntityTable,{entities:t,filterState:e,bodyRowGenerator:a,headerRowGenerator:s,className:"ee-tickets-list-list-view ee-fade-in",tableId:"ticket-entities-table-view",tableCaption:Object(l.__)("Tickets"),onSort:n}))}))}}]);
//# sourceMappingURL=tickets-table-view.1902b4a1.chunk.js.map