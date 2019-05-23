! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(a) {
    "use strict";
    a.Zebra_DatePicker = function(b, c) {
        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q = {
                always_visible: !1,
                container: a("body"),
                custom_classes: !1,
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                days_abbr: !1,
                default_position: "above",
                direction: 0,
                disabled_dates: !1,
                enabled_dates: !1,
                first_day_of_week: 1,
                format: "Y-m-d",
                header_captions: {
                    days: "F, Y",
                    months: "Y",
                    years: "Y1 - Y2"
                },
                header_navigation: ["&#171;", "&#187;"],
                icon_position: "right",
                inside: !0,
                lang_clear_date: "Clear date",
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                months_abbr: !1,
                offset: [5, -5],
                open_icon_only: !1,
                pair: !1,
                readonly_element: !0,
                select_other_months: !1,
                show_clear_date: 0,
                show_icon: !0,
                show_other_months: !0,
                show_select_today: "Today",
                show_week_number: !1,
                start_date: !1,
                strict: !1,
                view: "days",
                weekend_days: [0, 6],
                zero_pad: !1,
                onChange: null,
                onClear: null,
                onOpen: null,
                onClose: null,
                onSelect: null
            },
            R = {},
            S = this;
        S.settings = {};
        var T = a(b),
            U = function(b) {
                if (N = Math.floor(65536 * (1 + Math.random())).toString(16), !b) {
                    S.settings = a.extend({}, Q, c), R.readonly = T.attr("readonly"), R.style = T.attr("style");
                    for (var y in T.data()) 0 === y.indexOf("zdp_") && (y = y.replace(/^zdp\_/, ""), void 0 !== Q[y] && (S.settings[y] = "pair" == y ? a(T.data("zdp_" + y)) : T.data("zdp_" + y)))
                }
                S.settings.readonly_element && T.attr("readonly", "readonly");
                var E = {
                        days: ["d", "j", "D"],
                        months: ["F", "m", "M", "n", "t"],
                        years: ["o", "Y", "y"]
                    },
                    F = !1,
                    G = !1,
                    U = !1,
                    X = null;
                for (X in E) a.each(E[X], function(a, b) {
                    S.settings.format.indexOf(b) > -1 && ("days" == X ? F = !0 : "months" == X ? G = !0 : "years" == X && (U = !0))
                });
                H = F && G && U ? ["years", "months", "days"] : !F && G && U ? ["years", "months"] : F && G && !U ? ["months", "days"] : F || G || !U ? F || !G || U ? ["years", "months", "days"] : ["months"] : ["years"], -1 == a.inArray(S.settings.view, H) && (S.settings.view = H[H.length - 1]), x = [], w = [], O = {}, P = [];
                var Y;
                for (var Z in S.settings.custom_classes) S.settings.custom_classes.hasOwnProperty(Z) && P.push(Z);
                for (var $ = 0; $ < 2 + P.length; $++) Y = 0 === $ ? S.settings.disabled_dates : 1 == $ ? S.settings.enabled_dates : S.settings.custom_classes[P[$ - 2]], a.isArray(Y) && Y.length > 0 && a.each(Y, function() {
                    for (var b = this.split(" "), c = 0; 4 > c; c++) {
                        b[c] || (b[c] = "*"), b[c] = b[c].indexOf(",") > -1 ? b[c].split(",") : new Array(b[c]);
                        for (var d = 0; d < b[c].length; d++)
                            if (b[c][d].indexOf("-") > -1) {
                                var e = b[c][d].match(/^([0-9]+)\-([0-9]+)/);
                                if (null !== e) {
                                    for (var f = ja(e[1]); f <= ja(e[2]); f++) - 1 == a.inArray(f, b[c]) && b[c].push(f + "");
                                    b[c].splice(d, 1)
                                }
                            }
                        for (d = 0; d < b[c].length; d++) b[c][d] = isNaN(ja(b[c][d])) ? b[c][d] : ja(b[c][d])
                    }
                    0 === $ ? x.push(b) : 1 == $ ? w.push(b) : (void 0 === O[P[$ - 2]] && (O[P[$ - 2]] = []), O[P[$ - 2]].push(b))
                });
                var _, aa, ba = new Date,
                    ea = S.settings.reference_date ? S.settings.reference_date : T.data("zdp_reference_date") && void 0 !== T.data("zdp_reference_date") ? T.data("zdp_reference_date") : ba;
                if (z = void 0, A = void 0, o = ea.getMonth(), l = ba.getMonth(), p = ea.getFullYear(), m = ba.getFullYear(), q = ea.getDate(), n = ba.getDate(), S.settings.direction === !0) z = ea;
                else if (S.settings.direction === !1) A = ea, D = A.getMonth(), C = A.getFullYear(), B = A.getDate();
                else if (!a.isArray(S.settings.direction) && da(S.settings.direction) && ja(S.settings.direction) > 0 || a.isArray(S.settings.direction) && ((_ = V(S.settings.direction[0])) || S.settings.direction[0] === !0 || da(S.settings.direction[0]) && S.settings.direction[0] > 0) && ((aa = V(S.settings.direction[1])) || S.settings.direction[1] === !1 || da(S.settings.direction[1]) && S.settings.direction[1] >= 0)) z = _ ? _ : new Date(p, o, q + ja(a.isArray(S.settings.direction) ? S.settings.direction[0] === !0 ? 0 : S.settings.direction[0] : S.settings.direction)), o = z.getMonth(), p = z.getFullYear(), q = z.getDate(), aa && +aa >= +z ? A = aa : !aa && S.settings.direction[1] !== !1 && a.isArray(S.settings.direction) && (A = new Date(p, o, q + ja(S.settings.direction[1]))), A && (D = A.getMonth(), C = A.getFullYear(), B = A.getDate());
                else if (!a.isArray(S.settings.direction) && da(S.settings.direction) && ja(S.settings.direction) < 0 || a.isArray(S.settings.direction) && (S.settings.direction[0] === !1 || da(S.settings.direction[0]) && S.settings.direction[0] < 0) && ((_ = V(S.settings.direction[1])) || da(S.settings.direction[1]) && S.settings.direction[1] >= 0)) A = new Date(p, o, q + ja(a.isArray(S.settings.direction) ? S.settings.direction[0] === !1 ? 0 : S.settings.direction[0] : S.settings.direction)), D = A.getMonth(), C = A.getFullYear(), B = A.getDate(), _ && +A > +_ ? z = _ : !_ && a.isArray(S.settings.direction) && (z = new Date(C, D, B - ja(S.settings.direction[1]))), z && (o = z.getMonth(), p = z.getFullYear(), q = z.getDate());
                else if (a.isArray(S.settings.disabled_dates) && S.settings.disabled_dates.length > 0)
                    for (var ha in x)
                        if ("*" == x[ha][0] && "*" == x[ha][1] && "*" == x[ha][2] && "*" == x[ha][3]) {
                            var la = [];
                            if (a.each(w, function() {
                                    var a = this;
                                    "*" != a[2][0] && la.push(parseInt(a[2][0] + ("*" == a[1][0] ? "12" : ia(a[1][0], 2)) + ("*" == a[0][0] ? "*" == a[1][0] ? "31" : new Date(a[2][0], a[1][0], 0).getDate() : ia(a[0][0], 2)), 10))
                                }), la.sort(), la.length > 0) {
                                var na = (la[0] + "").match(/([0-9]{4})([0-9]{2})([0-9]{2})/);
                                p = parseInt(na[1], 10), o = parseInt(na[2], 10) - 1, q = parseInt(na[3], 10)
                            }
                            break
                        }
                if (ca(p, o, q)) {
                    for (; ca(p);) z ? (p++, o = 0) : (p--, o = 11);
                    for (; ca(p, o);) z ? (o++, q = 1) : (o--, q = new Date(p, o + 1, 0).getDate()), o > 11 ? (p++, o = 0, q = 1) : 0 > o && (p--, o = 11, q = new Date(p, o + 1, 0).getDate());
                    for (; ca(p, o, q);) z ? q++ : q--, ba = new Date(p, o, q), p = ba.getFullYear(), o = ba.getMonth(), q = ba.getDate();
                    ba = new Date(p, o, q), p = ba.getFullYear(), o = ba.getMonth(), q = ba.getDate()
                }
                var oa = V(T.val() || (S.settings.start_date ? S.settings.start_date : ""));
                if (oa && S.settings.strict && ca(oa.getFullYear(), oa.getMonth(), oa.getDate()) && T.val(""), b || void 0 === z && void 0 === oa || ka(void 0 !== oa ? oa : z), !S.settings.always_visible) {
                    if (!b) {
                        if (S.settings.show_icon) {
                            "firefox" == ma.name && T.is('input[type="text"]') && "inline" == T.css("display") && T.css("display", "inline-block");
                            var pa = a('<span class="Zebra_DatePicker_Icon_Wrapper"></span>').css({
                                display: T.css("display"),
                                position: "static" == T.css("position") ? "relative" : T.css("position"),
                                "float": T.css("float"),
                                top: T.css("top"),
                                right: T.css("right"),
                                bottom: T.css("bottom"),
                                left: T.css("left")
                            });
                            "block" == T.css("display") && pa.css("width", T.outerWidth(!0)), T.wrap(pa).css({
                                position: "relative",
                                top: "auto",
                                right: "auto",
                                bottom: "auto",
                                left: "auto"
                            }), f = a('<button type="button" class="Zebra_DatePicker_Icon' + ("disabled" == T.attr("disabled") ? " Zebra_DatePicker_Icon_Disabled" : "") + '">Pick a date</button>'), S.icon = f, I = S.settings.open_icon_only ? f : f.add(T)
                        } else I = T;
                        I.bind("click.Zebra_DatePicker_" + N, function(a) {
                            a.preventDefault(), T.attr("disabled") || (e.hasClass("dp_visible") ? S.hide() : S.show())
                        }), !S.settings.readonly_element && S.settings.pair && T.bind("blur.Zebra_DatePicker_" + N, function() {
                            var b;
                            (b = V(a(this).val())) && !ca(b.getFullYear(), b.getMonth(), b.getDate()) && ka(b)
                        }), void 0 !== f && f.insertAfter(T)
                    }
                    if (void 0 !== f) {
                        f.attr("style", ""), S.settings.inside && f.addClass("Zebra_DatePicker_Icon_Inside_" + ("right" == S.settings.icon_position ? "Right" : "Left"));
                        var qa = T.outerWidth(),
                            ra = T.outerHeight(),
                            sa = parseInt(T.css("marginLeft"), 10) || 0,
                            ta = parseInt(T.css("marginTop"), 10) || 0,
                            ua = (f.outerWidth(), f.outerHeight()),
                            va = parseInt(f.css("marginLeft"), 10) || 0;
                        parseInt(f.css("marginRight"), 10) || 0;
                        S.settings.inside ? (f.css("bottom", ta + (ra - ua) / 2), "right" == S.settings.icon_position ? f.css("right", 0) : f.css("left", 0)) : f.css({
                            bottom: ta + (ra - ua) / 2,
                            left: sa + qa + va
                        }), f.removeClass(" Zebra_DatePicker_Icon_Disabled"), "disabled" == T.attr("disabled") && f.addClass("Zebra_DatePicker_Icon_Disabled")
                    }
                }
                if (L = S.settings.show_select_today !== !1 && a.inArray("days", H) > -1 && !ca(m, l, n) ? S.settings.show_select_today : !1, b) return a(".dp_previous", e).html(S.settings.header_navigation[0]), a(".dp_next", e).html(S.settings.header_navigation[1]), a(".dp_clear", e).html(S.settings.lang_clear_date), void a(".dp_today", e).html(S.settings.show_select_today);
                a(window).bind("resize.Zebra_DatePicker_" + N + ", orientationchange.Zebra_DatePicker_" + N, function() {
                    S.hide(), void 0 !== f && (clearTimeout(M), M = setTimeout(function() {
                        S.update()
                    }, 100))
                });
                var wa = '<div class="Zebra_DatePicker"><table class="dp_header"><tr><td class="dp_previous">' + S.settings.header_navigation[0] + '</td><td class="dp_caption">&#032;</td><td class="dp_next">' + S.settings.header_navigation[1] + '</td></tr></table><table class="dp_daypicker"></table><table class="dp_monthpicker"></table><table class="dp_yearpicker"></table><table class="dp_footer"><tr><td class="dp_today"' + (S.settings.show_clear_date !== !1 ? ' style="width:50%"' : "") + ">" + L + '</td><td class="dp_clear"' + (L !== !1 ? ' style="width:50%"' : "") + ">" + S.settings.lang_clear_date + "</td></tr></table></div>";
                e = a(wa), S.datepicker = e, g = a("table.dp_header", e), h = a("table.dp_daypicker", e), i = a("table.dp_monthpicker", e), j = a("table.dp_yearpicker", e), K = a("table.dp_footer", e), J = a("td.dp_today", K), k = a("td.dp_clear", K), S.settings.always_visible ? T.attr("disabled") || (S.settings.always_visible.append(e), S.show()) : S.settings.container.append(e), e.delegate("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_week_number)", "mouseover", function() {
                    a(this).addClass("dp_hover")
                }).delegate("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_week_number)", "mouseout", function() {
                    a(this).removeClass("dp_hover")
                }), W(a("td", g)), a(".dp_previous", g).bind("click", function() {
                    "months" == d ? s-- : "years" == d ? s -= 12 : --r < 0 && (r = 11, s--), fa()
                }), a(".dp_caption", g).bind("click", function() {
                    d = "days" == d ? a.inArray("months", H) > -1 ? "months" : a.inArray("years", H) > -1 ? "years" : "days" : "months" == d ? a.inArray("years", H) > -1 ? "years" : a.inArray("days", H) > -1 ? "days" : "months" : a.inArray("days", H) > -1 ? "days" : a.inArray("months", H) > -1 ? "months" : "years", fa()
                }), a(".dp_next", g).bind("click", function() {
                    "months" == d ? s++ : "years" == d ? s += 12 : 12 == ++r && (r = 0, s++), fa()
                }), h.delegate("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_week_number)", "click", function() {
                    S.settings.select_other_months && a(this).attr("class") && null !== (na = a(this).attr("class").match(/date\_([0-9]{4})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])/)) ? ga(na[1], na[2] - 1, na[3], "days", a(this)) : ga(s, r, ja(a(this).html()), "days", a(this))
                }), i.delegate("td:not(.dp_disabled)", "click", function() {
                    var b = a(this).attr("class").match(/dp\_month\_([0-9]+)/);
                    r = ja(b[1]), -1 == a.inArray("days", H) ? ga(s, r, 1, "months", a(this)) : (d = "days", S.settings.always_visible && T.val(""), fa())
                }), j.delegate("td:not(.dp_disabled)", "click", function() {
                    s = ja(a(this).html()), -1 == a.inArray("months", H) ? ga(s, 1, 1, "years", a(this)) : (d = "months", S.settings.always_visible && T.val(""), fa())
                }), a(J).bind("click", function(b) {
                    b.preventDefault(), ga(m, l, n, "days", a(".dp_current", h)), S.settings.always_visible && S.show(), S.hide()
                }), a(k).bind("click", function(b) {
                    b.preventDefault(), T.val(""), S.settings.always_visible ? (t = null, u = null, v = null, a("td.dp_selected", e).removeClass("dp_selected")) : (t = null, u = null, v = null, r = null, s = null), S.hide(), S.settings.onClear && "function" == typeof S.settings.onClear && S.settings.onClear.call(T, T)
                }), S.settings.always_visible || (a(document).bind("mousedown.Zebra_DatePicker_" + N + ", touchstart.Zebra_DatePicker_" + N, function(b) {
                    if (e.hasClass("dp_visible")) {
                        if (S.settings.show_icon && a(b.target).get(0) === f.get(0)) return !0;
                        0 === a(b.target).parents().filter(".Zebra_DatePicker").length && S.hide()
                    }
                }), a(document).bind("keyup.Zebra_DatePicker_" + N, function(a) {
                    e.hasClass("dp_visible") && 27 == a.which && S.hide()
                })), fa()
            };
        S.clear_date = function() {
            a(k).trigger("click")
        }, S.destroy = function() {
            void 0 !== S.icon && S.icon.remove(), S.datepicker.remove(), S.settings.show_icon && !S.settings.always_visible && T.unwrap(), T.unbind("click.Zebra_DatePicker_" + N), T.unbind("blur.Zebra_DatePicker_" + N), a(document).unbind("keyup.Zebra_DatePicker_" + N), a(document).unbind("mousedown.Zebra_DatePicker_" + N), a(window).unbind("resize.Zebra_DatePicker_" + N), a(window).unbind("orientationchange.Zebra_DatePicker_" + N), T.removeData("Zebra_DatePicker"), T.attr("readonly", R.readonly ? !0 : !1), T.attr("style", R.style ? R.style : "")
        }, S.hide = function() {
            S.settings.always_visible || (ba("hide"), e.removeClass("dp_visible").addClass("dp_hidden"), S.settings.onClose && "function" == typeof S.settings.onClose && S.settings.onClose.call(T, T))
        }, S.set_date = function(a) {
            var b;
            (b = V(a)) && !ca(b.getFullYear(), b.getMonth(), b.getDate()) && (T.val(a), ka(b))
        }, S.show = function() {
            d = S.settings.view;
            var b = V(T.val() || (S.settings.start_date ? S.settings.start_date : ""));
            if (b ? (u = b.getMonth(), r = b.getMonth(), v = b.getFullYear(), s = b.getFullYear(), t = b.getDate(), ca(v, u, t) && (S.settings.strict && T.val(""), r = o, s = p)) : (r = o, s = p), fa(), S.settings.always_visible) e.removeClass("dp_hidden").addClass("dp_visible");
            else {
                if (S.settings.container.is("body")) {
                    var c = e.outerWidth(),
                        g = e.outerHeight(),
                        h = (void 0 !== f ? f.offset().left + f.outerWidth(!0) : T.offset().left + T.outerWidth(!0)) + S.settings.offset[0],
                        i = (void 0 !== f ? f.offset().top : T.offset().top) - g + S.settings.offset[1],
                        j = a(window).width(),
                        k = a(window).height(),
                        l = a(window).scrollTop(),
                        m = a(window).scrollLeft();
                    "below" == S.settings.default_position && (i = (void 0 !== f ? f.offset().top : T.offset().top) + S.settings.offset[1]), h + c > m + j && (h = m + j - c), m > h && (h = m), i + g > l + k && (i = l + k - g), l > i && (i = l), e.css({
                        left: h,
                        top: i
                    })
                } else e.css({
                    left: 0,
                    top: 0
                });
                e.removeClass("dp_hidden").addClass("dp_visible"), ba()
            }
            S.settings.onOpen && "function" == typeof S.settings.onOpen && S.settings.onOpen.call(T, T)
        }, S.update = function(b) {
            S.original_direction && (S.original_direction = S.direction), S.settings = a.extend(S.settings, b), U(!0)
        };
        var V = function(b) {
                if (b += "", "" !== a.trim(b)) {
                    for (var c = X(S.settings.format), d = ["d", "D", "j", "l", "N", "S", "w", "F", "m", "M", "n", "Y", "y"], e = [], f = [], g = null, h = null, i = 0; i < d.length; i++)(g = c.indexOf(d[i])) > -1 && e.push({
                        character: d[i],
                        position: g
                    });
                    if (e.sort(function(a, b) {
                            return a.position - b.position
                        }), a.each(e, function(a, b) {
                            switch (b.character) {
                                case "d":
                                    f.push("0[1-9]|[12][0-9]|3[01]");
                                    break;
                                case "D":
                                    f.push("[a-z]{3}");
                                    break;
                                case "j":
                                    f.push("[1-9]|[12][0-9]|3[01]");
                                    break;
                                case "l":
                                    f.push("[a-z]+");
                                    break;
                                case "N":
                                    f.push("[1-7]");
                                    break;
                                case "S":
                                    f.push("st|nd|rd|th");
                                    break;
                                case "w":
                                    f.push("[0-6]");
                                    break;
                                case "F":
                                    f.push("[a-z]+");
                                    break;
                                case "m":
                                    f.push("0[1-9]|1[012]+");
                                    break;
                                case "M":
                                    f.push("[a-z]{3}");
                                    break;
                                case "n":
                                    f.push("[1-9]|1[012]");
                                    break;
                                case "Y":
                                    f.push("[0-9]{4}");
                                    break;
                                case "y":
                                    f.push("[0-9]{2}")
                            }
                        }), f.length && (e.reverse(), a.each(e, function(a, b) {
                            c = c.replace(b.character, "(" + f[f.length - a - 1] + ")")
                        }), f = new RegExp("^" + c + "$", "ig"), h = f.exec(b))) {
                        var j, k = new Date,
                            l = 1,
                            m = k.getMonth() + 1,
                            n = k.getFullYear(),
                            o = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                            p = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            q = !0;
                        if (e.reverse(), a.each(e, function(b, c) {
                                if (!q) return !0;
                                switch (c.character) {
                                    case "m":
                                    case "n":
                                        m = ja(h[b + 1]);
                                        break;
                                    case "d":
                                    case "j":
                                        l = ja(h[b + 1]);
                                        break;
                                    case "D":
                                    case "l":
                                    case "F":
                                    case "M":
                                        j = "D" == c.character || "l" == c.character ? S.settings.days : S.settings.months, q = !1, a.each(j, function(a, d) {
                                            if (q) return !0;
                                            if (h[b + 1].toLowerCase() == d.substring(0, "D" == c.character || "M" == c.character ? 3 : d.length).toLowerCase()) {
                                                switch (c.character) {
                                                    case "D":
                                                        h[b + 1] = o[a].substring(0, 3);
                                                        break;
                                                    case "l":
                                                        h[b + 1] = o[a];
                                                        break;
                                                    case "F":
                                                        h[b + 1] = p[a], m = a + 1;
                                                        break;
                                                    case "M":
                                                        h[b + 1] = p[a].substring(0, 3), m = a + 1
                                                }
                                                q = !0
                                            }
                                        });
                                        break;
                                    case "Y":
                                        n = ja(h[b + 1]);
                                        break;
                                    case "y":
                                        n = "19" + ja(h[b + 1])
                                }
                            }), q) {
                            var r = new Date(n, (m || 1) - 1, l || 1);
                            if (r.getFullYear() == n && r.getDate() == (l || 1) && r.getMonth() == (m || 1) - 1) return r
                        }
                    }
                    return !1
                }
            },
            W = function(a) {
                "firefox" == ma.name ? a.css("MozUserSelect", "none") : "explorer" == ma.name ? a.bind("selectstart", function() {
                    return !1
                }) : a.mousedown(function() {
                    return !1
                })
            },
            X = function(a) {
                return a.replace(/([-.,*+?^${}()|[\]\/\\])/g, "\\$1")
            },
            Y = function(b) {
                for (var c = "", d = b.getDate(), e = b.getDay(), f = S.settings.days[e], g = b.getMonth() + 1, h = S.settings.months[g - 1], i = b.getFullYear() + "", j = 0; j < S.settings.format.length; j++) {
                    var k = S.settings.format.charAt(j);
                    switch (k) {
                        case "y":
                            i = i.substr(2);
                        case "Y":
                            c += i;
                            break;
                        case "m":
                            g = ia(g, 2);
                        case "n":
                            c += g;
                            break;
                        case "M":
                            h = a.isArray(S.settings.months_abbr) && void 0 !== S.settings.months_abbr[g - 1] ? S.settings.months_abbr[g - 1] : S.settings.months[g - 1].substr(0, 3);
                        case "F":
                            c += h;
                            break;
                        case "d":
                            d = ia(d, 2);
                        case "j":
                            c += d;
                            break;
                        case "D":
                            f = a.isArray(S.settings.days_abbr) && void 0 !== S.settings.days_abbr[e] ? S.settings.days_abbr[e] : S.settings.days[e].substr(0, 3);
                        case "l":
                            c += f;
                            break;
                        case "N":
                            e++;
                        case "w":
                            c += e;
                            break;
                        case "S":
                            c += d % 10 == 1 && "11" != d ? "st" : d % 10 == 2 && "12" != d ? "nd" : d % 10 == 3 && "13" != d ? "rd" : "th";
                            break;
                        default:
                            c += k
                    }
                }
                return c
            },
            Z = function() {
                var b = new Date(s, r + 1, 0).getDate(),
                    c = new Date(s, r, 1).getDay(),
                    d = new Date(s, r, 0).getDate(),
                    e = c - S.settings.first_day_of_week;
                e = 0 > e ? 7 + e : e, ea(S.settings.header_captions.days);
                var f = "<tr>";
                S.settings.show_week_number && (f += "<th>" + S.settings.show_week_number + "</th>");
                for (var g = 0; 7 > g; g++) f += "<th>" + (a.isArray(S.settings.days_abbr) && void 0 !== S.settings.days_abbr[(S.settings.first_day_of_week + g) % 7] ? S.settings.days_abbr[(S.settings.first_day_of_week + g) % 7] : S.settings.days[(S.settings.first_day_of_week + g) % 7].substr(0, 2)) + "</th>";
                for (f += "</tr><tr>", g = 0; 42 > g; g++) {
                    g > 0 && g % 7 === 0 && (f += "</tr><tr>"), g % 7 === 0 && S.settings.show_week_number && (f += '<td class="dp_week_number">' + la(new Date(s, r, g - e + 1)) + "</td>");
                    var i = g - e + 1;
                    if (S.settings.select_other_months && (e > g || i > b)) {
                        var j = new Date(s, r, i),
                            k = j.getFullYear(),
                            o = j.getMonth(),
                            p = j.getDate();
                        j = k + ia(o + 1, 2) + ia(p, 2)
                    }
                    if (e > g) f += '<td class="' + (S.settings.select_other_months && !ca(k, o, p) ? "dp_not_in_month_selectable date_" + j : "dp_not_in_month") + '">' + (S.settings.select_other_months || S.settings.show_other_months ? ia(d - e + g + 1, S.settings.zero_pad ? 2 : 0) : "&nbsp;") + "</td>";
                    else if (i > b) f += '<td class="' + (S.settings.select_other_months && !ca(k, o, p) ? "dp_not_in_month_selectable date_" + j : "dp_not_in_month") + '">' + (S.settings.select_other_months || S.settings.show_other_months ? ia(i - b, S.settings.zero_pad ? 2 : 0) : "&nbsp;") + "</td>";
                    else {
                        var q = (S.settings.first_day_of_week + g) % 7,
                            w = "",
                            x = aa(s, r, i);
                        ca(s, r, i) ? (a.inArray(q, S.settings.weekend_days) > -1 ? w = "dp_weekend_disabled" : w += " dp_disabled", r == l && s == m && n == i && (w += " dp_disabled_current"), "" != x && (w += " " + x + "_disabled")) : (a.inArray(q, S.settings.weekend_days) > -1 && (w = "dp_weekend"), r == u && s == v && t == i && (w += " dp_selected"), r == l && s == m && n == i && (w += " dp_current"), "" != x && (w += " " + x)), f += "<td" + ("" !== w ? ' class="' + a.trim(w) + '"' : "") + ">" + ((S.settings.zero_pad ? ia(i, 2) : i) || "&nbsp;") + "</td>"
                    }
                }
                f += "</tr>", h.html(a(f)), S.settings.always_visible && (E = a("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_week_number)", h)), h.show()
            },
            $ = function() {
                ea(S.settings.header_captions.months);
                for (var b = "<tr>", c = 0; 12 > c; c++) {
                    c > 0 && c % 3 === 0 && (b += "</tr><tr>");
                    var d = "dp_month_" + c;
                    ca(s, c) ? d += " dp_disabled" : u !== !1 && u == c && s == v ? d += " dp_selected" : l == c && m == s && (d += " dp_current"), b += '<td class="' + a.trim(d) + '">' + (a.isArray(S.settings.months_abbr) && void 0 !== S.settings.months_abbr[c] ? S.settings.months_abbr[c] : S.settings.months[c].substr(0, 3)) + "</td>"
                }
                b += "</tr>", i.html(a(b)), S.settings.always_visible && (F = a("td:not(.dp_disabled)", i)), i.show()
            },
            _ = function() {
                ea(S.settings.header_captions.years);
                for (var b = "<tr>", c = 0; 12 > c; c++) {
                    c > 0 && c % 3 === 0 && (b += "</tr><tr>");
                    var d = "";
                    ca(s - 7 + c) ? d += " dp_disabled" : v && v == s - 7 + c ? d += " dp_selected" : m == s - 7 + c && (d += " dp_current"), b += "<td" + ("" !== a.trim(d) ? ' class="' + a.trim(d) + '"' : "") + ">" + (s - 7 + c) + "</td>"
                }
                b += "</tr>", j.html(a(b)), S.settings.always_visible && (G = a("td:not(.dp_disabled)", j)), j.show()
            },
            aa = function(b, c, d) {
                var e, f, g;
                "undefined" != typeof c && (c += 1);
                for (f in P)
                    if (e = P[f], g = !1, a.isArray(O[e]) && a.each(O[e], function() {
                            if (!g) {
                                var f = this;
                                if ((a.inArray(b, f[2]) > -1 || a.inArray("*", f[2]) > -1) && ("undefined" != typeof c && a.inArray(c, f[1]) > -1 || a.inArray("*", f[1]) > -1) && ("undefined" != typeof d && a.inArray(d, f[0]) > -1 || a.inArray("*", f[0]) > -1)) {
                                    if ("*" == f[3]) return g = e;
                                    var h = new Date(b, c - 1, d).getDay();
                                    if (a.inArray(h, f[3]) > -1) return g = e
                                }
                            }
                        }), g) return g;
                return g || ""
            },
            ba = function(b) {
                if ("explorer" == ma.name && 6 == ma.version) {
                    if (!y) {
                        var c = ja(e.css("zIndex")) - 1;
                        y = a("<iframe>", {
                            src: 'javascript:document.write("")',
                            scrolling: "no",
                            frameborder: 0,
                            css: {
                                zIndex: c,
                                position: "absolute",
                                top: -1e3,
                                left: -1e3,
                                width: e.outerWidth(),
                                height: e.outerHeight(),
                                filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=0)",
                                display: "none"
                            }
                        }), a("body").append(y)
                    }
                    switch (b) {
                        case "hide":
                            y.hide();
                            break;
                        default:
                            var d = e.offset();
                            y.css({
                                top: d.top,
                                left: d.left,
                                display: "block"
                            })
                    }
                }
            },
            ca = function(b, c, d) {
                if (!(void 0 !== b && !isNaN(b) || void 0 !== c && !isNaN(c) || void 0 !== d && !isNaN(d))) return !1;
                if (1e3 > b) return !0;
                if (a.isArray(S.settings.direction) || 0 !== ja(S.settings.direction)) {
                    var e = ja(ha(b, "undefined" != typeof c ? ia(c, 2) : "", "undefined" != typeof d ? ia(d, 2) : "")),
                        f = (e + "").length;
                    if (8 == f && ("undefined" != typeof z && e < ja(ha(p, ia(o, 2), ia(q, 2))) || "undefined" != typeof A && e > ja(ha(C, ia(D, 2), ia(B, 2))))) return !0;
                    if (6 == f && ("undefined" != typeof z && e < ja(ha(p, ia(o, 2))) || "undefined" != typeof A && e > ja(ha(C, ia(D, 2))))) return !0;
                    if (4 == f && ("undefined" != typeof z && p > e || "undefined" != typeof A && e > C)) return !0
                }
                "undefined" != typeof c && (c += 1);
                var g = !1,
                    h = !1;
                return a.isArray(x) && x.length && a.each(x, function() {
                    if (!g) {
                        var e = this;
                        if ((a.inArray(b, e[2]) > -1 || a.inArray("*", e[2]) > -1) && ("undefined" != typeof c && a.inArray(c, e[1]) > -1 || a.inArray("*", e[1]) > -1) && ("undefined" != typeof d && a.inArray(d, e[0]) > -1 || a.inArray("*", e[0]) > -1)) {
                            if ("*" == e[3]) return g = !0;
                            var f = new Date(b, c - 1, d).getDay();
                            if (a.inArray(f, e[3]) > -1) return g = !0
                        }
                    }
                }), w && a.each(w, function() {
                    if (!h) {
                        var e = this;
                        if ((a.inArray(b, e[2]) > -1 || a.inArray("*", e[2]) > -1) && (h = !0, "undefined" != typeof c))
                            if (h = !0, a.inArray(c, e[1]) > -1 || a.inArray("*", e[1]) > -1) {
                                if ("undefined" != typeof d)
                                    if (h = !0, a.inArray(d, e[0]) > -1 || a.inArray("*", e[0]) > -1) {
                                        if ("*" == e[3]) return h = !0;
                                        var f = new Date(b, c - 1, d).getDay();
                                        if (a.inArray(f, e[3]) > -1) return h = !0;
                                        h = !1
                                    } else h = !1
                            } else h = !1
                    }
                }), w && h ? !1 : x && g ? !0 : !1
            },
            da = function(a) {
                return (a + "").match(/^\-?[0-9]+$/) ? !0 : !1
            },
            ea = function(b) {
                !isNaN(parseFloat(r)) && isFinite(r) && (b = b.replace(/\bm\b|\bn\b|\bF\b|\bM\b/, function(b) {
                    switch (b) {
                        case "m":
                            return ia(r + 1, 2);
                        case "n":
                            return r + 1;
                        case "F":
                            return S.settings.months[r];
                        case "M":
                            return a.isArray(S.settings.months_abbr) && void 0 !== S.settings.months_abbr[r] ? S.settings.months_abbr[r] : S.settings.months[r].substr(0, 3);
                        default:
                            return b
                    }
                })), !isNaN(parseFloat(s)) && isFinite(s) && (b = b.replace(/\bY\b/, s).replace(/\by\b/, (s + "").substr(2)).replace(/\bY1\b/i, s - 7).replace(/\bY2\b/i, s + 4)), a(".dp_caption", g).html(b)
            },
            fa = function() {
                if ("" === h.text() || "days" == d) {
                    if ("" === h.text()) {
                        S.settings.always_visible || e.css("left", -1e3), e.css("visibility", "visible"), Z();
                        var b = h.outerWidth(),
                            c = h.outerHeight();
                        i.css({
                            width: b,
                            height: c
                        }), j.css({
                            width: b,
                            height: c
                        }), g.css("width", b), K.css("width", b), e.css("visibility", "").addClass("dp_hidden")
                    } else Z();
                    i.hide(), j.hide()
                } else "months" == d ? ($(), h.hide(), j.hide()) : "years" == d && (_(), h.hide(), i.hide());
                if (S.settings.onChange && "function" == typeof S.settings.onChange && void 0 !== d) {
                    var f = "days" == d ? h.find("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month)") : "months" == d ? i.find("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month)") : j.find("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month)");
                    f.each(function() {
                        var b;
                        "days" == d ? a(this).hasClass("dp_not_in_month_selectable") ? (b = a(this).attr("class").match(/date\_([0-9]{4})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])/), a(this).data("date", b[1] + "-" + b[2] + "-" + b[3])) : a(this).data("date", s + "-" + ia(r + 1, 2) + "-" + ia(ja(a(this).text()), 2)) : "months" == d ? (b = a(this).attr("class").match(/dp\_month\_([0-9]+)/), a(this).data("date", s + "-" + ia(ja(b[1]) + 1, 2))) : a(this).data("date", ja(a(this).text()))
                    }), S.settings.onChange.call(T, d, f, T)
                }
                K.show(), S.settings.show_clear_date === !0 || 0 === S.settings.show_clear_date && "" !== T.val() || S.settings.always_visible && S.settings.show_clear_date !== !1 ? (k.show(), L ? (J.css("width", "50%"), k.css("width", "50%")) : (J.hide(), k.css("width", "100%"))) : (k.hide(), L ? J.show().css("width", "100%") : K.hide())
            },
            ga = function(a, b, c, d, e) {
                var f = new Date(a, b, c, 12, 0, 0),
                    g = "days" == d ? E : "months" == d ? F : G,
                    h = Y(f);
                T.val(h), S.settings.always_visible && (u = f.getMonth(), r = f.getMonth(), v = f.getFullYear(), s = f.getFullYear(), t = f.getDate(), g.removeClass("dp_selected"), e.addClass("dp_selected"), "days" == d && e.hasClass("dp_not_in_month_selectable") && S.show()), S.hide(), ka(f), S.settings.onSelect && "function" == typeof S.settings.onSelect && S.settings.onSelect.call(T, h, a + "-" + ia(b + 1, 2) + "-" + ia(c, 2), f, T, la(f)), T.focus()
            },
            ha = function() {
                for (var a = "", b = 0; b < arguments.length; b++) a += arguments[b] + "";
                return a
            },
            ia = function(a, b) {
                for (a += ""; a.length < b;) a = "0" + a;
                return a
            },
            ja = function(a) {
                return parseInt(a, 10)
            },
            ka = function(b) {
                S.settings.pair && a.each(S.settings.pair, function() {
                    var c = a(this);
                    if (c.data && c.data("Zebra_DatePicker")) {
                        var d = c.data("Zebra_DatePicker");
                        d.update({
                            reference_date: b,
                            direction: 0 === d.settings.direction ? 1 : d.settings.direction
                        }), d.settings.always_visible && d.show()
                    } else c.data("zdp_reference_date", b)
                })
            },
            la = function(a) {
                var b, c, d, e, f, g, h, i, j, k = a.getFullYear(),
                    l = a.getMonth() + 1,
                    m = a.getDate();
                return 3 > l ? (b = k - 1, c = (b / 4 | 0) - (b / 100 | 0) + (b / 400 | 0), d = ((b - 1) / 4 | 0) - ((b - 1) / 100 | 0) + ((b - 1) / 400 | 0), e = c - d, f = 0, g = m - 1 + 31 * (l - 1)) : (b = k, c = (b / 4 | 0) - (b / 100 | 0) + (b / 400 | 0), d = ((b - 1) / 4 | 0) - ((b - 1) / 100 | 0) + ((b - 1) / 400 | 0), e = c - d, f = e + 1, g = m + ((153 * (l - 3) + 2) / 5 | 0) + 58 + e), h = (b + c) % 7, m = (g + h - f) % 7, i = g + 3 - m, j = 0 > i ? 53 - ((h - e) / 5 | 0) : i > 364 + e ? 1 : (i / 7 | 0) + 1
            },
            ma = {
                init: function() {
                    this.name = this.searchString(this.dataBrowser) || "", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || ""
                },
                searchString: function(a) {
                    for (var b = 0; b < a.length; b++) {
                        var c = a[b].string,
                            d = a[b].prop;
                        if (this.versionSearchString = a[b].versionSearch || a[b].identity, c) {
                            if (-1 != c.indexOf(a[b].subString)) return a[b].identity
                        } else if (d) return a[b].identity
                    }
                },
                searchVersion: function(a) {
                    var b = a.indexOf(this.versionSearchString);
                    if (-1 != b) return parseFloat(a.substring(b + this.versionSearchString.length + 1))
                },
                dataBrowser: [{
                    string: navigator.userAgent,
                    subString: "Firefox",
                    identity: "firefox"
                }, {
                    string: navigator.userAgent,
                    subString: "MSIE",
                    identity: "explorer",
                    versionSearch: "MSIE"
                }]
            };
        ma.init(), U()
    }, a.fn.Zebra_DatePicker = function(b) {
        return this.each(function() {
            void 0 !== a(this).data("Zebra_DatePicker") && a(this).data("Zebra_DatePicker").destroy();
            var c = new a.Zebra_DatePicker(this, b);
            a(this).data("Zebra_DatePicker", c)
        })
    }
});