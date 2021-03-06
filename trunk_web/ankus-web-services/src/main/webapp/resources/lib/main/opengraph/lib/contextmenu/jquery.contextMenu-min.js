/*!
 * jQuery contextMenu - Plugin for simple contextMenu handling
 *
 * Version: 1.5.25
 *
 * Authors: Rodney Rehm, Addy Osmani (patches for FF)
 * Web: http://medialize.github.com/jQuery-contextMenu/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */
(function (k, f) {
    k.support.htmlMenuitem = ("HTMLMenuItemElement" in window);
    k.support.htmlCommand = ("HTMLCommandElement" in window);
    k.support.eventSelectstart = ("onselectstart" in document.documentElement);
    var i = null, g = false, d = k(window), a = 0, b = {}, j = {}, n = {}, h = {selector: null, appendTo: null, trigger: "right", autoHide: false, delay: 200, determinePosition: function (r) {
        if (k.ui && k.ui.position) {
            r.css("display", "block").position({my: "center top", at: "center bottom", of: this, offset: "0 5", collision: "fit"}).css("display", "none")
        } else {
            var s = this.offset();
            s.top += this.outerHeight();
            s.left += this.outerWidth() / 2 - r.outerWidth() / 2;
            r.css(s)
        }
    }, position: function (t, A, w) {
        var v = this, u;
        if (!A && !w) {
            t.determinePosition.call(this, t.$menu);
            return
        } else {
            if (A === "maintain" && w === "maintain") {
                u = t.$menu.position()
            } else {
                var z = t.$trigger.parents().andSelf().filter(function () {
                    return k(this).css("position") == "fixed"
                }).length;
                if (z) {
                    w -= d.scrollTop();
                    A -= d.scrollLeft()
                }
                u = {top: w, left: A}
            }
        }
        var r = d.scrollTop() + d.height(), B = d.scrollLeft() + d.width(), C = t.$menu.height(), s = t.$menu.width();
        if (u.top + C > r) {
            u.top -= C
        }
        if (u.left + s > B) {
            u.left -= s
        }
        t.$menu.css(u)
    }, positionSubmenu: function (r) {
        if (k.ui && k.ui.position) {
            r.css("display", "block").position({my: "left top", at: "right top", of: this, collision: "fit"}).css("display", "")
        } else {
            var s = {top: 0, left: this.outerWidth()};
            r.css(s)
        }
    }, zIndex: 1, animation: {duration: 50, show: "slideDown", hide: "slideUp"}, events: {show: k.noop, hide: k.noop}, callback: null, items: {}}, o = {timer: null, pageX: null, pageY: null}, q = function (t) {
        var s = 0, r = t;
        while (true) {
            s = Math.max(s, parseInt(r.css("z-index"), 10) || 0);
            r = r.parent();
            if (!r || !r.length || "html body".indexOf(r.prop("nodeName").toLowerCase()) > -1) {
                break
            }
        }
        return s
    }, m = {abortevent: function (r) {
        r.preventDefault();
        r.stopImmediatePropagation()
    }, contextmenu: function (t) {
        var s = k(this);
        t.preventDefault();
        t.stopImmediatePropagation();
        if (t.data.trigger != "right" && t.originalEvent) {
            return
        }
        if (!s.hasClass("context-menu-disabled")) {
            i = s;
            if (t.data.build) {
                var r = t.data.build(i, t);
                if (r === false) {
                    return
                }
                t.data = k.extend(true, {}, h, t.data, r || {});
                if (!t.data.items || k.isEmptyObject(t.data.items)) {
                    if (window.console) {
                        (console.error || console.log)("No items specified to show in contextMenu")
                    }
                    throw new Error("No Items sepcified")
                }
                t.data.$trigger = i;
                l.create(t.data)
            }
            l.show.call(s, t.data, t.pageX, t.pageY)
        }
    }, click: function (r) {
        r.preventDefault();
        r.stopImmediatePropagation();
        k(this).trigger(k.Event("contextmenu", {data: r.data, pageX: r.pageX, pageY: r.pageY}))
    }, mousedown: function (s) {
        var r = k(this);
        if (i && i.length && !i.is(r)) {
            i.data("contextMenu").$menu.trigger("contextmenu:hide")
        }
        if (s.button == 2) {
            i = r.data("contextMenuActive", true)
        }
    }, mouseup: function (s) {
        var r = k(this);
        if (r.data("contextMenuActive") && i && i.length && i.is(r) && !r.hasClass("context-menu-disabled")) {
            s.preventDefault();
            s.stopImmediatePropagation();
            i = r;
            r.trigger(k.Event("contextmenu", {data: s.data, pageX: s.pageX, pageY: s.pageY}))
        }
        r.removeData("contextMenuActive")
    }, mouseenter: function (t) {
        var s = k(this), r = k(t.relatedTarget), u = k(document);
        if (r.is(".context-menu-list") || r.closest(".context-menu-list").length) {
            return
        }
        if (i && i.length) {
            return
        }
        o.pageX = t.pageX;
        o.pageY = t.pageY;
        o.data = t.data;
        u.on("mousemove.contextMenuShow", m.mousemove);
        o.timer = setTimeout(function () {
            o.timer = null;
            u.off("mousemove.contextMenuShow");
            i = s;
            s.trigger(k.Event("contextmenu", {data: o.data, pageX: o.pageX, pageY: o.pageY}))
        }, t.data.delay)
    }, mousemove: function (r) {
        o.pageX = r.pageX;
        o.pageY = r.pageY
    }, mouseleave: function (s) {
        var r = k(s.relatedTarget);
        if (r.is(".context-menu-list") || r.closest(".context-menu-list").length) {
            return
        }
        try {
            clearTimeout(o.timer)
        } catch (s) {
        }
        o.timer = null
    }, layerClick: function (u) {
        var w = k(this), A = w.data("contextMenuRoot"), s = false, t = u.button, B = u.pageX, z = u.pageY, v, r, C;
        u.preventDefault();
        u.stopImmediatePropagation();
        w.on("mouseup", function () {
            s = true
        });
        setTimeout(function () {
            var D, y;
            if ((A.trigger == "left" && t == 0) || (A.trigger == "right" && t == 2)) {
                if (document.elementFromPoint) {
                    A.$layer.hide();
                    v = document.elementFromPoint(B - d.scrollLeft(), z - d.scrollTop());
                    A.$layer.show();
                    C = [];
                    for (var x in b) {
                        C.push(x)
                    }
                    v = k(v).closest(C.join(", "));
                    if (v.length) {
                        if (v.is(A.$trigger[0])) {
                            A.position.call(A.$trigger, A, B, z);
                            return
                        }
                    }
                } else {
                    r = A.$trigger.offset();
                    D = k(window);
                    r.top += D.scrollTop();
                    if (r.top <= u.pageY) {
                        r.left += D.scrollLeft();
                        if (r.left <= u.pageX) {
                            r.bottom = r.top + A.$trigger.outerHeight();
                            if (r.bottom >= u.pageY) {
                                r.right = r.left + A.$trigger.outerWidth();
                                if (r.right >= u.pageX) {
                                    A.position.call(A.$trigger, A, B, z);
                                    return
                                }
                            }
                        }
                    }
                }
            }
            y = function (E) {
                if (E) {
                    E.preventDefault();
                    E.stopImmediatePropagation()
                }
                A.$menu.trigger("contextmenu:hide");
                if (v && v.length) {
                    setTimeout(function () {
                        v.contextMenu({x: B, y: z})
                    }, 50)
                }
            };
            if (s) {
                y()
            } else {
                w.on("mouseup", y)
            }
        }, 50)
    }, keyStop: function (s, r) {
        if (!r.isInput) {
            s.preventDefault()
        }
        s.stopPropagation()
    }, key: function (w) {
        var u = i.data("contextMenu") || {}, s = u.$menu.children(), x;
        switch (w.keyCode) {
            case 9:
            case 38:
                m.keyStop(w, u);
                if (u.isInput) {
                    if (w.keyCode == 9 && w.shiftKey) {
                        w.preventDefault();
                        u.$selected && u.$selected.find("input, textarea, select").blur();
                        u.$menu.trigger("prevcommand");
                        return
                    } else {
                        if (w.keyCode == 38 && u.$selected.find("input, textarea, select").prop("type") == "checkbox") {
                            w.preventDefault();
                            return
                        }
                    }
                } else {
                    if (w.keyCode != 9 || w.shiftKey) {
                        u.$menu.trigger("prevcommand");
                        return
                    }
                }
            case 40:
                m.keyStop(w, u);
                if (u.isInput) {
                    if (w.keyCode == 9) {
                        w.preventDefault();
                        u.$selected && u.$selected.find("input, textarea, select").blur();
                        u.$menu.trigger("nextcommand");
                        return
                    } else {
                        if (w.keyCode == 40 && u.$selected.find("input, textarea, select").prop("type") == "checkbox") {
                            w.preventDefault();
                            return
                        }
                    }
                } else {
                    u.$menu.trigger("nextcommand");
                    return
                }
                break;
            case 37:
                m.keyStop(w, u);
                if (u.isInput || !u.$selected || !u.$selected.length) {
                    break
                }
                if (!u.$selected.parent().hasClass("context-menu-root")) {
                    var v = u.$selected.parent().parent();
                    u.$selected.trigger("contextmenu:blur");
                    u.$selected = v;
                    return
                }
                break;
            case 39:
                m.keyStop(w, u);
                if (u.isInput || !u.$selected || !u.$selected.length) {
                    break
                }
                var t = u.$selected.data("contextMenu") || {};
                if (t.$menu && u.$selected.hasClass("context-menu-submenu")) {
                    u.$selected = null;
                    t.$selected = null;
                    t.$menu.trigger("nextcommand");
                    return
                }
                break;
            case 35:
            case 36:
                if (u.$selected && u.$selected.find("input, textarea, select").length) {
                    return
                } else {
                    (u.$selected && u.$selected.parent() || u.$menu).children(":not(.disabled, .not-selectable)")[w.keyCode == 36 ? "first" : "last"]().trigger("contextmenu:focus");
                    w.preventDefault();
                    return
                }
                break;
            case 13:
                m.keyStop(w, u);
                if (u.isInput) {
                    if (u.$selected && !u.$selected.is("textarea, select")) {
                        w.preventDefault();
                        return
                    }
                    break
                }
                u.$selected && u.$selected.trigger("mouseup");
                return;
            case 32:
            case 33:
            case 34:
                m.keyStop(w, u);
                return;
            case 27:
                m.keyStop(w, u);
                u.$menu.trigger("contextmenu:hide");
                return;
            default:
                var r = (String.fromCharCode(w.keyCode)).toUpperCase();
                if (u.accesskeys[r]) {
                    u.accesskeys[r].$node.trigger(u.accesskeys[r].$menu ? "contextmenu:focus" : "mouseup");
                    return
                }
                break
        }
        w.stopPropagation();
        u.$selected && u.$selected.trigger(w)
    }, prevItem: function (v) {
        v.stopPropagation();
        var u = k(this).data("contextMenu") || {};
        if (u.$selected) {
            var r = u.$selected;
            u = u.$selected.parent().data("contextMenu") || {};
            u.$selected = r
        }
        var t = u.$menu.children(), s = !u.$selected || !u.$selected.prev().length ? t.last() : u.$selected.prev(), x = s;
        while (s.hasClass("disabled") || s.hasClass("not-selectable")) {
            if (s.prev().length) {
                s = s.prev()
            } else {
                s = t.last()
            }
            if (s.is(x)) {
                return
            }
        }
        if (u.$selected) {
            m.itemMouseleave.call(u.$selected.get(0), v)
        }
        m.itemMouseenter.call(s.get(0), v);
        var w = s.find("input, textarea, select");
        if (w.length) {
            w.focus()
        }
    }, nextItem: function (v) {
        v.stopPropagation();
        var u = k(this).data("contextMenu") || {};
        if (u.$selected) {
            var r = u.$selected;
            u = u.$selected.parent().data("contextMenu") || {};
            u.$selected = r
        }
        var t = u.$menu.children(), s = !u.$selected || !u.$selected.next().length ? t.first() : u.$selected.next(), x = s;
        while (s.hasClass("disabled") || s.hasClass("not-selectable")) {
            if (s.next().length) {
                s = s.next()
            } else {
                s = t.first()
            }
            if (s.is(x)) {
                return
            }
        }
        if (u.$selected) {
            m.itemMouseleave.call(u.$selected.get(0), v)
        }
        m.itemMouseenter.call(s.get(0), v);
        var w = s.find("input, textarea, select");
        if (w.length) {
            w.focus()
        }
    }, focusInput: function (v) {
        var u = k(this).closest(".context-menu-item"), t = u.data(), s = t.contextMenu, r = t.contextMenuRoot;
        r.$selected = s.$selected = u;
        r.isInput = s.isInput = true
    }, blurInput: function (v) {
        var u = k(this).closest(".context-menu-item"), t = u.data(), s = t.contextMenu, r = t.contextMenuRoot;
        r.isInput = s.isInput = false
    }, menuMouseenter: function (s) {
        var r = k(this).data().contextMenuRoot;
        r.hovering = true
    }, menuMouseleave: function (s) {
        var r = k(this).data().contextMenuRoot;
        if (r.$layer && r.$layer.is(s.relatedTarget)) {
            r.hovering = false
        }
    }, itemMouseenter: function (v) {
        var u = k(this), t = u.data(), s = t.contextMenu, r = t.contextMenuRoot;
        r.hovering = true;
        if (v && r.$layer && r.$layer.is(v.relatedTarget)) {
            v.preventDefault();
            v.stopImmediatePropagation()
        }
        (s.$menu ? s : r).$menu.children(".hover").trigger("contextmenu:blur");
        if (u.hasClass("disabled") || u.hasClass("not-selectable")) {
            s.$selected = null;
            return
        }
        u.trigger("contextmenu:focus")
    }, itemMouseleave: function (v) {
        var u = k(this), t = u.data(), s = t.contextMenu, r = t.contextMenuRoot;
        if (r !== s && r.$layer && r.$layer.is(v.relatedTarget)) {
            r.$selected && r.$selected.trigger("contextmenu:blur");
            v.preventDefault();
            v.stopImmediatePropagation();
            r.$selected = s.$selected = s.$node;
            return
        }
        u.trigger("contextmenu:blur")
    }, itemClick: function (w) {
        var v = k(this), u = v.data(), t = u.contextMenu, r = u.contextMenuRoot, s = u.contextMenuKey, x;
        if (!t.items[s] || v.hasClass("disabled") || v.hasClass("context-menu-submenu")) {
            return
        }
        w.preventDefault();
        w.stopImmediatePropagation();
        if (k.isFunction(r.callbacks[s])) {
            x = r.callbacks[s]
        } else {
            if (k.isFunction(r.callback)) {
                x = r.callback
            } else {
                return
            }
        }
        if (x.call(r.$trigger, s, r) !== false) {
            r.$menu.trigger("contextmenu:hide")
        } else {
            if (r.$menu.parent().length) {
                l.update.call(r.$trigger, r)
            }
        }
    }, inputClick: function (r) {
        r.stopImmediatePropagation()
    }, hideMenu: function (t, s) {
        var r = k(this).data("contextMenuRoot");
        l.hide.call(r.$trigger, r, s && s.force)
    }, focusItem: function (v) {
        v.stopPropagation();
        var u = k(this), t = u.data(), s = t.contextMenu, r = t.contextMenuRoot;
        u.addClass("hover").siblings(".hover").trigger("contextmenu:blur");
        s.$selected = r.$selected = u;
        if (s.$node) {
            r.positionSubmenu.call(s.$node, s.$menu)
        }
    }, blurItem: function (v) {
        v.stopPropagation();
        var u = k(this), t = u.data(), s = t.contextMenu, r = t.contextMenuRoot;
        u.removeClass("hover");
        s.$selected = null
    }}, l = {show: function (t, r, z) {
        var u = k(this), v, s = {};
        k("#context-menu-layer").trigger("mousedown");
        t.$trigger = u;
        if (t.events.show.call(u, t) === false) {
            i = null;
            return
        }
        l.update.call(u, t);
        t.position.call(u, t, r, z);
        if (t.zIndex) {
            s.zIndex = q(u) + t.zIndex
        }
        l.layer.call(t.$menu, t, s.zIndex);
        t.$menu.find("ul").css("zIndex", s.zIndex + 1);
        t.$menu.css(s)[t.animation.show](t.animation.duration);
        u.data("contextMenu", t);
        k(document).off("keydown.contextMenu").on("keydown.contextMenu", m.key);
        if (t.autoHide) {
            var w = u.position();
            w.right = w.left + u.outerWidth();
            w.bottom = w.top + this.outerHeight();
            k(document).on("mousemove.contextMenuAutoHide", function (x) {
                if (t.$layer && !t.hovering && (!(x.pageX >= w.left && x.pageX <= w.right) || !(x.pageY >= w.top && x.pageY <= w.bottom))) {
                    t.$menu.trigger("contextmenu:hide")
                }
            })
        }
    }, hide: function (r, s) {
        var u = k(this);
        if (!r) {
            r = u.data("contextMenu") || {}
        }
        if (!s && r.events && r.events.hide.call(u, r) === false) {
            return
        }
        if (r.$layer) {
            setTimeout((function (v) {
                return function () {
                    v.remove()
                }
            })(r.$layer), 10);
            try {
                delete r.$layer
            } catch (t) {
                r.$layer = null
            }
        }
        i = null;
        r.$menu.find(".hover").trigger("contextmenu:blur");
        r.$selected = null;
        k(document).off(".contextMenuAutoHide").off("keydown.contextMenu");
        r.$menu && r.$menu[r.animation.hide](r.animation.duration, function () {
            if (r.build) {
                r.$menu.remove();
                k.each(r, function (v, w) {
                    switch (v) {
                        case"ns":
                        case"selector":
                        case"build":
                        case"trigger":
                            return true;
                        default:
                            r[v] = f;
                            try {
                                delete r[v]
                            } catch (x) {
                            }
                            return true
                    }
                })
            }
        })
    }, create: function (s, r) {
        if (r === f) {
            r = s
        }
        s.$menu = k('<ul class="context-menu-list ' + (s.className || "") + '"></ul>').data({contextMenu: s, contextMenuRoot: r});
        k.each(["callbacks", "commands", "inputs"], function (u, t) {
            s[t] = {};
            if (!r[t]) {
                r[t] = {}
            }
        });
        r.accesskeys || (r.accesskeys = {});
        k.each(s.items, function (v, w) {
            var A = k('<li class="context-menu-item ' + (w.className || "") + '"></li>'), t = null, z = null;
            w.$node = A.data({contextMenu: s, contextMenuRoot: r, contextMenuKey: v});
            if (w.accesskey) {
                var x = c(w.accesskey);
                for (var u = 0, y; y = x[u]; u++) {
                    if (!r.accesskeys[y]) {
                        r.accesskeys[y] = w;
                        w._name = w.name.replace(new RegExp("(" + y + ")", "i"), '<span class="context-menu-accesskey">$1</span>');
                        break
                    }
                }
            }
            if (typeof w == "string") {
                A.addClass("context-menu-separator not-selectable")
            } else {
                if (w.type && n[w.type]) {
                    n[w.type].call(A, w, s, r);
                    k.each([s, r], function (C, B) {
                        B.commands[v] = w;
                        if (k.isFunction(w.callback)) {
                            B.callbacks[v] = w.callback
                        }
                    })
                } else {
                    if (w.type == "html") {
                        A.addClass("context-menu-html not-selectable")
                    } else {
                        if (w.type) {
                            t = k("<label></label>").appendTo(A);
                            k("<span></span>").html(w._name || w.name).appendTo(t);
                            A.addClass("context-menu-input");
                            s.hasTypes = true;
                            k.each([s, r], function (C, B) {
                                B.commands[v] = w;
                                B.inputs[v] = w
                            })
                        } else {
                            if (w.items) {
                                w.type = "sub"
                            }
                        }
                    }
                    switch (w.type) {
                        case"text":
                            z = k('<input type="text" value="1" name="context-menu-input-' + v + '" value="">').val(w.value || "").appendTo(t);
                            break;
                        case"textarea":
                            z = k('<textarea name="context-menu-input-' + v + '"></textarea>').val(w.value || "").appendTo(t);
                            if (w.height) {
                                z.height(w.height)
                            }
                            break;
                        case"checkbox":
                            z = k('<input type="checkbox" value="1" name="context-menu-input-' + v + '" value="">').val(w.value || "").prop("checked", !!w.selected).prependTo(t);
                            break;
                        case"radio":
                            z = k('<input type="radio" value="1" name="context-menu-input-' + w.radio + '" value="">').val(w.value || "").prop("checked", !!w.selected).prependTo(t);
                            break;
                        case"select":
                            z = k('<select name="context-menu-input-' + v + '">').appendTo(t);
                            if (w.options) {
                                k.each(w.options, function (B, C) {
                                    k("<option></option>").val(B).text(C).appendTo(z)
                                });
                                z.val(w.selected)
                            }
                            break;
                        case"sub":
                            k("<span></span>").html(w._name || w.name).appendTo(A);
                            w.appendTo = w.$node;
                            l.create(w, r);
                            A.data("contextMenu", w).addClass("context-menu-submenu");
                            w.callback = null;
                            break;
                        case"html":
                            k(w.html).appendTo(A);
                            break;
                        default:
                            k.each([s, r], function (C, B) {
                                B.commands[v] = w;
                                if (k.isFunction(w.callback)) {
                                    B.callbacks[v] = w.callback
                                }
                            });
                            k("<span></span>").html(w._name || w.name || "").appendTo(A);
                            break
                    }
                    if (w.type && w.type != "sub" && w.type != "html") {
                        z.on("focus", m.focusInput).on("blur", m.blurInput);
                        if (w.events) {
                            z.on(w.events, s)
                        }
                    }
                    if (w.icon) {
                        A.addClass("icon icon-" + w.icon)
                    }
                }
            }
            w.$input = z;
            w.$label = t;
            A.appendTo(s.$menu);
            if (!s.hasTypes && k.support.eventSelectstart) {
                A.on("selectstart.disableTextSelect", m.abortevent)
            }
        });
        if (!s.$node) {
            s.$menu.css("display", "none").addClass("context-menu-root")
        }
        s.$menu.appendTo(s.appendTo || document.body)
    }, update: function (s, r) {
        var t = this;
        if (r === f) {
            r = s;
            s.$menu.find("ul").andSelf().css({position: "static", display: "block"}).each(function () {
                var u = k(this);
                u.width(u.css("position", "absolute").width()).css("position", "static")
            }).css({position: "", display: ""})
        }
        s.$menu.children().each(function () {
            var u = k(this), v = u.data("contextMenuKey"), x = s.items[v], w = (k.isFunction(x.disabled) && x.disabled.call(t, v, r)) || x.disabled === true;
            u[w ? "addClass" : "removeClass"]("disabled");
            if (x.type) {
                u.find("input, select, textarea").prop("disabled", w);
                switch (x.type) {
                    case"text":
                    case"textarea":
                        x.$input.val(x.value || "");
                        break;
                    case"checkbox":
                    case"radio":
                        x.$input.val(x.value || "").prop("checked", !!x.selected);
                        break;
                    case"select":
                        x.$input.val(x.selected || "");
                        break
                }
            }
            if (x.$menu) {
                l.update.call(t, x, r)
            }
        })
    }, layer: function (s, t) {
        var r = s.$layer = k('<div id="context-menu-layer" style="position:fixed; z-index:' + t + '; top:0; left:0; opacity: 0; filter: alpha(opacity=0); background-color: #000;"></div>').css({height: d.height(), width: d.width(), display: "block"}).data("contextMenuRoot", s).insertBefore(this).on("contextmenu", m.abortevent).on("mousedown", m.layerClick);
        if (!k.support.fixedPosition) {
            r.css({position: "absolute", height: k(document).height()})
        }
        return r
    }};

    function c(w) {
        var u = w.split(/\s+/), v = [];
        for (var s = 0, r; r = u[s]; s++) {
            r = r[0].toUpperCase();
            v.push(r)
        }
        return v
    }

    k.fn.contextMenu = function (r) {
        if (r === f) {
            this.first().trigger("contextmenu")
        } else {
            if (r.x && r.y) {
                this.first().trigger(k.Event("contextmenu", {pageX: r.x, pageY: r.y}))
            } else {
                if (r === "hide") {
                    var s = this.data("contextMenu").$menu;
                    s && s.trigger("contextmenu:hide")
                } else {
                    if (r) {
                        this.removeClass("context-menu-disabled")
                    } else {
                        if (!r) {
                            this.addClass("context-menu-disabled")
                        }
                    }
                }
            }
        }
        return this
    };
    k.contextMenu = function (r, s) {
        if (typeof r != "string") {
            s = r;
            r = "create"
        }
        if (typeof s == "string") {
            s = {selector: s}
        } else {
            if (s === f) {
                s = {}
            }
        }
        var w = k.extend(true, {}, h, s || {}), v = k(document);
        switch (r) {
            case"create":
                if (!w.selector) {
                    throw new Error("No selector specified")
                }
                if (w.selector.match(/.context-menu-(list|item|input)($|\s)/)) {
                    throw new Error('Cannot bind to selector "' + w.selector + '" as it contains a reserved className')
                }
                if (!w.build && (!w.items || k.isEmptyObject(w.items))) {
                    throw new Error("No Items sepcified")
                }
                a++;
                w.ns = ".contextMenu" + a;
                b[w.selector] = w.ns;
                j[w.ns] = w;
                if (!w.trigger) {
                    w.trigger = "right"
                }
                if (!g) {
                    v.on({"contextmenu:hide.contextMenu": m.hideMenu, "prevcommand.contextMenu": m.prevItem, "nextcommand.contextMenu": m.nextItem, "contextmenu.contextMenu": m.abortevent, "mouseenter.contextMenu": m.menuMouseenter, "mouseleave.contextMenu": m.menuMouseleave}, ".context-menu-list").on("mouseup.contextMenu", ".context-menu-input", m.inputClick).on({"mouseup.contextMenu": m.itemClick, "contextmenu:focus.contextMenu": m.focusItem, "contextmenu:blur.contextMenu": m.blurItem, "contextmenu.contextMenu": m.abortevent, "mouseenter.contextMenu": m.itemMouseenter, "mouseleave.contextMenu": m.itemMouseleave}, ".context-menu-item");
                    g = true
                }
                v.on("contextmenu" + w.ns, w.selector, w, m.contextmenu);
                switch (w.trigger) {
                    case"hover":
                        v.on("mouseenter" + w.ns, w.selector, w, m.mouseenter).on("mouseleave" + w.ns, w.selector, w, m.mouseleave);
                        break;
                    case"left":
                        v.on("click" + w.ns, w.selector, w, m.click);
                        break
                }
                if (!w.build) {
                    l.create(w)
                }
                break;
            case"destroy":
                if (!w.selector) {
                    v.off(".contextMenu .contextMenuAutoHide");
                    k.each(b, function (x, y) {
                        v.off(y)
                    });
                    b = {};
                    j = {};
                    a = 0;
                    g = false;
                    k("#context-menu-layer, .context-menu-list").remove()
                } else {
                    if (b[w.selector]) {
                        var t = k(".context-menu-list").filter(":visible");
                        if (t.length && t.data().contextMenuRoot.$trigger.is(w.selector)) {
                            t.trigger("contextmenu:hide", {force: true})
                        }
                        try {
                            if (j[b[w.selector]].$menu) {
                                j[b[w.selector]].$menu.remove()
                            }
                            delete j[b[w.selector]]
                        } catch (u) {
                            j[b[w.selector]] = null
                        }
                        v.off(b[w.selector])
                    }
                }
                break;
            case"html5":
                if ((!k.support.htmlCommand && !k.support.htmlMenuitem) || (typeof s == "boolean" && s)) {
                    k('menu[type="context"]').each(function () {
                        if (this.id) {
                            k.contextMenu({selector: "[contextmenu=" + this.id + "]", items: k.contextMenu.fromMenu(this)})
                        }
                    }).css("display", "none")
                }
                break;
            default:
                throw new Error('Unknown operation "' + r + '"')
        }
        return this
    };
    k.contextMenu.setInputValues = function (r, s) {
        if (s === f) {
            s = {}
        }
        k.each(r.inputs, function (t, u) {
            switch (u.type) {
                case"text":
                case"textarea":
                    u.value = s[t] || "";
                    break;
                case"checkbox":
                    u.selected = s[t] ? true : false;
                    break;
                case"radio":
                    u.selected = (s[u.radio] || "") == u.value ? true : false;
                    break;
                case"select":
                    u.selected = s[t] || "";
                    break
            }
        })
    };
    k.contextMenu.getInputValues = function (r, s) {
        if (s === f) {
            s = {}
        }
        k.each(r.inputs, function (t, u) {
            switch (u.type) {
                case"text":
                case"textarea":
                case"select":
                    s[t] = u.$input.val();
                    break;
                case"checkbox":
                    s[t] = u.$input.prop("checked");
                    break;
                case"radio":
                    if (u.$input.prop("checked")) {
                        s[u.radio] = u.value
                    }
                    break
            }
        });
        return s
    };
    function e(r) {
        return(r.id && k('label[for="' + r.id + '"]').val()) || r.name
    }

    function p(t, s, r) {
        if (!r) {
            r = 0
        }
        s.each(function () {
            var u = k(this), x = this, y = this.nodeName.toLowerCase(), v, w;
            if (y == "label" && u.find("input, textarea, select").length) {
                v = u.text();
                u = u.children().first();
                x = u.get(0);
                y = x.nodeName.toLowerCase()
            }
            switch (y) {
                case"menu":
                    w = {name: u.attr("label"), items: {}};
                    r = p(w.items, u.children(), r);
                    break;
                case"a":
                case"button":
                    w = {name: u.text(), disabled: !!u.attr("disabled"), callback: (function () {
                        return function () {
                            u.click()
                        }
                    })()};
                    break;
                case"menuitem":
                case"command":
                    switch (u.attr("type")) {
                        case f:
                        case"command":
                        case"menuitem":
                            w = {name: u.attr("label"), disabled: !!u.attr("disabled"), callback: (function () {
                                return function () {
                                    u.click()
                                }
                            })()};
                            break;
                        case"checkbox":
                            w = {type: "checkbox", disabled: !!u.attr("disabled"), name: u.attr("label"), selected: !!u.attr("checked")};
                            break;
                        case"radio":
                            w = {type: "radio", disabled: !!u.attr("disabled"), name: u.attr("label"), radio: u.attr("radiogroup"), value: u.attr("id"), selected: !!u.attr("checked")};
                            break;
                        default:
                            w = f
                    }
                    break;
                case"hr":
                    w = "-------";
                    break;
                case"input":
                    switch (u.attr("type")) {
                        case"text":
                            w = {type: "text", name: v || e(x), disabled: !!u.attr("disabled"), value: u.val()};
                            break;
                        case"checkbox":
                            w = {type: "checkbox", name: v || e(x), disabled: !!u.attr("disabled"), selected: !!u.attr("checked")};
                            break;
                        case"radio":
                            w = {type: "radio", name: v || e(x), disabled: !!u.attr("disabled"), radio: !!u.attr("name"), value: u.val(), selected: !!u.attr("checked")};
                            break;
                        default:
                            w = f;
                            break
                    }
                    break;
                case"select":
                    w = {type: "select", name: v || e(x), disabled: !!u.attr("disabled"), selected: u.val(), options: {}};
                    u.children().each(function () {
                        w.options[this.value] = k(this).text()
                    });
                    break;
                case"textarea":
                    w = {type: "textarea", name: v || e(x), disabled: !!u.attr("disabled"), value: u.val()};
                    break;
                case"label":
                    break;
                default:
                    w = {type: "html", html: u.clone(true)};
                    break
            }
            if (w) {
                r++;
                t["key" + r] = w
            }
        });
        return r
    }

    k.contextMenu.fromMenu = function (s) {
        var t = k(s), r = {};
        p(r, t.children());
        return r
    };
    k.contextMenu.defaults = h;
    k.contextMenu.types = n
})(jQuery);