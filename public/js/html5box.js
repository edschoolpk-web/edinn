function loadHtml5LightBox(c) {
    var x, e, Y;
    ((x = jQuery).fn.html5lightbox = function (t) {
        var w = this;
        (w.options = x.extend(
            {
                freelink: "http://html5box.com/",
                pushwindowhistory: !1,
                defaultvideovolume: 1,
                mutevideo: !1,
                playsinline: !1,
                autoclose: !1,
                autoclosedelay: 0,
                resizedelay: 100,
                insideiframe: !1,
                iframetopmargin: -1,
                iframesamedomain: !1,
                autoresizecontent: !0,
                defaultwidth: 960,
                defaultheight: 540,
                usedefaultsizeforcontent: !1,
                usedefaultwidthforcontent: !0,
                usedefaultheightforcontent: !1,
                mediumbreakpoint: 800,
                smallbreakpoint: 600,
                preload: !0,
                preloadallonpageload: !1,
                preloadalldelay: 5e3,
                autoplay: !0,
                loopvideo: !1,
                html5player: !0,
                responsive: !0,
                nativehtml5controls: !1,
                videohidecontrols: !1,
                autoplayhtml5onmobile: !0,
                nativecontrolsonfirefox: !1,
                nativecontrolsonie: !1,
                nativecontrolsoniphone: !0,
                nativecontrolsonipad: !0,
                nativecontrolsonandroid: !0,
                nativecontrolsonfullscreen: !0,
                nativecontrolsnodownload: !0,
                noresizecallback: !0,
                imagekeepratio: !0,
                maxheight: !1,
                elemautoheight: !1,
                useflashonie9: !0,
                useflashonie10: !0,
                useflashonie11: !1,
                useflashformp4onfirefox: !1,
                transition: "none",
                transitionduration: 400,
                enteranimation: "",
                enteranimationduration: "500ms",
                exitanimation: "",
                animationduration: "1s",
                enablepdfjs: !0,
                pdfjsengine: "",
                openpdfinnewtaboniphone: !1,
                openpdfinnewtabonipad: !1,
                googleanalyticsaccount: "",
                arrowloop: !0,
                showall: !1,
                userelforgroup: !0,
                shownavigation: !0,
                thumbwidth: 96,
                thumbheight: 72,
                thumbgap: 4,
                thumbtopmargin: 12,
                thumbbottommargin: 12,
                thumbborder: 1,
                thumbbordercolor: "transparent",
                thumbhighlightbordercolor: "#fff",
                thumbopacity: 1,
                navbuttonwidth: 32,
                hidenavigationonmobile: !1,
                hidenavigationonipad: !1,
                navbgcolor: "rgba(0,0,0,0.2)",
                shownavcontrol: !0,
                navcontrolimage: "lightbox-navcontrol.png",
                hidenavdefault: !1,
                overlaybgcolor: "#000",
                overlayopacity: 0.9,
                bgcolor: "#fff",
                bordersize: 8,
                borderradius: 0,
                bordermargin: 16,
                bordertopmargin: 48,
                barautoheight: !0,
                barheight: 64,
                smallscreenheight: 415,
                responsivebarheight: !1,
                barheightonsmallheight: 64,
                notkeepratioonsmallheight: !1,
                bordertopmarginsmall: 36,
                loadingwidth: 48,
                loadingheight: 48,
                loadingusefont: !0,
                loadingfontname: "mh-icon-spin5",
                loadingfontcolor: "#222",
                loadingfontbg: "transparent",
                resizespeed: 400,
                fadespeed: 0,
                jsfolder: c,
                skinsfoldername: "webImages/",
                loadingimage: "lightbox-loading.gif",
                nextimage: "lightbox-next.png",
                previmage: "lightbox-prev.png",
                closeimage: "lightbox-close.png",
                playvideoimage: "lightbox-playvideo.png",
                titlebgimage: "lightbox-titlebg.png",
                navarrowsprevimage: "lightbox-navprev.png",
                navarrowsnextimage: "lightbox-navnext.png",
                closepos: "outside",
                closeusefont: !0,
                arrowsusefont: !0,
                navusefont: !0,
                navarrowsalwaysshowontouch: !0,
                showarrowsbottomonsmallscreen: !0,
                navarrowsbottomscreenwidth: 479,
                outsidearrowspos: "middle",
                closeonoverlay: !0,
                limitfocus: !0,
                navarrowspos: "inside",
                alwaysshownavarrows: !1,
                showplaybutton: !0,
                playimage: "lightbox-play.png",
                pauseimage: "lightbox-pause.png",
                playimagesize: 32,
                fullscreenmode: !1,
                fullscreencloseimage: "lightbox-close-fullscreen.png",
                fullscreennextimage: "lightbox-next-fullscreen.png",
                fullscreenprevimage: "lightbox-prev-fullscreen.png",
                fullscreennomargin: !1,
                fullscreenmodeonsmallscreen: !1,
                fullscreennomarginonsmallscreen: !1,
                fullscreensmallscreenwidth: 800,
                fullscreenbgcolor: "transparent",
                fullscreenbordersize: 0,
                fullscreentextinside: !1,
                fullscreentextoutside: !0,
                fullscreennotransition: !0,
                fullscreenloadingfontcolor: "#eee",
                videobgcolor: "#000",
                html5videoposter: "",
                showtitle: !0,
                titlestyle: "bottom",
                titleinsidecss:
                    "color:#fff; font-size:16px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 8px;",
                titlebottomcss:
                    "color:#333; font-size:16px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left;",
                titleoutsidecss:
                    "color:#fff; font-size:18px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:center; margin: 8px;",
                resizeleftright: !0,
                showonmouseoverinside: !1,
                showinsidetitleforimageonly: !0,
                showdescription: !0,
                descriptioninsidecss:
                    "color:#fff; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;",
                descriptionbottomcss:
                    "color:#333; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;",
                descriptionoutsidecss:
                    "color:#fff; font-size:14px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:center; margin:8px; padding: 0px;",
                fullscreentitlebottomcss:
                    "color:#fff; font-size:16px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 8px 8px;",
                fullscreendescriptionbottomcss:
                    "color:#fff; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;",
                showsocialmedia: !0,
                socialmediaposition: "position:absolute;top:8px;right:8px;",
                showtitleprefix: !0,
                titleprefix: "%NUM / %TOTAL",
                autoslide: !1,
                slideinterval: 5e3,
                showtimer: !0,
                timerposition: "bottom",
                timerheight: 2,
                timercolor: "#dc572e",
                timeropacity: 1,
                initvimeo: !0,
                inityoutube: !0,
                swipepreventdefaultonandroid: !1,
                initsocial: !0,
                showsocial: !1,
                sharemediaurl: !1,
                socialposition: "position:absolute;top:100%;right:0;",
                socialpositionsmallscreen: "position:absolute;top:100%;right:0;left:0;",
                socialdirection: "horizontal",
                socialbuttonsize: 32,
                socialbuttonfontsize: 18,
                socialrotateeffect: !0,
                showfacebook: !0,
                showtwitter: !0,
                showpinterest: !0,
                showemail: !0,
                sharetextprefix: "Check Out This",
                imagepercentage: 75,
                sidetobottomscreenwidth: 479,
                errorwidth: 280,
                errorheight: 48,
                errorcss:
                    "text-align:center; color:#ff0000; font-size:14px; font-family:Arial, sans-serif;",
                enabletouchswipe: !0,
                mobileresizeevent: !1,
                swipedistance: 0,
                bodynoscroll: !1,
                useabsolutepos: !1,
                useabsoluteposonmobile: !1,
                supportesckey: !0,
                supportarrowkeys: !0,
                showsubtitle: !1,
                vtturl: "",
                vttline: -4,
                vttlang: "en",
                vttlabel: "English",
                showsubtitlebydefault: !0,
                version: "3.3",
                stamp: !0,
                freemark:
                    "72,84,77,76,53,32,76,105,103,104,116,98,111,120,32,70,114,101,101,32,86,101,114,115,105,111,110",
                watermark: "",
                watermarklink: "",
            },
            t
        )),
            "undefined" != typeof html5lightbox_options &&
            html5lightbox_options &&
            x.extend(w.options, html5lightbox_options),
            x("div.html5lightbox_options").length &&
            x.each(x("div.html5lightbox_options").data(), function (t, e) {
                w.options[t.toLowerCase()] = e;
            }),
            x("div#html5lightbox_options").length &&
            x.each(x("div#html5lightbox_options").data(), function (t, e) {
                w.options[t.toLowerCase()] = e;
            }),
            x("div#html5lightbox_general_options").length &&
            x.each(x("div#html5lightbox_general_options").data(), function (t, e) {
                w.options[t.toLowerCase()] = e;
            });
        (w.options.types = [
            "IMAGE",
            "FLASH",
            "VIDEO",
            "YOUTUBE",
            "VIMEO",
            "PDF",
            "MP3",
            "WEB",
            "FLV",
            "DAILYMOTION",
            "DIV",
            "WISTIA",
            "IFRAMEVIDEO",
        ]),
            (w.options.htmlfolder = window.location.href.substr(
                0,
                window.location.href.lastIndexOf("/") + 1
            )),
            (w.options.skinsfolder = w.options.skinsfoldername),
            0 < w.options.skinsfolder.length &&
            "/" != w.options.skinsfolder[w.options.skinsfolder.length - 1] &&
            (w.options.skinsfolder += "/"),
            "/" != w.options.skinsfolder.charAt(0) &&
            "http:" != w.options.skinsfolder.substring(0, 5) &&
            "https:" != w.options.skinsfolder.substring(0, 6) &&
            (w.options.skinsfolder = w.options.jsfolder + w.options.skinsfolder);
        for (
            var e,
            i = [
                "loadingimage",
                "nextimage",
                "previmage",
                "closeimage",
                "playvideoimage",
                "titlebgimage",
                "navarrowsprevimage",
                "navarrowsnextimage",
                "navcontrolimage",
                "playimage",
                "pauseimage",
                "fullscreencloseimage",
                "fullscreennextimage",
                "fullscreenprevimage",
            ],
            o = 0;
            o < i.length;
            o++
        )
            w.options[i[o]] &&
                "http://" != w.options[i[o]].substring(0, 7).toLowerCase() &&
                "https://" != w.options[i[o]].substring(0, 8).toLowerCase() &&
                (w.options[i[o]] = w.options.skinsfolder + w.options[i[o]]);
        var n = "",
            s = w.options.freemark.split(",");
        for (o = 0; o < s.length; o++) n += String.fromCharCode(s[o]);
        w.options.freemark = n;
        var r = "hmtamgli5cboxh.iclolms";
        for (o = 1; o <= 5; o++) r = r.slice(0, o) + r.slice(o + 1);
        for (e = r.length, o = 0; o < 5; o++)
            r = r.slice(0, e - 9 + o) + r.slice(e - 8 + o);
        -1 != w.options.htmlfolder.indexOf(r) && (w.options.stamp = !1),
            (w.options.flashInstalled = !1);
        try {
            new ActiveXObject("ShockwaveFlash.ShockwaveFlash") &&
                (w.options.flashInstalled = !0);
        } catch (t) {
            navigator.mimeTypes["application/x-shockwave-flash"] &&
                (w.options.flashInstalled = !0);
        }
        (w.options.html5VideoSupported =
            !!document.createElement("video").canPlayType),
            (w.options.isChrome = null != navigator.userAgent.match(/Chrome/i)),
            (w.options.isFirefox = null != navigator.userAgent.match(/Firefox/i)),
            (w.options.isOpera =
                null != navigator.userAgent.match(/Opera/i) ||
                null != navigator.userAgent.match(/OPR\//i)),
            (w.options.isSafari = null != navigator.userAgent.match(/Safari/i)),
            (w.options.isIE11 =
                null != navigator.userAgent.match(/Trident\/7/) &&
                null != navigator.userAgent.match(/rv:11/)),
            (w.options.isIE =
                null != navigator.userAgent.match(/MSIE/i) && !w.options.isOpera),
            (w.options.isIE10 =
                null != navigator.userAgent.match(/MSIE 10/i) && !this.options.isOpera),
            (w.options.isIE9 =
                null != navigator.userAgent.match(/MSIE 9/i) && !w.options.isOpera),
            (w.options.isIE8 =
                null != navigator.userAgent.match(/MSIE 8/i) && !w.options.isOpera),
            (w.options.isIE7 =
                null != navigator.userAgent.match(/MSIE 7/i) && !w.options.isOpera),
            (w.options.isIE6 =
                null != navigator.userAgent.match(/MSIE 6/i) && !w.options.isOpera),
            (w.options.isIE678 =
                w.options.isIE6 || w.options.isIE7 || w.options.isIE8),
            (w.options.isIE6789 =
                w.options.isIE6 ||
                w.options.isIE7 ||
                w.options.isIE8 ||
                w.options.isIE9),
            (w.options.isAndroid = null != navigator.userAgent.match(/Android/i)),
            (w.options.isIPad = null != navigator.userAgent.match(/iPad/i)),
            (w.options.isIPhone =
                null != navigator.userAgent.match(/iPod/i) ||
                null != navigator.userAgent.match(/iPhone/i)),
            (w.options.isIOS = w.options.isIPad || w.options.isIPhone),
            (w.options.isMobile =
                w.options.isAndroid || w.options.isIPad || w.options.isIPhone),
            (w.options.isIOSLess5 =
                w.options.isIPad &&
                w.options.isIPhone &&
                (null != navigator.userAgent.match(/OS 4/i) ||
                    null != navigator.userAgent.match(/OS 3/i))),
            (w.options.supportCSSPositionFixed =
                !w.options.isIE6 && !w.options.isIOSLess5),
            (w.options.iequirksmode =
                w.options.isIE6789 && "CSS1Compat" != document.compatMode),
            (w.options.isTouch = "ontouchstart" in window),
            w.options.isChrome &&
            ((l = navigator.userAgent.match(/Chrome\/([0-9]+)/)),
                (w.options.chromeVersion =
                    l && 2 <= l.length ? parseInt(l[1], 10) : 0)),
            w.options.isAndroid &&
            ((l = navigator.userAgent.match(/Android\s([0-9\.]*)/i)),
                (w.options.androidVersion =
                    l && 2 <= l.length ? parseInt(l[1], 10) : -1));
        var a,
            l = document.createElement("video");
        (w.options.canplaymp4 =
            l && l.canPlayType && l.canPlayType("video/mp4").replace(/no/, "")),
            ((w.options.isFirefox && w.options.nativecontrolsonfirefox) ||
                ((w.options.isIE6789 || w.options.isIE10 || w.options.isIE11) &&
                    w.options.nativecontrolsonie) ||
                (w.options.isIPhone && w.options.nativecontrolsoniphone) ||
                (w.options.isIPad && w.options.nativecontrolsonipad) ||
                (w.options.isAndroid && w.options.nativecontrolsonandroid)) &&
            (w.options.nativehtml5controls = !0),
            (w.options.isIOS || w.options.isAndroid) &&
            (w.options.nativecontrolsonfullscreen = !0),
            (w.options.navheight = 0),
            (w.options.thumbgap += 2 * w.options.thumbborder),
            (w.options.resizeTimeout = -1),
            (w.slideTimeout = null),
            (w.autosliding = !1),
            (w.existingElem = -1),
            (w.direction = -3),
            (w.elemArray = new Array()),
            (w.options.curElem = -1),
            (w.defaultoptions = x.extend({}, w.options)),
            w.options.googleanalyticsaccount &&
            !window._gaq &&
            ((window._gaq = window._gaq || []),
                window._gaq.push(["_setAccount", w.options.googleanalyticsaccount]),
                window._gaq.push(["_trackPageview"]),
                x.getScript("https://ssl.google-analytics.com/ga.js")),
            w.options.initvimeo &&
            (((a = document.createElement("script")).src = w.options.jsfolder + ""),
                (h =
                    document.getElementsByTagName("script")[0]).parentNode.insertBefore(
                        a,
                        h
                    )),
            w.options.inityoutube &&
            (((a = document.createElement("script")).src =
                "https://www.youtube.com/iframe_api"),
                (h =
                    document.getElementsByTagName("script")[0]).parentNode.insertBefore(
                        a,
                        h
                    )),
            w.options.initsocial &&
            // x("head").append(
            //     '<link rel="stylesheet" href="' +
            //     w.options.jsfolder +
            //     'icons/css/mhfontello.css" type="text/css" />'
            // ),
            (w.showing = !1),
            (w.navvisible = !1),
            (w.disableKeyOutsideOfLightbox = function (t) {
                x(t.target).closest("#html5box-html5-lightbox").length <= 0 &&
                    (t.preventDefault(),
                        x("#html5-lightbox-box .html5-elem-box")
                            .attr("tabindex", "-1")
                            .focus());
            }),
            w.options.limitfocus &&
            (x(window).on("html5lightbox.lightboxopened", function () {
                x(document).on("keydown", w.disableKeyOutsideOfLightbox),
                    x("#html5-lightbox-box .html5-elem-box")
                        .attr("tabindex", "-1")
                        .focus();
            }),
                x(window).on("html5lightbox.lightboxclosed", function () {
                    x(document).off("keydown", w.disableKeyOutsideOfLightbox);
                })),
            (w.disableEscKey = function (t) {
                t
                    ? (w.disableesckeyinfullscreen = !0)
                    : setTimeout(function () {
                        w.disableesckeyinfullscreen = !1;
                    }, 1e3);
            }),
            (w.supportKeyboard = function () {
                (w.disableesckeyinfullscreen = !1),
                    x(document).keyup(function (t) {
                        w.showing &&
                            (!w.disableesckeyinfullscreen &&
                                w.options.supportesckey &&
                                27 == t.keyCode
                                ? w.finish()
                                : w.options.supportarrowkeys &&
                                (39 == t.keyCode
                                    ? w.gotoSlide(-1)
                                    : 37 == t.keyCode && w.gotoSlide(-2)));
                    }),
                    w.options.supportesckey &&
                    document.addEventListener &&
                    (document.addEventListener(
                        "MSFullscreenChange",
                        function () {
                            w.disableEscKey(null != document.msFullscreenElement);
                        },
                        !1
                    ),
                        document.addEventListener(
                            "webkitfullscreenchange",
                            function () {
                                w.disableEscKey(document.webkitIsFullScreen);
                            },
                            !1
                        ));
            }),
            w.supportKeyboard(),
            (w.init = function () {
                (w.showing = !1), w.readData(), w.createMarkup(), w.initSlide();
            }),
            (w.checkParentData = function (t, e, i) {
                return t.data(i) ? t.data(i) : e && e.data(i) ? e.data(i) : null;
            }),
            (w.checkParentClass = function (t, e, i) {
                var o = null;
                return (
                    x.each([t, e], function (t, e) {
                        e &&
                            e.attr("class") &&
                            ((e = e.attr("class").split(/\s+/)),
                                x.each(e, function (t, e) {
                                    !e ||
                                        0 != e.toLowerCase().indexOf("html5lightbox-" + i + "-") ||
                                        (3 == (e = e.split("-")).length &&
                                            ("true" == (e = e[2]).toLowerCase()
                                                ? (e = !0)
                                                : "false" == e.toLowerCase()
                                                    ? (e = !1)
                                                    : /^\d+$/.test(e)
                                                        ? (e = parseInt(e))
                                                        : isNaN(e) || (e = parseFloat(e)),
                                                (o = e)));
                                }));
                    }),
                    o
                );
            }),
            (w.readNodeData = function (t, e) {
                var i =
                    "mediatype" in t.data()
                        ? t.data("mediatype")
                        : w.checkType(t.attr("href"));
                if (!(i < 0)) {
                    var o = t.data("title") ? t.data("title") : t.attr("title"),
                        n = t.data("group")
                            ? t.data("group")
                            : w.options.userelforgroup
                                ? t.attr("rel")
                                : null;
                    !n &&
                        e &&
                        (n = e.data("group")
                            ? e.data("group")
                            : w.options.userelforgroup
                                ? e.attr("rel")
                                : null);
                    for (var s = 0; s < w.elemArray.length; s++)
                        if (t.attr("href") == w.elemArray[s][1])
                            return (w.elemArray[s][2] = o), void (w.elemArray[s][3] = n);
                    var r = w.checkParentData(t, e, "width"),
                        a = w.checkParentData(t, e, "height"),
                        r = r || w.checkParentClass(t, e, "width"),
                        a = a || w.checkParentClass(t, e, "height"),
                        l = w.checkParentData(t, e, "mediumwidth"),
                        h = w.checkParentData(t, e, "mediumheight");
                    (l = (l = l || w.checkParentClass(t, e, "mediumwidth")) || r),
                        (h = (h = h || w.checkParentClass(t, e, "mediumheight")) || a);
                    var c = w.checkParentData(t, e, "smallwidth"),
                        u = w.checkParentData(t, e, "smallheight");
                    (c = (c = c || w.checkParentClass(t, e, "smallwidth")) || l),
                        (u = (u = u || w.checkParentClass(t, e, "smallheight")) || h);
                    (c = new Array(
                        i,
                        t.attr("href"),
                        o,
                        n,
                        r,
                        a,
                        w.checkParentData(t, e, "webm"),
                        w.checkParentData(t, e, "ogg"),
                        w.checkParentData(t, e, "thumbnail"),
                        w.checkParentData(t, e, "description"),
                        null,
                        null,
                        null,
                        w.checkParentData(t, e, "socialmedia"),
                        w.checkParentData(t, e, "weblink"),
                        w.checkParentData(t, e, "weblinktarget"),
                        w.checkParentData(t, e, "weblinktext"),
                        l,
                        h,
                        c,
                        u
                    )),
                        (u = t.closest(".lightboxcontainer"));
                    0 < u.length &&
                        (0 < u.find(".lightboxtitle").length &&
                            (c[2] = u.find(".lightboxtitle").text()),
                            0 < u.find(".lightboxdescription").length &&
                            (c[9] = u.find(".lightboxdescription").text())),
                        w.elemArray.push(c);
                }
            }),
            (w.readData = function () {
                w.each(function () {
                    var t = x(this);
                    "a" == this.nodeName.toLowerCase() ||
                        "area" == this.nodeName.toLowerCase()
                        ? w.readNodeData(t)
                        : t.find("a,area").each(function () {
                            w.readNodeData(x(this), t);
                        });
                });
            }),
            (w.createMarkup = function () {
                switch (
                (x(window).width() <= w.options.fullscreensmallscreenwidth &&
                    (w.options.fullscreenmodeonsmallscreen &&
                        ((w.options.fullscreenmode = !0),
                            w.options.fullscreennomarginonsmallscreen &&
                            (w.options.fullscreennomargin = !0)),
                        w.options.fullscreenmode &&
                        w.options.fullscreennomarginonsmallscreen &&
                        (w.options.fullscreennomargin = !0)),
                    w.options.fullscreenmode &&
                    ((w.options.bgcolor = w.options.fullscreenbgcolor),
                        (w.options.bordersize = w.options.fullscreenbordersize),
                        (w.options.loadingfontcolor = w.options.fullscreenloadingfontcolor),
                        w.options.fullscreennomargin &&
                        ((w.options.bordersize = 0),
                            (w.options.bordermargin = 0),
                            (w.options.bordertopmargin = 0),
                            (w.options.bordertopmarginsmall = 0)),
                        w.options.fullscreentextoutside
                            ? ((w.options.titlestyle = "outside"),
                                (w.options.titlecss = w.options.titleoutsidecss),
                                (w.options.descriptioncss = w.options.descriptionoutsidecss))
                            : w.options.fullscreentextinside
                                ? ((w.options.titlestyle = "inside"),
                                    (w.options.titlecss = w.options.titleinsidecss),
                                    (w.options.descriptioncss = w.options.descriptioninsidecss))
                                : ((w.options.titlebottomcss =
                                    w.options.fullscreentitlebottomcss),
                                    (w.options.descriptionbottomcss =
                                        w.options.fullscreendescriptionbottomcss))),
                    (w.options.barheightoriginal = w.options.barheight),
                    w.options.responsivebarheight &&
                    w.getWinH() <= w.options.smallscreenheight &&
                    (w.options.barheight = w.options.barheightonsmallheight),
                    w.options.titlestyle)
                ) {
                    case "inside":
                        (w.options.titlecss = w.options.titleinsidecss),
                            (w.options.descriptioncss = w.options.descriptioninsidecss);
                        break;
                    case "outside":
                        (w.options.titlecss = w.options.titleoutsidecss),
                            (w.options.descriptioncss = w.options.descriptionoutsidecss);
                        break;
                    default:
                        (w.options.titlecss = w.options.titlebottomcss),
                            (w.options.descriptioncss = w.options.descriptionbottomcss);
                }
                (w.options.titlecss = x.trim(w.options.titlecss)),
                    1 < w.options.titlecss.length &&
                    ("{" == w.options.titlecss.charAt(0) &&
                        (w.options.titlecss = w.options.titlecss.substring(1)),
                        "}" == w.options.titlecss.charAt(w.options.titlecss.length - 1) &&
                        (w.options.titlecss = w.options.titlecss.substring(
                            0,
                            w.options.titlecss.length - 1
                        ))),
                    (w.options.descriptioncss = x.trim(w.options.descriptioncss)),
                    1 < w.options.descriptioncss.length &&
                    ("{" == w.options.descriptioncss.charAt(0) &&
                        (w.options.descriptioncss =
                            w.options.descriptioncss.substring(1)),
                        "}" ==
                        w.options.descriptioncss.charAt(
                            w.options.descriptioncss.length - 1
                        ) &&
                        (w.options.descriptioncss = w.options.descriptioncss.substring(
                            0,
                            w.options.descriptioncss.length - 1
                        ))),
                    (w.options.errorcss = x.trim(w.options.errorcss)),
                    1 < w.options.errorcss.length &&
                    ("{" == w.options.errorcss.charAt(0) &&
                        (w.options.errorcss = w.options.errorcss.substring(1)),
                        "}" == w.options.errorcss.charAt(w.options.errorcss.length - 1) &&
                        (w.options.errorcss = w.options.errorcss.substring(
                            0,
                            w.options.errorcss.length - 1
                        )));
                var t = " .bodynoscroll {height:100%;overflow:hidden;}";
                (t +=
                    " #html5box-html5-lightbox .html5-text {" + w.options.titlecss + "}"),
                    (t +=
                        " #html5box-html5-lightbox .html5-description {" +
                        w.options.descriptioncss +
                        "}"),
                    (t +=
                        " #html5box-html5-lightbox .html5-error {" +
                        w.options.errorcss +
                        "}"),
                    (t +=
                        " .html5-prev-fullscreen {display:block;cursor:pointer;position:absolute;z-index:1;left:" +
                        w.options.bordersize +
                        "px;right:auto;top:50%;transform:translate(0,-50%)} .html5-next-fullscreen {display:block;cursor:pointer;position:absolute;z-index:1;left:auto;right:" +
                        w.options.bordersize +
                        "px;top:50%;transform:translate(0,-50%)}"),
                    (t +=
                        " .html5-prev, .html5-next {display:none;cursor:pointer;position:absolute;z-index:1;}"),
                    (t +=
                        " .html5-prev-inside {left:" +
                        w.options.bordersize +
                        "px;right:auto;top:50%;transform:translate(0,-50%)} .html5-next-inside {left:auto;right:" +
                        w.options.bordersize +
                        "px;top:50%;transform:translate(0,-50%)}"),
                    (t +=
                        " .html5-prev-outside {left:0;right:auto;top:50%;transform:translate(-100%,-50%);} .html5-next-outside {left:auto;right:0;top:50%;transform:translate(100%,-50%);}"),
                    w.options.showarrowsbottomonsmallscreen &&
                    ((t +=
                        "@media (max-width: " +
                        w.options.navarrowsbottomscreenwidth +
                        "px) {"),
                        "bottom" == w.options.outsidearrowspos
                            ? (t +=
                                " .html5-prev-outside {display:block;top:100%;left:0;right:auto;transform:none;} .html5-next-outside {display:block;top:100%;left:auto;right:0;transform:none;}")
                            : "bottominside" == w.options.outsidearrowspos
                                ? (t +=
                                    " .html5-prev-outside {display:block;top:100%;left:0;right:auto;transform:translate(0,-100%);} .html5-next-outside {display:block;top:100%;left:auto;right:0;transform:translate(0,-100%);}")
                                : (t +=
                                    " .html5-prev-outside {display:block;top:50%;left:0;right:auto;transform:translate(0,-50%);} .html5-next-outside {display:block;top:50%;left:auto;right:0;transform:translate(0,-50%);}"),
                        (t +=
                            " .html5-prev-fullscreen {display:none;} .html5-next-fullscreen {display:none;}"),
                        (t += "}")),
                    (t +=
                        " .html5-prev-inside .mh-icon-left, .html5-next-inside .mh-icon-right { font-size: 20px; color: #ddd; background-color: rgba(0,0,0,0.6); line-height: 36px; width: 36px; height: 36px; text-align: center;} .html5-prev-inside .mh-icon-left:hover, .html5-next-inside .mh-icon-right:hover { color: #fff; } .html5-prev-outside .mh-icon-left, .html5-next-outside .mh-icon-right, .html5-prev-fullscreen .mh-icon-left, .html5-next-fullscreen .mh-icon-right { font-size: 24px; line-height: 36px; color: #ccc; background-color: rgba(0,0,0,0.6); } .html5-prev-outside .mh-icon-left:hover, .html5-next-outside .mh-icon-right:hover, .html5-prev-fullscreen .mh-icon-left:hover, .html5-next-fullscreen .mh-icon-right:hover { color: #fff; }"),
                    "right" == w.options.titlestyle
                        ? ((t +=
                            "#html5box-html5-lightbox .html5-elem-wrap {width:" +
                            w.options.imagepercentage +
                            "%;height:100%;} #html5box-html5-lightbox .html5-elem-data-box {min-height:100%;}"),
                            (t +=
                                "@media (max-width: " +
                                w.options.sidetobottomscreenwidth +
                                "px) {#html5box-html5-lightbox .html5-elem-wrap {width:100%;height:auto;} #html5box-html5-lightbox .html5-elem-data-box {width:100%;height:auto;min-height:0;}}"))
                        : "left" == w.options.titlestyle &&
                        ((t +=
                            "#html5box-html5-lightbox .html5-elem-wrap {height:100%;} #html5box-html5-lightbox .html5-elem-data-box {width:" +
                            String(100 - w.options.imagepercentage) +
                            "%;min-height:100%;}"),
                            (t +=
                                "@media (max-width: " +
                                w.options.sidetobottomscreenwidth +
                                "px) {#html5box-html5-lightbox .html5-elem-wrap {width:100%;height:auto;} #html5box-html5-lightbox .html5-elem-data-box {width:100%;height:auto;min-height:0;}}")),
                    (t +=
                        ".html5-rotate { border-radius:50%; -webkit-transition:-webkit-transform .4s ease-in; transition: transform .4s ease-in; } .html5-rotate:hover { -webkit-transform: rotate(360deg); transform: rotate(360deg); }"),
                    (t +=
                        "@media (max-width: " +
                        w.options.navarrowsbottomscreenwidth +
                        "px) {#html5-social {" +
                        w.options.socialpositionsmallscreen +
                        "}}"),
                    w.options.exitanimationduration &&
                    (w.options.animationduration = w.options.exitanimationduration),
                    (t +=
                        ".html5box-animated { -webkit-animation-duration:" +
                        w.options.animationduration +
                        "; animation-duration:" +
                        w.options.animationduration +
                        "; -webkit-animation-fill-mode: both; animation-fill-mode: both; }"),
                    (t +=
                        "@-webkit-keyframes html5box-fadeOut { from { opacity: 1; } to { opacity: 0; } } @keyframes html5box-fadeOut { from { opacity: 1; } to { opacity: 0; } } .html5box-fadeOut { -webkit-animation-name: html5box-fadeOut; animation-name: html5box-fadeOut; }"),
                    (t +=
                        "@-webkit-keyframes html5box-fadeOutDown { from { opacity: 1; } to { opacity: 0; -webkit-transform: translate3d(0, 100%, 0); transform: translate3d(0, 100%, 0); } } @keyframes html5box-fadeOutDown { from { opacity: 1; } to { opacity: 0; -webkit-transform: translate3d(0, 100%, 0); transform: translate3d(0, 100%, 0); } } .html5box-fadeOutDown { -webkit-animation-name: html5box-fadeOutDown; animation-name: html5box-fadeOutDown; }"),
                    (t +=
                        ".html5box-enter-animated { -webkit-animation-duration:" +
                        w.options.enteranimationduration +
                        "; animation-duration:" +
                        w.options.enteranimationduration +
                        "; -webkit-animation-fill-mode: both; animation-fill-mode: both; }"),
                    (t +=
                        " @keyframes html5box-none { } .html5box-none { animation-name: html5box-none; }"),
                    (t +=
                        " @keyframes html5box-fadeIn { from { opacity: 0; } to { opacity: 1; } } .html5box-fadeIn { animation-name: html5box-fadeIn; }"),
                    (t +=
                        " @keyframes html5box-fadeInDown { from { opacity: 0; transform: translate3d(0, -100%, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } } .html5box-fadeInDown { animation-name: html5box-fadeInDown; }"),
                    (t +=
                        " @keyframes html5box-zoomIn { from { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); } 50% { opacity: 1; } } .html5box-zoomIn { animation-name: html5box-zoomIn; }"),
                    (t +=
                        " @keyframes html5box-bounceIn { from, 20%, 40%, 60%, 80%, to { animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); } 0% { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); } 20% { transform: scale3d(1.1, 1.1, 1.1); } 40% { transform: scale3d(0.9, 0.9, 0.9); } 60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); } 80% { transform: scale3d(0.97, 0.97, 0.97); } to { opacity: 1; transform: scale3d(1, 1, 1); } } .html5box-bounceIn { animation-name: html5box-bounceIn; }"),
                    (t +=
                        " #html5-close .mh-icon-close { font-size: 14px; padding: 4px; color: #333; background-color: #fff; } #html5-close .mh-icon-close:hover { color: #000; }"),
                    (t +=
                        " #html5-close-fullscreen .mh-icon-close { font-size: 24px; padding: 4px; color: #eee; background-color: rgba(0,0,0,0.7); } #html5-close-fullscreen .mh-icon-close:hover { color: #fff; }"),
                    (t +=
                        " .html5-nav-showcontrol .mh-icon-th-thumb { color: #ddd; font-size: 16px; } .html5-nav-showcontrol .mh-icon-th-thumb:hover { color: #fff; }"),
                    x("head").append(
                        "<style type='text/css' data-creator='html5box-html5-lightbox'>" +
                        t +
                        "</style>"
                    );
                var e = w.options.elemautoheight ? "auto" : "100%";
                (w.$lightbox = x(
                    "<div id='html5box-html5-lightbox' style='display:none;top:0px;left:0px;width:100%;height:100%;z-index:9999998;text-align:center;'><div id='html5-lightbox-overlay' style='display:block;position:absolute;top:0px;left:0px;width:100%;min-height:100%;background-color:" +
                    w.options.overlaybgcolor +
                    ";opacity:" +
                    w.options.overlayopacity +
                    ";filter:alpha(opacity=" +
                    Math.round(100 * w.options.overlayopacity) +
                    ");'></div><div id='html5-lightbox-box' style='display:block;position:relative;margin:0px auto;'><div class='html5-elem-box' style='display:block;outline:none;position:relative;width:100%;overflow-x:hidden;overflow-y:auto;height:" +
                    e +
                    ";margin:0px auto;text-align:center;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;'><div class='html5-elem-wrap' style='display:block;position:relative;overflow:hidden;margin:0px auto;text-align:center;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;background-color:" +
                    w.options.bgcolor +
                    ";'><div class='html5-loading' style='display:none;position:absolute;text-align:center;'></div><div class='html5-error-box html5-error' style='display:none;position:absolute;padding:" +
                    w.options.bordersize +
                    "px;text-align:center;width:" +
                    w.options.errorwidth +
                    "px;height:" +
                    w.options.errorheight +
                    "px;'>The requested content cannot be loaded.<br />Please try again later.</div><div class='html5-image' style='display:none;position:relative;top:0px;left:0px;width:100%;height:100%;overflow:auto;" +
                    (w.options.iequirksmode ? "margin" : "padding") +
                    ":" +
                    w.options.bordersize +
                    "px;text-align:center;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;'></div></div></div><div id='html5-watermark' style='display:none;position:absolute;left:" +
                    String(w.options.bordersize + 2) +
                    "px;top:" +
                    String(w.options.bordersize + 2) +
                    "px;'></div></div></div>"
                )),
                    (w.options.positionFixed =
                        w.options.supportCSSPositionFixed &&
                        w.options.responsive &&
                        !w.options.iequirksmode),
                    (w.options.useabsolutepos ||
                        (w.options.useabsoluteposonmobile && w.options.isMobile)) &&
                    (w.options.positionFixed = !1),
                    w.$lightbox.css({
                        position: w.options.positionFixed ? "fixed" : "absolute",
                    }),
                    w.$lightbox.appendTo("body"),
                    (w.$lightboxBox = x("#html5-lightbox-box", w.$lightbox)),
                    (w.$elem = x(".html5-elem-box", w.$lightbox)),
                    (w.$elemWrap = x(".html5-elem-wrap", w.$lightbox)),
                    (w.$loading = x(".html5-loading", w.$lightbox)),
                    (w.$error = x(".html5-error-box", w.$lightbox)),
                    (w.$image = x(".html5-image", w.$lightbox)),
                    w.options.loadingusefont
                        ? (w.$loading.css({
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            "font-size": "24px",
                            "line-height": "44px",
                            padding: "10px",
                            color: w.options.loadingfontcolor,
                            "background-color": w.options.loadingfontbg,
                        }),
                            w.$loading.append(
                                '<div class="mh-spinicon animate-spin ' +
                                w.options.loadingfontname +
                                '"></div>'
                            ))
                        : w.$loading.css({
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            background:
                                'url("' +
                                w.options.loadingimage +
                                '") no-repeat center center',
                        }),
                    w.options.fullscreenmode &&
                    w.options.fullscreennomargin &&
                    w.$elem.css({ overflow: "hidden" });
                var i,
                    t =
                        "<div class='html5-elem-data-box' style='display:none;box-sizing:border-box;'><div class='html5-text' style='display:block;overflow:hidden;'></div></div>";
                "left" == w.options.titlestyle
                    ? w.$elem.prepend(t)
                    : ("outside" == w.options.titlestyle ? w.$lightbox : w.$elem).append(
                        t
                    ),
                    (w.$elemData = x(".html5-elem-data-box", w.$lightbox)),
                    (w.$text = x(".html5-text", w.$lightbox)),
                    0 < w.options.borderradius &&
                    (w.$elem.css({
                        "border-radius": w.options.borderradius + "px",
                        "-moz-border-radius": w.options.borderradius + "px",
                        "-webkit-border-radius": w.options.borderradius + "px",
                    }),
                        "inside" == w.options.titlestyle
                            ? w.$elemWrap.css({
                                "border-radius": w.options.borderradius + "px",
                                "-moz-border-radius": w.options.borderradius + "px",
                                "-webkit-border-radius": w.options.borderradius + "px",
                            })
                            : "bottom" == w.options.titlestyle &&
                            (w.$elemWrap.css({
                                "border-top-left-radius": w.options.borderradius + "px",
                                "-moz-top-left-border-radius": w.options.borderradius + "px",
                                "-webkit-top-left-border-radius":
                                    w.options.borderradius + "px",
                                "border-top-right-radius": w.options.borderradius + "px",
                                "-moz-top-right-border-radius": w.options.borderradius + "px",
                                "-webkit-top-right-border-radius":
                                    w.options.borderradius + "px",
                            }),
                                w.$elemData.css({
                                    "border-bottom-left-radius": w.options.borderradius + "px",
                                    "-moz-top-bottom-border-radius":
                                        w.options.borderradius + "px",
                                    "-webkit-bottom-left-border-radius":
                                        w.options.borderradius + "px",
                                    "border-bottom-right-radius": w.options.borderradius + "px",
                                    "-moz-bottom-right-border-radius":
                                        w.options.borderradius + "px",
                                    "-webkit-bottom-right-border-radius":
                                        w.options.borderradius + "px",
                                }))),
                    "right" == w.options.titlestyle || "left" == w.options.titlestyle
                        ? (w.$lightboxBox.css({ "background-color": w.options.bgcolor }),
                            "right" == w.options.titlestyle
                                ? (w.$elemWrap.css({ position: "relative", float: "left" }),
                                    w.$elemData.css({
                                        position: "relative",
                                        overflow: "hidden",
                                        padding: w.options.bordersize + "px",
                                    }))
                                : (w.$elemWrap.css({
                                    position: "relative",
                                    overflow: "hidden",
                                }),
                                    w.$elemData.css({
                                        position: "relative",
                                        float: "left",
                                        padding: w.options.bordersize + "px",
                                    })))
                        : "inside" == w.options.titlestyle
                            ? (w.$elemData.css({
                                position: "absolute",
                                margin: 0,
                                padding: 0,
                                bottom: w.options.bordersize + "px",
                                left: w.options.bordersize + "px",
                                right: w.options.bordersize + "px",
                                "background-color": "rgba(51, 51, 51, 0.6)",
                            }),
                                w.options.showonmouseoverinside &&
                                w.$elemData.css({ opacity: 0 }),
                                w.$text.css({
                                    padding:
                                        w.options.bordersize +
                                        "px " +
                                        2 * w.options.bordersize +
                                        "px",
                                }))
                            : "outside" == w.options.titlestyle
                                ? w.$elemData.css({
                                    position: "relative",
                                    width: "100%",
                                    height: "auto",
                                })
                                : (w.$elemData.css({
                                    position: "relative",
                                    width: "100%",
                                    height: w.options.barautoheight
                                        ? "auto"
                                        : w.options.barheight + "px",
                                    padding: "0 0 " + w.options.bordersize + "px 0",
                                    "background-color": w.options.bgcolor,
                                    "text-align": "left",
                                }),
                                    (w.options.fullscreenmode && w.options.fullscreennomargin) ||
                                    w.$text.css({ margin: "0 " + w.options.bordersize + "px" })),
                    w.options.showsocial &&
                    ((i =
                        '<div id="html5-social" style="display:none;' +
                        w.options.socialposition +
                        '">'),
                        (e =
                            ("horizontal" == w.options.socialdirection
                                ? "display:inline-block;"
                                : "display:block;") + "margin:4px;"),
                        (t =
                            "display:table-cell;width:" +
                            w.options.socialbuttonsize +
                            "px;height:" +
                            w.options.socialbuttonsize +
                            "px;font-size:" +
                            w.options.socialbuttonfontsize +
                            "px;border-radius:50%;color:#fff;vertical-align:middle;text-align:center;cursor:pointer;padding:0;"),
                        w.options.showemail &&
                        (i +=
                            '<div class="html5-social-btn' +
                            (w.options.socialrotateeffect ? " html5-rotate" : "") +
                            ' html5-social-email" style="' +
                            e +
                            '"><div class="mh-icon-mail" style="' +
                            t +
                            'background-color:#4d83ff;"></div></div>'),
                        w.options.showfacebook &&
                        (i +=
                            '<div class="html5-social-btn' +
                            (w.options.socialrotateeffect ? " html5-rotate" : "") +
                            ' html5-social-facebook" style="' +
                            e +
                            '"><div class="mh-icon-facebook" style="' +
                            t +
                            'background-color:#3b5998;"></div></div>'),
                        w.options.showtwitter &&
                        (i +=
                            '<div class="html5-social-btn' +
                            (w.options.socialrotateeffect ? " html5-rotate" : "") +
                            ' html5-social-twitter" style="' +
                            e +
                            '"><div class="mh-icon-twitter" style="' +
                            t +
                            'background-color:#03b3ee;"></div></div>'),
                        w.options.showpinterest &&
                        (i +=
                            '<div class="html5-social-btn' +
                            (w.options.socialrotateeffect ? " html5-rotate" : "") +
                            ' html5-social-pinterest" style="' +
                            e +
                            '"><div class="mh-icon-pinterest" style="' +
                            t +
                            'background-color:#c92228;"></div></div>'),
                        (i += '<div style="clear:both;"></div></div>'),
                        w.$lightboxBox.append(i),
                        x(".html5-social-btn", w.$lightbox).click(function () {
                            var t,
                                e = w.options.sharemediaurl
                                    ? w.currentElem[1]
                                    : window.location.href +
                                    (window.location.href.indexOf("?") < 0 ? "?" : "&") +
                                    "html5lightboxshare=" +
                                    encodeURIComponent(w.currentElem[1]),
                                i = w.currentElem[2],
                                o = w.currentElem[1];
                            0 == w.currentElem[0]
                                ? (o = w.absoluteUrl(w.currentElem[1]))
                                : 3 == w.currentElem[0]
                                    ? (o =
                                        "https://img.youtube.com/vi/" +
                                        w.getYoutubeId(w.currentElem[1]) +
                                        "/0.jpg")
                                    : 0 <
                                    (t = x('.html5lightbox[href="' + w.currentElem[1] + '"]'))
                                        .length &&
                                    (t.data("shareimage") && 0 < t.data("shareimage").length
                                        ? (o = w.absoluteUrl(t.data("shareimage")))
                                        : t.data("thumbnail") && 0 < t.data("thumbnail").length
                                            ? (o = w.absoluteUrl(t.data("thumbnail")))
                                            : 0 < (n = x("img", t)).length &&
                                            (o = w.absoluteUrl(n.attr("src"))));
                            var n =
                                2 == w.currentElem[0] ||
                                3 == w.currentElem[0] ||
                                4 == w.currentElem[0] ||
                                8 == w.currentElem[0] ||
                                9 == w.currentElem[0] ||
                                11 == w.currentElem[0] ||
                                12 == w.currentElem[0],
                                i = i ? w.html2Text(i) : w.options.sharetextprefix;
                            return (
                                x(this).hasClass("html5-social-facebook")
                                    ? window.open(
                                        "https://www.facebook.com/sharer/sharer.php?u=" +
                                        encodeURIComponent(e) +
                                        "&t=" +
                                        encodeURIComponent(i),
                                        "_blank"
                                    )
                                    : x(this).hasClass("html5-social-twitter")
                                        ? window.open(
                                            "https://twitter.com/share?url=" +
                                            encodeURIComponent(e) +
                                            "&text=" +
                                            encodeURIComponent(i),
                                            "_blank"
                                        )
                                        : x(this).hasClass("html5-social-pinterest")
                                            ? window.open(
                                                "https://pinterest.com/pin/create/bookmarklet/?media=" +
                                                encodeURIComponent(o) +
                                                "&url=" +
                                                encodeURIComponent(e) +
                                                "&description=" +
                                                encodeURIComponent(i) +
                                                "&is_video=" +
                                                (n ? "true" : "false"),
                                                "_blank"
                                            )
                                            : x(this).hasClass("html5-social-email") &&
                                            window.open(
                                                "mailto:?subject=" +
                                                encodeURIComponent(i) +
                                                "&body=" +
                                                encodeURIComponent(w.options.sharetextprefix + " " + e)
                                            ),
                                !1
                            );
                        })),
                    w.options.isTouch &&
                    w.options.navarrowsalwaysshowontouch &&
                    "inside" == w.options.navarrowspos &&
                    (w.options.navarrowspos = "side"),
                    w.$lightboxBox.append(
                        "<div class='html5-next'></div><div class='html5-prev'></div>"
                    ),
                    (w.$next = x(".html5-next", w.$lightbox)),
                    (w.$prev = x(".html5-prev", w.$lightbox)),
                    w.options.fullscreenmode || "browserside" == w.options.navarrowspos
                        ? (w.$lightbox.append(
                            "<div class='html5-next-fullscreen'></div><div class='html5-prev-fullscreen'></div>"
                        ),
                            (w.$nextfullscreen = x(".html5-next-fullscreen", w.$lightbox)),
                            (w.$prevfullscreen = x(".html5-prev-fullscreen", w.$lightbox)),
                            w.$next.addClass("html5-next-outside"),
                            w.$prev.addClass("html5-prev-outside"))
                        : (w.$next.addClass(
                            "side" == w.options.navarrowspos
                                ? "html5-next-outside"
                                : "html5-next-inside"
                        ),
                            w.$prev.addClass(
                                "side" == w.options.navarrowspos
                                    ? "html5-prev-outside"
                                    : "html5-prev-inside"
                            ),
                            ("side" != w.options.navarrowspos &&
                                !w.options.alwaysshownavarrows) ||
                            (w.$next.css({ display: "block" }),
                                w.$prev.css({ display: "block" }))),
                    w.options.arrowsusefont
                        ? (w.$next.append('<div class="mh-icon-right"></div>'),
                            w.$prev.append('<div class="mh-icon-left"></div>'),
                            w.$nextfullscreen &&
                            (w.$nextfullscreen.append('<div class="mh-icon-right"></div>'),
                                w.$prevfullscreen.append('<div class="mh-icon-left"></div>')))
                        : (w.$next.append("<img alt='' src='" + w.options.nextimage + "'>"),
                            w.$prev.append("<img alt='' src='" + w.options.previmage + "'>"),
                            w.$nextfullscreen &&
                            (w.$nextfullscreen.append(
                                "<img alt='' src='" + w.options.fullscreennextimage + "'>"
                            ),
                                w.$prevfullscreen.append(
                                    "<img alt='' src='" + w.options.fullscreenprevimage + "'>"
                                ))),
                    w.options.fullscreenmode || "topright" == w.options.closepos
                        ? (w.$lightbox.append(
                            "<button id='html5-close-fullscreen' style='display:block;cursor:pointer;position:absolute;top:0;right:0;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;padding:0;background:transparent;border:none;'></button>"
                        ),
                            (w.$close = x("#html5-close-fullscreen", w.$lightbox)))
                        : (w.$lightboxBox.append(
                            "<button id='html5-close' style='display:none;cursor:pointer;position:absolute;top:0;right:0;" +
                            ("outside" == w.options.closepos
                                ? "margin-top:-16px;margin-right:-16px;margin-bottom:0;margin-left:0;padding:0;background:transparent;border:none;"
                                : "") +
                            "'></button>"
                        ),
                            (w.$close = x("#html5-close", w.$lightbox))),
                    w.options.closeusefont &&
                        (w.options.fullscreenmode ||
                            "topright" == w.options.closepos ||
                            "inside" == w.options.closepos)
                        ? w.$close.append('<div class="mh-icon-close"></div>')
                        : w.$close.append(
                            "<img alt='' src='" +
                            (w.options.fullscreenmode || "topright" == w.options.closepos
                                ? w.options.fullscreencloseimage
                                : w.options.closeimage) +
                            "'>"
                        ),
                    "inside" == w.options.titlestyle &&
                    w.options.showonmouseoverinside &&
                    w.$lightboxBox.hover(
                        function () {
                            (0 != w.currentElem[0] &&
                                w.options.showinsidetitleforimageonly) ||
                                w.$elemData.animate({ opacity: 1 }, 400);
                        },
                        function () {
                            w.$elemData.animate({ opacity: 0 }, 400);
                        }
                    ),
                    (w.$watermark = x("#html5-watermark", w.$lightbox)),
                    w.options.stamp
                        ? w.$watermark.html(
                            "<a href='" +
                            w.options.freelink +
                            "' style='text-decoration:none;' title='jQuery Lightbox'><div style='display:block;width:170px;height:20px;text-align:center;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;background-color:#fff;color:#333;font:12px Arial,sans-serif;'><div style='line-height:20px;'>" +
                            w.options.freemark +
                            "</div></div></a>"
                        )
                        : w.options.watermark &&
                        ((i =
                            "<img alt='' src='" +
                            w.options.watermark +
                            "' style='border:none;' />"),
                            w.options.watermarklink &&
                            (i =
                                "<a href='" +
                                w.options.watermarklink +
                                "' target='_blank'>" +
                                i +
                                "</a>"),
                            w.$watermark.html(i)),
                    w.options.closeonoverlay &&
                    x("#html5-lightbox-overlay", w.$lightbox).click(w.finish),
                    w.$close.click(w.finish),
                    w.$next.click(function () {
                        w.nextArrowClicked();
                    }),
                    w.$prev.click(function () {
                        w.prevArrowClicked();
                    }),
                    w.$nextfullscreen &&
                    (w.$nextfullscreen.click(function () {
                        w.nextArrowClicked();
                    }),
                        w.$prevfullscreen.click(function () {
                            w.prevArrowClicked();
                        })),
                    x(window).resize(function () {
                        (w.options.isIOS && !w.options.mobileresizeevent) ||
                            (clearTimeout(w.options.resizeTimeout),
                                (w.options.resizeTimeout = setTimeout(function () {
                                    w.resizeWindow();
                                }, w.options.resizedelay)));
                    }),
                    x(window).scroll(function () {
                        (w.options.isIOS && !w.options.mobileresizeevent) || w.scrollBox();
                    }),
                    x(window).on("orientationchange", function (t) {
                        w.options.isMobile &&
                            (clearTimeout(w.options.resizeTimeout),
                                (w.options.resizeTimeout = setTimeout(function () {
                                    w.resizeWindow();
                                }, w.options.resizedelay)));
                    }),
                    w.options.enabletouchswipe && w.enableSwipe();
            }),
            (w.html2Text = function (t) {
                var e = document.createElement("div");
                return (e.innerHTML = t), e.innerText;
            }),
            (w.slideTimer = function (t, e, i) {
                var o = this;
                o.timeout = t;
                var n = null,
                    s = 0,
                    r = !1,
                    a = !1,
                    l = !1;
                return (
                    (this.pause = function () {
                        a && ((r = !0), clearInterval(n));
                    }),
                    (this.resume = function (t) {
                        (l && !t) ||
                            ((l = !1),
                                a &&
                                r &&
                                ((r = !1),
                                    (n = setInterval(function () {
                                        (s += 50) > o.timeout && (clearInterval(n), e && e()),
                                            i && i(s / o.timeout);
                                    }, 50))));
                    }),
                    (this.stop = function () {
                        clearInterval(n), i && i(-1), (s = 0), (a = r = !1);
                    }),
                    (this.start = function () {
                        (s = 0),
                            (a = !(r = !1)),
                            (n = setInterval(function () {
                                (s += 50) > o.timeout && (clearInterval(n), e && e()),
                                    i && i(s / o.timeout);
                            }, 50));
                    }),
                    (this.startandpause = function () {
                        l = a = r = !(s = 0);
                    }),
                    this
                );
            }),
            (w.updateTimer = function (t) {
                t = Math.round(100 * t);
                100 < t && (t = 100),
                    t < 0 && (t = 0),
                    x(".html5-timer", w.$lightbox).css({
                        display: "block",
                        width: t + "%",
                    });
            }),
            (w.initSlide = function () {
                (w.autosliding = !1),
                    (w.slideTimeout = w.slideTimer(
                        w.options.slideinterval,
                        function () {
                            w.gotoSlide(-1);
                        },
                        w.options.showtimer
                            ? function (t) {
                                w.updateTimer(t);
                            }
                            : null
                    )),
                    w.options.autoslide && (w.slideTimeout.stop(), (w.autosliding = !0));
            }),
            (w.nextArrowClicked = function () {
                w.options.nextElem <= w.options.curElem &&
                    w.options.onlastarrowclicked &&
                    window[w.options.onlastarrowclicked] &&
                    "function" == typeof window[w.options.onlastarrowclicked] &&
                    window[w.options.onlastarrowclicked](),
                    w.gotoSlide(-1);
            }),
            (w.prevArrowClicked = function () {
                w.options.prevElem >= w.options.curElem &&
                    w.options.onfirstarrowclicked &&
                    window[w.options.onfirstarrowclicked] &&
                    "function" == typeof window[w.options.onfirstarrowclicked] &&
                    window[w.options.onfirstarrowclicked](),
                    w.gotoSlide(-2);
            }),
            (w.calcNextPrevElem = function () {
                (w.options.nextElem = -1),
                    (w.options.prevElem = -1),
                    (w.options.inGroup = !1),
                    (w.options.groupIndex = 0),
                    (w.options.groupCount = 0);
                for (
                    var t = w.elemArray[w.options.curElem][3], e = 0;
                    e < w.elemArray.length;
                    e++
                )
                    w.matchGroup(t, w.elemArray[e][3]) &&
                        (e == w.options.curElem &&
                            (w.options.groupIndex = w.options.groupCount),
                            w.options.groupCount++);
                var i,
                    o = w.elemArray[w.options.curElem][3];
                if (null != o && null != o) {
                    for (i = w.options.curElem + 1; i < w.elemArray.length; i++)
                        if (w.matchGroup(o, w.elemArray[i][3])) {
                            w.options.nextElem = i;
                            break;
                        }
                    if (w.options.nextElem < 0)
                        for (i = 0; i < w.options.curElem; i++)
                            if (w.matchGroup(o, w.elemArray[i][3])) {
                                w.options.nextElem = i;
                                break;
                            }
                    if (0 <= w.options.nextElem) {
                        for (i = w.options.curElem - 1; 0 <= i; i--)
                            if (w.matchGroup(o, w.elemArray[i][3])) {
                                w.options.prevElem = i;
                                break;
                            }
                        if (w.options.prevElem < 0)
                            for (i = w.elemArray.length - 1; i > w.options.curElem; i--)
                                if (w.matchGroup(o, w.elemArray[i][3])) {
                                    w.options.prevElem = i;
                                    break;
                                }
                    }
                }
                (0 <= w.options.nextElem || 0 <= w.options.prevElem) &&
                    (w.options.inGroup = !0);
            }),
            (w.calcBoxPosition = function (t, e) {
                var i = t + 2 * w.options.bordersize,
                    o = e + 2 * w.options.bordersize,
                    n =
                        w.options.shownavigation && w.navvisible ? w.options.navheight : 0,
                    t = w.getWinH(),
                    e = Math.round((t - n) / 2 - o / 2);
                "bottom" == w.options.titlestyle &&
                    (e -= Math.round(w.options.barheight / 2));
                t =
                    x(window).height() < w.options.smallscreenheight
                        ? w.options.bordertopmarginsmall
                        : w.options.bordertopmargin;
                return (
                    e < t && (e = t),
                    w.options.insideiframe &&
                    window.self != window.top &&
                    ((e =
                        0 < w.options.iframetopmargin ? w.options.iframetopmargin : t),
                        w.options.iframesamedomain &&
                        parent.window.jQuery &&
                        parent.window.jQuery("#" + w.options.iframeid).length &&
                        (e +=
                            (n = parent.window
                                .jQuery("#" + w.options.iframeid)
                                .offset().top) < (t = parent.window.document.body.scrollTop)
                                ? t - n
                                : 0)),
                    [i, o, e]
                );
            }),
            (w.hideNavArrows = function () {
                var t = !1,
                    e = !1;
                w.options.inGroup &&
                    ((w.options.arrowloop ||
                        (!w.options.arrowloop && w.options.prevElem < w.options.curElem)) &&
                        (t = !0),
                        (w.options.arrowloop ||
                            (!w.options.arrowloop && w.options.nextElem > w.options.curElem)) &&
                        (e = !0)),
                    t ||
                    (w.$prev.css({ display: "none" }),
                        w.$prevfullscreen && w.$prevfullscreen.css({ display: "none" })),
                    e ||
                    (w.$next.css({ display: "none" }),
                        w.$nextfullscreen && w.$nextfullscreen.css({ display: "none" }));
            }),
            (w.resizePositionFixed = function () {
                w.options.positionFixed ||
                    w.$lightbox.css({
                        "padding-top": x(window).scrollTop() + "px",
                        height: Math.max(x(document).height(), x(window).height()) + "px",
                    });
            }),
            (w.adjustLightboxPos = function (t, e) {
                var i = x(window).width(),
                    o = w.calcBoxPosition(t, e),
                    t = o[0],
                    e = o[1],
                    o = o[2];
                w.options.iequirksmode
                    ? w.$lightboxBox.css({ top: o })
                    : w.$lightboxBox.css({ "margin-top": o }),
                    w.resizePositionFixed(),
                    ("left" == w.options.titlestyle || "right" == w.options.titlestyle) &&
                        i > w.options.sidetobottomscreenwidth
                        ? (w.$lightboxBox.css({ width: t, height: e }),
                            w.$elemWrap.css({
                                width: w.options.imagepercentage + "%",
                                height: "100%",
                            }))
                        : (w.$lightboxBox.css({ width: t, height: "auto" }),
                            w.$elemWrap.css({ width: t, height: e }));
            }),
            (w.readClassOptions = function (t) {
                var o = {},
                    t = x(t).attr("class");
                return (
                    t &&
                    ((t = t.split(/\s+/)),
                        x.each(t, function (t, e) {
                            var i;
                            !e ||
                                0 != e.toLowerCase().indexOf("html5lightbox-") ||
                                (3 == (i = e.split("-")).length &&
                                    i[2] &&
                                    ("true" == (e = i[2]).toLowerCase()
                                        ? (e = !0)
                                        : "false" == e.toLowerCase()
                                            ? (e = !1)
                                            : /^\d+$/.test(e)
                                                ? (e = parseInt(e))
                                                : isNaN(e) || (e = parseFloat(e)),
                                        (o[i[1]] = e)));
                        })),
                    o
                );
            }),
            (w.clickHandler = function () {
                var t = x(this),
                    i = {};
                x.each(t.data(), function (t, e) {
                    i[t.toLowerCase()] = e;
                }),
                    (w.options = x.extend(w.options, w.defaultoptions, i));
                var e = w.readClassOptions(this);
                if (
                    ((w.options = x.extend(w.options, e)),
                        x(window).trigger("html5lightbox.lightboxshow"),
                        w.init(),
                        w.elemArray.length <= 0)
                )
                    return !0;
                w.hideObjects();
                for (
                    var o = 0;
                    o < w.elemArray.length && w.elemArray[o][1] != t.attr("href");
                    o++
                );
                return (
                    o == w.elemArray.length ||
                    ((w.options.curElem = o),
                        w.calcNextPrevElem(),
                        w.reset(),
                        w.$lightbox.show(),
                        w.adjustLightboxPos(w.options.loadingwidth, w.options.loadingheight),
                        w.loadCurElem(),
                        !1)
                );
            }),
            (w.loadThumbnail = function (e, i, o) {
                var t = new Image();
                x(t).on("load", function () {
                    var t =
                        this.width / this.height <=
                            w.options.thumbwidth / w.options.thumbheight
                            ? "width:100%;"
                            : "height:100%;";
                    x(".html5-nav-thumb")
                        .eq(i)
                        .html(
                            "<img alt='" +
                            w.html2Text(o) +
                            "' style='" +
                            t +
                            "' src='" +
                            e +
                            "' />"
                        );
                }),
                    (t.src = e);
            }),
            (w.matchGroup = function (t, e) {
                if (w.options.showall) return !0;
                if (!t || !e) return !1;
                var i,
                    o = t.split(":"),
                    n = e.split(":"),
                    s = !1;
                for (i in o)
                    if (-1 < x.inArray(o[i], n)) {
                        s = !0;
                        break;
                    }
                return s;
            }),
            (w.getWinH = function () {
                return (
                    w.options.insideiframe &&
                        window.self != window.top &&
                        w.options.iframesamedomain
                        ? x(parent.window)
                        : x(window)
                ).height();
            }),
            (w.showNavigation = function () {
                if (
                    w.options.shownavigation &&
                    !(
                        ((w.options.isIPhone || w.options.isAndroid) &&
                            w.options.hidenavigationonmobile) ||
                        (w.options.isIPad && w.options.hidenavigationonipad)
                    ) &&
                    w.currentElem &&
                    w.currentElem[3]
                ) {
                    var t = !1,
                        e = w.currentElem[3];
                    for (s = 0; s < w.elemArray.length; s++)
                        if (
                            w.matchGroup(e, w.elemArray[s][3]) &&
                            w.elemArray[s][8] &&
                            0 < w.elemArray[s][8].length
                        ) {
                            t = !0;
                            break;
                        }
                    if (
                        t &&
                        ((w.options.navheight =
                            w.options.thumbheight +
                            w.options.thumbtopmargin +
                            w.options.thumbbottommargin),
                            !(0 < x(".html5-nav").length))
                    ) {
                        var i = w.options.hidenavdefault
                            ? "top:100%;bottom:auto;left:0;right:0;"
                            : "top:auto;bottom:0;left:0;right:0;",
                            o = w.options.positionFixed ? "fixed" : "absolute";
                        x("body").append(
                            "<div id='html5box-html5-lightbox-nav' class='html5-nav' style='display:block;position:" +
                            o +
                            ";" +
                            i +
                            "width:100%;height:" +
                            w.options.navheight +
                            "px;z-index:9999999;" +
                            (w.options.navbgcolor
                                ? "background-color:" + w.options.navbgcolor + ";"
                                : "") +
                            "'><div class='html5-nav-container' style='position:relative;margin:" +
                            w.options.thumbtopmargin +
                            "px auto " +
                            w.options.thumbbottommargin +
                            "px;'><div class='html5-nav-prev' style='display:block;position:absolute;cursor:pointer;width:" +
                            w.options.navbuttonwidth +
                            'px;height:100%;left:0;top:0;background:url("' +
                            w.options.navarrowsprevimage +
                            "\") no-repeat left center;'></div><div class='html5-nav-mask' style='display:block;position:relative;margin:0 auto;overflow:hidden;'><div class='html5-nav-list'></div></div><div class='html5-nav-next' style='display:block;position:absolute;cursor:pointer;width:" +
                            w.options.navbuttonwidth +
                            'px;height:100%;right:0;top:0;background:url("' +
                            w.options.navarrowsnextimage +
                            "\") no-repeat right center;'></div></div></div>"
                        ),
                            (w.navvisible = !w.options.hidenavdefault),
                            w.options.shownavcontrol &&
                            (x(".html5-nav").append(
                                '<div class="html5-nav-showcontrol" style="position:absolute;display:block;cursor:pointer;bottom:100%;right:12px;margin:0;padding:0;"></div>'
                            ),
                                w.options.navusefont
                                    ? x(".html5-nav-showcontrol").append(
                                        '<div class="mh-icon-th-thumb"></div>'
                                    )
                                    : x(".html5-nav-showcontrol").append(
                                        '<img alt="" src="' +
                                        w.options.navcontrolimage +
                                        '"></img>'
                                    ),
                                x(".html5-nav-showcontrol").click(function () {
                                    var t = w.getWinH(),
                                        e = x(".html5-nav").height();
                                    w.navvisible
                                        ? ((w.navvisible = !1),
                                            x(".html5-nav")
                                                .css({ top: t - e + "px", bottom: "auto" })
                                                .animate({ top: t + "px" }, function () {
                                                    x(this).css({ top: "100%", bottom: "auto" });
                                                }))
                                        : ((w.navvisible = !0),
                                            (e = x(".html5-nav").height()),
                                            x(".html5-nav")
                                                .css({ top: t + "px", bottom: "auto" })
                                                .animate({ top: t - e + "px" }, function () {
                                                    x(this).css({ top: "auto", bottom: 0 });
                                                })),
                                        w.resizeWindow();
                                }));
                        for (var n = 0, s = 0; s < w.elemArray.length; s++)
                            w.matchGroup(e, w.elemArray[s][3]) &&
                                w.elemArray[s][8] &&
                                0 < w.elemArray[s][8].length &&
                                (x(".html5-nav-list").append(
                                    "<div class='html5-nav-thumb' data-arrayindex='" +
                                    s +
                                    "' style='float:left;overflow:hidden;cursor:pointer;opacity:" +
                                    w.options.thumbopacity +
                                    ";margin: 0 " +
                                    w.options.thumbgap / 2 +
                                    "px;width:" +
                                    w.options.thumbwidth +
                                    "px;height:" +
                                    w.options.thumbheight +
                                    "px;border:" +
                                    w.options.thumbborder +
                                    "px solid " +
                                    w.options.thumbbordercolor +
                                    ";'></div>"
                                ),
                                    this.loadThumbnail(w.elemArray[s][8], n, w.elemArray[s][2]),
                                    n++);
                        x(".html5-nav-thumb").hover(
                            function () {
                                x(this).css({ opacity: 1 }),
                                    x(this).css({
                                        border:
                                            w.options.thumbborder +
                                            "px solid " +
                                            w.options.thumbhighlightbordercolor,
                                    });
                            },
                            function () {
                                x(this).css({ opacity: w.options.thumbopacity }),
                                    x(this).css({
                                        border:
                                            w.options.thumbborder +
                                            "px solid " +
                                            w.options.thumbbordercolor,
                                    });
                            }
                        ),
                            x(".html5-nav-thumb").click(function () {
                                var t = x(this).data("arrayindex");
                                0 <= t && w.gotoSlide(t);
                            }),
                            (w.options.totalwidth =
                                n *
                                (w.options.thumbgap +
                                    w.options.thumbwidth +
                                    2 * w.options.thumbborder)),
                            x(".html5-nav-list")
                                .css({
                                    display: "block",
                                    position: "relative",
                                    "margin-left": 0,
                                    width: w.options.totalwidth + "px",
                                })
                                .append("<div style='clear:both;'></div>");
                        var r = x(".html5-nav-mask"),
                            a = x(".html5-nav-prev"),
                            o = x(".html5-nav-next");
                        a.click(function () {
                            var t = x(".html5-nav-list"),
                                e = x(".html5-nav-next"),
                                i = x(window).width() - 2 * w.options.navbuttonwidth,
                                o = parseInt(t.css("margin-left")) + i;
                            0 <= o
                                ? ((o = 0),
                                    x(this).css({ "background-position": "center left" }))
                                : x(this).css({ "background-position": "center right" }),
                                o <= i - w.options.totalwidth
                                    ? e.css({ "background-position": "center left" })
                                    : e.css({ "background-position": "center right" }),
                                t.animate({ "margin-left": o });
                        }),
                            o.click(function () {
                                var t = x(".html5-nav-list"),
                                    e = x(".html5-nav-prev"),
                                    i = x(window).width() - 2 * w.options.navbuttonwidth,
                                    o = parseInt(t.css("margin-left")) - i;
                                o <= i - w.options.totalwidth
                                    ? ((o = i - w.options.totalwidth),
                                        x(this).css({ "background-position": "center left" }))
                                    : x(this).css({ "background-position": "center right" }),
                                    0 <= o
                                        ? e.css({ "background-position": "center left" })
                                        : e.css({ "background-position": "center right" }),
                                    t.animate({ "margin-left": o });
                            });
                        i = x(window).width();
                        w.options.totalwidth <= i
                            ? (r.css({ width: w.options.totalwidth + "px" }),
                                a.hide(),
                                o.hide())
                            : (r.css({ width: i - 2 * w.options.navbuttonwidth + "px" }),
                                a.show(),
                                o.show());
                    }
                }
            }),
            (w.loadElem = function (t) {
                var e;
                switch (
                ((w.currentElem = t),
                    (w.showing = !0),
                    w.options.bodynoscroll && x("html,body").addClass("bodynoscroll"),
                    (w.options.showtitle &&
                        w.currentElem[2] &&
                        0 < w.currentElem[2].length) ||
                    (w.options.showdescription &&
                        w.currentElem[9] &&
                        0 < w.currentElem[9].length) ||
                    (w.options.inGroup &&
                        (w.options.showplaybutton || w.options.showtitleprefix)) ||
                    (w.options.barheight = 0),
                    w.showNavigation(),
                    w.$elem.off("mouseenter").off("mouseleave").off("mousemove"),
                    w.$loading.show(),
                    w.options.onshowitem &&
                    window[w.options.onshowitem] &&
                    "function" == typeof window[w.options.onshowitem] &&
                    window[w.options.onshowitem](t),
                    ("slide" == w.options.transition ||
                        "crossfade" == w.options.transition) &&
                    0 <= w.existingElem &&
                    (x(".html5-elem-box-previous").remove(),
                        (e = w.$elem.clone()).insertAfter(w.$elem),
                        (w.$prevelem = w.$elem),
                        (w.$elem = e),
                        w.$prevelem.addClass("html5-elem-box-previous"),
                        w.$elem.addClass("html5-elem-box-current"),
                        (w.$elemWrap = x(".html5-elem-wrap", w.$elem)),
                        (w.$loading = x(".html5-loading", w.$elem)),
                        (w.$error = x(".html5-error-box", w.$elem)),
                        (w.$image = x(".html5-image", w.$elem)),
                        "outside" != w.options.titlestyle &&
                        ((w.$elemData = x(".html5-elem-data-box", w.$elem)),
                            (w.$text = x(".html5-text", w.$elem))),
                        w.$elem.css({
                            position: "absolute",
                            top: 0,
                            left:
                                "slide" == w.options.transition
                                    ? -1 == w.direction
                                        ? "100%"
                                        : "-100%"
                                    : 0,
                            opacity: 0,
                            height: "auto",
                        }),
                        w.$prevelem.css({
                            width: w.$prevelem.width() + "px",
                            height: w.$prevelem.height() + "px",
                        }),
                        "crossfade" == w.options.transition &&
                        w.$prevelem.css({
                            margin: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                        })),
                    t[0])
                ) {
                    case 0:
                        var i = new Image();
                        x(i).on("load", function () {
                            (t[11] = i.width),
                                (t[12] = i.height),
                                w.showImage(t, i.width, i.height);
                        }),
                            x(i).on("error", function () {
                                w.showError();
                            }),
                            (i.src = t[1]);
                        break;
                    case 1:
                        w.showSWF(t);
                        break;
                    case 2:
                    case 8:
                        w.showVideo(t);
                        break;
                    case 3:
                    case 4:
                    case 9:
                    case 11:
                    case 12:
                        w.showYoutubeVimeo(t);
                        break;
                    case 5:
                        w.showPDF(t);
                        break;
                    case 6:
                        w.showMP3(t);
                        break;
                    case 7:
                        w.showWeb(t, !1);
                        break;
                    case 10:
                        w.showDiv(t);
                }
                w.options.pushwindowhistory &&
                    window.history &&
                    window.history.pushState &&
                    ((e =
                        window.location.pathname +
                        window.location.search +
                        "#html5lightbox_" +
                        encodeURIComponent(t[1])),
                        window.history.pushState({}, "", e),
                        (window.onhashchange = function () {
                            (!window.location.hash ||
                                window.location.hash.indexOf("#html5lightbox_") < 0) &&
                                w.finish();
                        })),
                    w.options.googleanalyticsaccount &&
                    window._gaq &&
                    window._gaq.push(["_trackEvent", "Lightbox", "Open", t[1]]),
                    w.options.preload &&
                    (0 <= w.options.nextElem &&
                        0 == w.elemArray[w.options.nextElem][0] &&
                        (new Image().src = w.elemArray[w.options.nextElem][1]),
                        0 <= w.options.prevElem &&
                        0 == w.elemArray[w.options.prevElem][0] &&
                        (new Image().src = w.elemArray[w.options.prevElem][1]));
            }),
            (w.loadCurElem = function () {
                w.loadElem(w.elemArray[w.options.curElem]);
            }),
            (w.showError = function () {
                w.$loading.hide(),
                    w.resizeLightbox(
                        w.options.errorwidth,
                        w.options.errorheight,
                        !0,
                        function () {
                            w.$loading.hide(),
                                w.$error.show(),
                                w.$elem.fadeIn(w.options.fadespeed, function () {
                                    w.showData();
                                });
                        }
                    );
            }),
            (w.calcTextWidth = function (t) {
                return t - 36;
            }),
            (w.showTitle = function (t, e) {
                var i = "";
                w.options.showtitle && t && 0 < t.length && (i += t),
                    w.options.inGroup &&
                    (w.options.showtitleprefix &&
                        (i =
                            "<span class='html5-title-prefix'>" +
                            w.options.titleprefix
                                .replace("%NUM", w.options.groupIndex + 1)
                                .replace("%TOTAL", w.options.groupCount) +
                            "</span> <span class='html5-title-caption'>" +
                            i +
                            "</span>"),
                        w.options.showplaybutton &&
                        (i =
                            "<div class='html5-playpause' style='display:inline-block;cursor:pointer;vertical-align:middle;width:" +
                            w.options.playimagesize +
                            "px;height:" +
                            w.options.playimagesize +
                            "px;'><div class='html5-play' style='display:block;'><img alt='' src='" +
                            w.options.playimage +
                            "'></div><div class='html5-pause' style='display:none;'><img alt='' src='" +
                            w.options.pauseimage +
                            "'></div></div> " +
                            i)),
                    0 < i.length && (i = '<div class="html5-title">' + i + "</div>"),
                    w.options.showdescription &&
                    e &&
                    0 < e.length &&
                    (i += '<div class="html5-description">' + e + "</div>"),
                    w.$text.html(i),
                    w.options.inGroup &&
                    w.options.showplaybutton &&
                    (w.autosliding
                        ? (x(".html5-play", w.$lightbox).hide(),
                            x(".html5-pause", w.$lightbox).show())
                        : (x(".html5-play", w.$lightbox).show(),
                            x(".html5-pause", w.$lightbox).hide()),
                        x(".html5-play", w.$lightbox).click(function () {
                            x(".html5-play", w.$lightbox).hide(),
                                x(".html5-pause", w.$lightbox).show(),
                                w.slideTimeout &&
                                (w.slideTimeout.stop(),
                                    w.slideTimeout.start(),
                                    (w.autosliding = !0));
                        }),
                        x(".html5-pause", w.$lightbox).click(function () {
                            x(".html5-play", w.$lightbox).show(),
                                x(".html5-pause", w.$lightbox).hide(),
                                w.slideTimeout && (w.slideTimeout.stop(), (w.autosliding = !1));
                        })),
                    x("#html5-social", w.$lightbox).show(),
                    w.options.showsocialmedia &&
                    (w.currentElem[13]
                        ? 0 < x("#html5-socialmedia", w.$lightboxBox).length
                            ? x("#html5-socialmedia", w.$lightboxBox).html(
                                w.currentElem[13]
                            )
                            : w.$lightboxBox.append(
                                '<div id="html5-socialmedia" style="' +
                                w.options.socialmediaposition +
                                '">' +
                                w.currentElem[13] +
                                "</div>"
                            )
                        : 0 < x("#html5-socialmedia", w.$lightboxBox).length &&
                        x("#html5-socialmedia", w.$lightboxBox).remove());
            }),
            (w.getElemSize = function (t, e, i) {
                var o, n;
                t[17] || (t[17] = t[4]),
                    t[19] || (t[19] = t[17]),
                    t[18] || (t[18] = t[5]),
                    t[20] || (t[20] = t[18]);
                var s = 4,
                    r = 5,
                    a = x(window).width();
                return (
                    a < w.options.smallbreakpoint
                        ? ((s = 19), (r = 20))
                        : a < w.options.mediumbreakpoint && ((s = 17), (r = 18)),
                    0 == t[0]
                        ? (t[s]
                            ? (o = t[s])
                            : e
                                ? ((o = e), (t[s] = e))
                                : (o = w.options.defaultwidth),
                            t[r]
                                ? (n = t[r])
                                : i
                                    ? ((n = i), (t[r] = i))
                                    : (n = w.options.defaultheight))
                        : (n =
                            5 == t[0] || 7 == t[0] || 10 == t[0]
                                ? ((o = t[s]
                                    ? t[s]
                                    : w.options.usedefaultsizeforcontent ||
                                        w.options.usedefaultwidthforcontent
                                        ? w.options.defaultwidth
                                        : e),
                                    t[r]
                                        ? t[r]
                                        : w.options.usedefaultsizeforcontent ||
                                            w.options.usedefaultheightforcontent
                                            ? w.options.defaultheight
                                            : i)
                                : ((o = t[s] ? t[s] : w.options.defaultwidth),
                                    t[r] ? t[r] : w.options.defaultheight)),
                    { w: o, h: n }
                );
            }),
            (w.showImage = function (o, t, e) {
                e = w.getElemSize(o, t, e);
                w.showTitle(o[2], o[9]);
                e = w.calcElemSize(e, w.options.imagekeepratio);
                w.resizeLightbox(e.w, e.h, !0, function () {
                    w.$loading.hide();
                    var t =
                        w.options.showtimer && w.options.inGroup
                            ? "<div class='html5-timer' style='display:none;position:absolute;" +
                            w.options.timerposition +
                            ":0;left:0;width:0;height:" +
                            w.options.timerheight +
                            "px;background-color:" +
                            w.options.timercolor +
                            ";opacity:" +
                            w.options.timeropacity +
                            ";'></div>"
                            : "",
                        e =
                            o[16] && 0 < o[16].length
                                ? " title='" + o[16].replace(/'/g, "&#39;") + "'"
                                : "",
                        i = o[15] && 0 < o[15].length ? " target='" + o[15] + "'" : "",
                        e =
                            o[14] && 0 < o[14].length
                                ? "<a href='" + o[14] + "'" + e + i + ">"
                                : "",
                        i = o[14] && 0 < o[14].length ? "</a>" : "";
                    w.$image.hide(),
                        w.$image.html(
                            "<div class='html5-image-container' style='display:block;position:relative;width:100%;height:100%;" +
                            (w.options.imagekeepratio
                                ? "overflow:hidden;"
                                : "overflow:auto;") +
                            "'>" +
                            e +
                            "<img class='html5-image-img' alt='" +
                            w.html2Text(o[2]) +
                            "' src='" +
                            o[1] +
                            "' width='100%' height='auto' />" +
                            i +
                            t +
                            "</div>"
                        ),
                        w.$image.fadeIn(w.options.fadespeed),
                        w.showData(),
                        w.autosliding && (w.slideTimeout.stop(), w.slideTimeout.start());
                });
            }),
            (w.showSWF = function (t) {
                var e = w.getElemSize(t);
                w.showTitle(t[2], t[9]);
                var e = w.calcElemSize(e, !0),
                    i = e.w,
                    o = e.h;
                w.resizeLightbox(i, o, !0, function () {
                    w.$loading.hide(),
                        w.$image
                            .html(
                                "<div class='html5lightbox-swf' style='display:block;width:100%;height:100%;'></div>"
                            )
                            .show(),
                        w.embedFlash(x(".html5lightbox-swf", w.$image), t[1], "window", {
                            width: i,
                            height: o,
                        }),
                        w.$elem.show(),
                        w.showData(),
                        w.autosliding && (w.slideTimeout.stop(), w.slideTimeout.start());
                });
            }),
            (w.showVideo = function (i) {
                w.slideTimeout.stop(), w.showTitle(i[2], i[9]);
                var t = w.getElemSize(i),
                    t = w.calcElemSize(t, !0),
                    o = t.w,
                    n = t.h;
                w.resizeLightbox(
                    o,
                    n,
                    !0,
                    function () {
                        w.$loading.hide(),
                            w.$image
                                .html(
                                    "<div class='html5lightbox-video' style='display:block;width:100%;height:100%;overflow:hidden;background-color:" +
                                    w.options.videobgcolor +
                                    ";'></div>"
                                )
                                .show();
                        var t,
                            e = !1;
                        w.options.isIE678 ||
                            8 == i[0] ||
                            (w.options.isIE9 && w.options.useflashonie9) ||
                            (w.options.isIE10 && w.options.useflashonie10) ||
                            (w.options.isIE11 && w.options.useflashonie11)
                            ? (e = !1)
                            : w.options.isMobile
                                ? (e = !0)
                                : (!w.options.html5player && w.options.flashInstalled) ||
                                !w.options.html5VideoSupported ||
                                ((e = !0),
                                    (w.options.isFirefox || w.options.isOpera) &&
                                    (i[6] ||
                                        i[7] ||
                                        (w.options.canplaymp4 &&
                                            !w.options.useflashformp4onfirefox) ||
                                        (e = !1))),
                            e
                                ? ((t = i[1]),
                                    (w.options.isFirefox || w.options.isOpera) &&
                                    (i[6] ? (t = i[6]) : i[7] && (t = i[7])),
                                    w.embedHTML5Video(
                                        x(".html5lightbox-video", w.$image),
                                        t,
                                        w.options.autoplay,
                                        w.options.loopvideo,
                                        w.options.mutevideo,
                                        w.options.playsinline
                                    ),
                                    i[14] &&
                                    0 < i[14].length &&
                                    x(".html5-lightbox-video", w.$image)
                                        .css({ cursor: "pointer" })
                                        .click(function () {
                                            i[15] && 0 < i[15].length
                                                ? window.open(i[14], i[15])
                                                : window.open(i[14]);
                                        }))
                                : ("/" != (t = i[1]).charAt(0) &&
                                    "http:" != t.substring(0, 5) &&
                                    "https:" != t.substring(0, 6) &&
                                    (t = w.options.htmlfolder + t),
                                    w.embedFlash(
                                        x(".html5lightbox-video", w.$image),
                                        w.options.jsfolder + "html5boxplayer.swf",
                                        "transparent",
                                        {
                                            width: o,
                                            height: n,
                                            jsobjectname: "html5Lightbox",
                                            hidecontrols: w.options.videohidecontrols ? "1" : "0",
                                            hideplaybutton: "0",
                                            videofile: t,
                                            hdfile: "",
                                            ishd: "0",
                                            defaultvolume: w.options.defaultvideovolume,
                                            autoplay: w.options.autoplay ? "1" : "0",
                                            loop: w.options.loopvideo ? "1" : "0",
                                            errorcss: ".html5box-error" + w.options.errorcss,
                                            id: 0,
                                        }
                                    )),
                            w.$elem.show(),
                            w.showData();
                    },
                    w.options.isMobile && w.options.autoplayhtml5onmobile
                );
            }),
            (w.loadNext = function () {
                x(window).trigger("html5lightbox.videofinished"),
                    w.autosliding
                        ? w.gotoSlide(-1)
                        : w.options.autoclose &&
                        setTimeout(function () {
                            w.finish();
                        }, w.options.autoclosedelay);
            }),
            (w.getYoutubeParams = function (t) {
                var e = {};
                if (t.indexOf("?") < 0) return e;
                for (
                    var i = t.substring(t.indexOf("?") + 1).split("&"), o = 0;
                    o < i.length;
                    o++
                ) {
                    var n = i[o].split("=");
                    n &&
                        2 == n.length &&
                        "v" != n[0].toLowerCase() &&
                        (e[n[0].toLowerCase()] = n[1]);
                }
                return e;
            }),
            (w.getYoutubeId = function (t) {
                var e = "",
                    t = t.match(
                        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\??v?=?))([^#\&\?]*).*/
                    );
                return t && t[7] && 11 == t[7].length && (e = t[7]), e;
            }),
            (w.prepareYoutubeHref = function (t) {
                var e,
                    i = "https://www.youtube.com/embed/" + w.getYoutubeId(t),
                    o = this.getYoutubeParams(t),
                    n = !0;
                for (e in o)
                    n ? ((i += "?"), (n = !1)) : (i += "&"), (i += e + "=" + o[e]);
                return i;
            }),
            (w.prepareDailymotionHref = function (t) {
                return (
                    t.match(/\:\/\/.*(dai\.ly)/i) &&
                    (t =
                        "https://www.dailymotion.com/embed/video/" +
                        t.match(/(dai\.ly\/)([a-zA-Z0-9\-\_]+)/)[2]),
                    t
                );
            }),
            (w.showYoutubeVimeo = function (t) {
                w.slideTimeout.stop(), w.showTitle(t[2], t[9]);
                var e = w.getElemSize(t),
                    i = w.calcElemSize(e, !0),
                    o = i.w,
                    e = i.h;
                w.options.noresizecallback
                    ? (w.resizeLightbox(o, e, !0, function () {
                        w.showData();
                    }),
                        w.showYouTubeVimeoCallback(t, i))
                    : w.resizeLightbox(o, e, !0, function () {
                        w.showYouTubeVimeoCallback(t, i), w.showData();
                    });
            }),
            (w.showYouTubeVimeoCallback = function (t, e) {
                w.$loading.hide(),
                    w.$image
                        .html(
                            "<div class='html5lightbox-video' style='display:block;width:100%;height:100%;overflow:hidden;'></div>"
                        )
                        .show();
                var i = t[1],
                    o = "";
                if (
                    (3 == t[0] &&
                        ((o = w.getYoutubeId(i)), (i = w.prepareYoutubeHref(i))),
                        9 == t[0] && (i = w.prepareDailymotionHref(i)),
                        w.options.autoplay &&
                        ((i += i.indexOf("?") < 0 ? "?" : "&"),
                            11 == t[0] ? (i += "autoPlay=true") : (i += "autoplay=1")),
                        w.options.loopvideo)
                )
                    switch (((i += i.indexOf("?") < 0 ? "?" : "&"), t[0])) {
                        case 3:
                            i += "loop=1&playlist=" + o;
                            break;
                        case 4:
                        case 9:
                            i += "loop=1";
                            break;
                        case 11:
                            i += "endVideoBehavior=loop";
                    }
                3 == t[0]
                    ? (i.indexOf("?") < 0
                        ? (i += "?wmode=transparent&rel=0")
                        : (i += "&wmode=transparent&rel=0"),
                        w.options.videohidecontrols && (i += "&controls=0&showinfo=0"),
                        w.options.mutevideo && (i += "&mute=1"),
                        w.options.playsinline && (i += "&playsinline=1"),
                        (i +=
                            "&enablejsapi=1&origin=" +
                            document.location.protocol +
                            "//" +
                            document.location.hostname))
                    : 4 == t[0] &&
                    ((i += i.indexOf("?") < 0 ? "?" : "&"),
                        (i += "api=1&player_id=html5boxiframevideo" + w.options.curElem),
                        w.options.mutevideo && (i += "&muted=1"),
                        w.options.playsinline && (i += "&playsinline=1")),
                    x(".html5lightbox-video", w.$image).html(
                        "<iframe style='margin:0;padding:0;border:0;' class='html5boxiframevideo' id='html5boxiframevideo" +
                        w.options.curElem +
                        "' width='100%' height='100%' src='" +
                        i +
                        "' frameborder='0' allow='autoplay' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>"
                    ),
                    w.$elem.show(),
                    3 == t[0]
                        ? w.options.inityoutube &&
                        ((w.youtubeFinishCount = 0), w.initYoutubeFinishCallback())
                        : 4 == t[0] &&
                        w.options.initvimeo &&
                        ((w.vimeoFinishCount = 0), w.initVimeoFinishCallback());
            }),
            (w.initYoutubeFinishCallback = function () {
                "object" == typeof YT && "function" == typeof YT.Player
                    ? (w.ytplayer = new YT.Player(
                        "html5boxiframevideo" + w.options.curElem,
                        {
                            events: {
                                onStateChange: function (t) {
                                    t.data == YT.PlayerState.ENDED &&
                                        (x(window).trigger("html5lightbox.videofinished"),
                                            w.autosliding
                                                ? w.gotoSlide(-1)
                                                : w.options.autoclose &&
                                                setTimeout(function () {
                                                    w.finish();
                                                }, w.options.autoclosedelay));
                                },
                            },
                        }
                    ))
                    : setTimeout(function () {
                        w.youtubeFinishCount < 10 &&
                            (w.youtubeFinishCount++, w.initYoutubeFinishCallback());
                    }, 300);
            }),
            (w.initVimeoFinishCallback = function () {
                var t;
                "function" == typeof $f
                    ? ((t = x("#html5boxiframevideo" + w.options.curElem)[0]),
                        (w.vimeoPlayer = $f(t)),
                        w.vimeoPlayer.addEvent("ready", function () {
                            w.vimeoPlayer.addEvent("finish", function (t) {
                                x(window).trigger("html5lightbox.videofinished"),
                                    w.autosliding
                                        ? w.gotoSlide(-1)
                                        : w.options.autoclose &&
                                        setTimeout(function () {
                                            w.finish();
                                        }, w.options.autoclosedelay);
                            });
                        }))
                    : setTimeout(function () {
                        w.vimeoFinishCount < 10 &&
                            (w.vimeoFinishCount++, w.initVimeoFinishCallback());
                    }, 300);
            }),
            (w.showPDF = function (t) {
                if (w.options.enablepdfjs) {
                    if (
                        (w.options.isIPhone && w.options.openpdfinnewtaboniphone) ||
                        (w.options.isIPad && w.options.openpdfinnewtabonipad)
                    )
                        return window.open(t[1], "_blank").focus(), void w.finish();
                    w.options.pdfjsengine ||
                        (w.options.pdfjsengine =
                            w.options.jsfolder + "pdfjs/web/viewer.html"),
                        "http:" != (i = t[1]).substring(0, 5) &&
                        "https:" != i.substring(0, 6) &&
                        (i = w.absoluteUrl(i));
                    var e = i.indexOf("#"),
                        i =
                            0 < e
                                ? encodeURIComponent(i.substring(0, e)) + i.substring(e)
                                : encodeURIComponent(i),
                        e = jQuery.extend(!0, {}, t);
                    (e[1] =
                        w.options.pdfjsengine +
                        (w.options.pdfjsengine.indexOf("?") < 0 ? "?" : "&") +
                        "file=" +
                        i),
                        w.showWeb(e, !1);
                } else {
                    w.options.isIPhone || w.options.isIPad
                        ? w.showWeb(t, !0)
                        : w.options.isAndroid || w.options.isIE || w.options.isIE11
                            ? (window.open(t[1], "_blank").focus(), w.finish())
                            : w.showWeb(t, !1);
                }
            }),
            (w.showMP3 = function (t) { }),
            (w.showDiv = function (e) {
                w.showTitle(e[2], e[9]);
                var t = x(window).width(),
                    i = w.getWinH(),
                    o =
                        w.options.shownavigation && w.navvisible ? w.options.navheight : 0,
                    i = w.getElemSize(e, t, i - o),
                    o = w.calcElemSize(i, !1),
                    i = o.w,
                    o = o.h;
                w.resizeLightbox(i, o, !0, function () {
                    w.$loading.hide(),
                        w.$image
                            .html(
                                "<div class='html5lightbox-div' id='html5lightbox-div" +
                                w.options.curElem +
                                "' style='display:block;width:100%;height:" +
                                (w.options.autoresizecontent ? "auto" : "100%") +
                                ";" +
                                (w.options.isIOS
                                    ? "-webkit-overflow-scrolling:touch;overflow-y:scroll;"
                                    : "overflow:auto;") +
                                "'></div>"
                            )
                            .show();
                    var t = e[1];
                    0 < x(t).length
                        ? x(t)
                            .children()
                            .appendTo(x("#html5lightbox-div" + w.options.curElem, w.$image))
                        : x("#html5lightbox-div" + w.options.curElem, w.$image).html(
                            "<div class='html5-error'>The specified div ID does not exist.</div>"
                        ),
                        w.$elem.show(),
                        w.showData(),
                        w.options.autoresizecontent && w.resizeWindow(),
                        w.autosliding && (w.slideTimeout.stop(), w.slideTimeout.start());
                });
            }),
            (w.isSameDomain = function (t) {
                if ("http:" != t.substring(0, 5) && "https:" != t.substring(0, 6))
                    return !0;
                (e = document.createElement("a")).setAttribute("href", t);
                var t =
                    e.protocol == document.location.protocol &&
                    e.host == document.location.host &&
                    e.port == document.location.port,
                    e = null;
                return t;
            }),
            (w.showWeb = function (t, e) {
                w.showTitle(t[2], t[9]);
                var i = x(window).width(),
                    o = w.getWinH(),
                    n =
                        w.options.shownavigation && w.navvisible ? w.options.navheight : 0,
                    o = w.getElemSize(t, i, o - n),
                    n = w.calcElemSize(o, !1),
                    o = n.w,
                    n = n.h;
                w.resizeLightbox(o, n, !0, function () {
                    w.$image
                        .html(
                            "<div class='html5lightbox-web' style='display:block;width:100%;height:100%;" +
                            (w.options.isIOS
                                ? "-webkit-overflow-scrolling:touch;overflow-y:scroll;"
                                : "") +
                            "'></div>"
                        )
                        .show(),
                        e
                            ? (x(".html5lightbox-web", w.$image).html(
                                "<object data='" +
                                t[1] +
                                "' type='application/pdf' width='100%' height='100%'></object>"
                            ),
                                w.$loading.hide())
                            : x(".html5lightbox-web", w.$image).html(
                                "<iframe style='margin:0;padding:0;border:0;' class='html5lightbox-web-iframe' width='100%' height='100%' src='" +
                                t[1] +
                                "' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>"
                            ),
                        x(".html5lightbox-web-iframe", w.$image).on("load", function () {
                            w.$loading.hide();
                        }),
                        w.$elem.show(),
                        w.showData(),
                        w.options.autoresizecontent &&
                        w.isSameDomain(t[1]) &&
                        (x(".html5lightbox-web-iframe", w.$image).data("sameorigin", !0),
                            x(".html5lightbox-web-iframe", w.$image).on("load", function () {
                                x(this).data("sameoriginloaded", !0), w.resizeWindow();
                            })),
                        w.autosliding && (w.slideTimeout.stop(), w.slideTimeout.start());
                });
            }),
            (w.scrollBox = function () { }),
            (w.resizeWindow = function () {
                var t, e, i, o, n, s;
                w.currentElem &&
                    w.options.responsive &&
                    ((s = x(window).width()),
                        (n = w.getWinH()),
                        (w.options.showtitle &&
                            w.currentElem[2] &&
                            0 < w.currentElem[2].length) ||
                        (w.options.showdescription &&
                            w.currentElem[9] &&
                            0 < w.currentElem[9].length) ||
                        (w.options.inGroup &&
                            (w.options.showplaybutton || w.options.showtitleprefix)) ||
                        (w.options.barheight = 0),
                        (o =
                            5 == w.currentElem[0] ||
                                7 == w.currentElem[0] ||
                                10 == w.currentElem[0]
                                ? ((t =
                                    w.options.shownavigation && w.navvisible
                                        ? w.options.navheight
                                        : 0),
                                    (i = w.getElemSize(w.currentElem, s, n - t)),
                                    !1)
                                : ((i = w.getElemSize(w.currentElem)),
                                    0 != w.currentElem[0] || w.options.imagekeepratio)),
                        (n = w.calcElemSize(i, o)),
                        w.adjustLightboxPos(n.w, n.h),
                        w.adjustDataHeight(),
                        !w.options.autoresizecontent ||
                        (5 != w.currentElem[0] &&
                            7 != w.currentElem[0] &&
                            10 != w.currentElem[0]) ||
                        ((t = !1),
                            7 == w.currentElem[0] &&
                                0 < x(".html5lightbox-web-iframe", w.$lightbox).length &&
                                x(".html5lightbox-web-iframe", w.$lightbox).data("sameoriginloaded")
                                ? (e = x(".html5lightbox-web-iframe", w.$lightbox)[0]) &&
                                e.contentWindow &&
                                e.contentWindow.document &&
                                e.contentWindow.document.documentElement.offsetHeight &&
                                i.h > e.contentWindow.document.documentElement.offsetHeight &&
                                ((i.h = e.contentWindow.document.documentElement.offsetHeight),
                                    (t = !0))
                                : 10 == w.currentElem[0] &&
                                0 < x(".html5lightbox-div", w.$lightbox).length &&
                                ((e = x(".html5lightbox-div", w.$lightbox).height()),
                                    i.h > e && ((i.h = e), (t = !0))),
                            t && ((n = w.calcElemSize(i, o)), w.adjustLightboxPos(n.w, n.h))),
                        x(".html5-nav").length <= 0 ||
                        (x(".html5-nav-list").css({ "margin-left": 0 }),
                            (i = x(".html5-nav-mask")),
                            (o = x(".html5-nav-prev")),
                            (n = x(".html5-nav-next")),
                            (s = x(window).width()),
                            w.options.totalwidth <= s
                                ? (i.css({ width: w.options.totalwidth + "px" }),
                                    o.hide(),
                                    n.hide())
                                : (i.css({ width: s - 2 * w.options.navbuttonwidth + "px" }),
                                    o.show(),
                                    n.show())));
            }),
            (w.calcElemSize = function (t, e) {
                if (!w.options.responsive) return t;
                var i = x(window).width(),
                    o = (o = w.getWinH()) || x(document).height(),
                    n = String(t.w);
                "%" == n.charAt(n.length - 1) &&
                    (t.w = (i * parseFloat(n.substring(0, n.length - 1))) / 100);
                var s = String(t.h);
                "%" == s.charAt(s.length - 1) &&
                    (t.h = (o * parseFloat(s.substring(0, s.length - 1))) / 100);
                (n =
                    w.options.shownavigation && w.navvisible ? w.options.navheight : 0),
                    (s =
                        x(window).height() < w.options.smallscreenheight
                            ? w.options.bordertopmarginsmall
                            : w.options.bordertopmargin),
                    (n = o - n - 2 * w.options.bordersize - 2 * s);
                w.options.responsivebarheight &&
                    (o <= w.options.smallscreenheight
                        ? (w.options.barheight = w.options.barheightonsmallheight)
                        : (w.options.barheight = w.options.barheightoriginal)),
                    "bottom" == w.options.titlestyle
                        ? (n -= w.options.barheight)
                        : "outside" == w.options.titlestyle &&
                        (n -= w.$elemData.outerHeight());
                var r,
                    s = i - 2 * w.options.bordersize - 2 * w.options.bordermargin;
                return (
                    w.options.resizeleftright &&
                    ("left" == w.options.titlestyle ||
                        "right" == w.options.titlestyle) &&
                    i > w.options.sidetobottomscreenwidth &&
                    (s -= 2 * w.options.bordersize),
                    ((w.options.fullscreenmode &&
                        i > w.options.navarrowsbottomscreenwidth) ||
                        (w.options.isTouch &&
                            w.options.navarrowsalwaysshowontouch &&
                            i > w.options.navarrowsbottomscreenwidth)) &&
                    (s -= 64),
                    w.options.notkeepratioonsmallheight &&
                    o <= w.options.smallscreenheight &&
                    (e = !1),
                    e
                        ? ((o = 0 == w.currentElem[0] ? w.currentElem[11] : t.w),
                            (e = 0 == w.currentElem[0] ? w.currentElem[12] : t.h),
                            w.options.resizeleftright &&
                                ("left" == w.options.titlestyle ||
                                    "right" == w.options.titlestyle) &&
                                i > w.options.sidetobottomscreenwidth
                                ? ((r = o / e),
                                    (t.h = Math.round(t.w / r)),
                                    t.h > n && ((t.w = Math.round(r * n)), (t.h = n)),
                                    (100 * (t.w + 2 * w.options.bordersize)) /
                                    w.options.imagepercentage >
                                    s &&
                                    ((t.w =
                                        (s * w.options.imagepercentage) / 100 -
                                        2 * w.options.bordersize),
                                        (t.h = Math.round(t.w / r))),
                                    (t.w =
                                        (100 * (t.w + 2 * w.options.bordersize)) /
                                        w.options.imagepercentage -
                                        2 * w.options.bordersize))
                                : ((r = o / e),
                                    (t.h = Math.round(t.w / r)),
                                    t.h > n && ((t.w = Math.round(r * n)), (t.h = n)),
                                    t.w > s && ((t.h = Math.round(s / r)), (t.w = s))))
                        : (w.options.resizeleftright &&
                            ("left" == w.options.titlestyle ||
                                "right" == w.options.titlestyle) &&
                            i > w.options.sidetobottomscreenwidth &&
                            (t.w = (100 * t.w) / w.options.imagepercentage),
                            (t.h > n || w.options.maxheight) && (t.h = n),
                            t.w > s && (t.w = s)),
                    t
                );
            }),
            (w.adjustDataHeight = function () {
                var t,
                    e,
                    i = x(window).width(),
                    o = w.getWinH(),
                    n =
                        "bottom" == w.options.titlestyle ||
                        "outside" == w.options.titlestyle ||
                        (("left" == w.options.titlestyle ||
                            "right" == w.options.titlestyle) &&
                            i <= w.options.sidetobottomscreenwidth);
                w.options.responsivebarheight &&
                    (o <= w.options.smallscreenheight
                        ? (w.options.barheight = w.options.barheightonsmallheight)
                        : (w.options.barheight = w.options.barheightoriginal)),
                    n
                        ? ((e =
                            x(window).height() < w.options.smallscreenheight
                                ? w.options.bordertopmarginsmall
                                : w.options.bordertopmargin),
                            (t =
                                w.options.shownavigation && w.navvisible
                                    ? w.options.navheight
                                    : 0),
                            (i = (o = w.getWinH()) - e - t),
                            (n = w.options.barautoheight
                                ? w.$elemData.outerHeight()
                                : w.options.barheight),
                            (n = w.$elemWrap.outerHeight() + n),
                            (n = (o - t - (i = Math.min(i, n))) / 2),
                            w.$elem.css({ "max-height": i + "px" }),
                            n <
                            (e =
                                x(window).height() < w.options.smallscreenheight
                                    ? w.options.bordertopmarginsmall
                                    : w.options.bordertopmargin) && (n = e),
                            w.options.insideiframe &&
                            window.self != window.top &&
                            ((n =
                                0 < w.options.iframetopmargin
                                    ? w.options.iframetopmargin
                                    : e),
                                w.options.iframesamedomain &&
                                parent.window.jQuery &&
                                parent.window.jQuery("#" + w.options.iframeid).length &&
                                (n +=
                                    (i = parent.window
                                        .jQuery("#" + w.options.iframeid)
                                        .offset().top) <
                                        (e = parent.window.document.body.scrollTop)
                                        ? e - i
                                        : 0)),
                            w.$lightboxBox.css({ "margin-top": n + "px" }))
                        : w.$elem.css({ "max-height": "none" }),
                    ("bottom" != w.options.titlestyle &&
                        "inside" != w.options.titlestyle) ||
                    w.$lightboxBox.css({ height: "auto" }),
                    w.options.positionFixed
                        ? x("#html5-lightbox-overlay", w.$lightbox).css({
                            height: Math.max(x(window).height(), x(document).height()),
                        })
                        : x("#html5-lightbox-overlay", w.$lightbox).css({ height: "100%" });
            }),
            (w.showData = function () {
                0 < w.$text.text().length && w.$elemData.show(),
                    w.adjustDataHeight(),
                    x(window).trigger("html5lightbox.lightboxopened");
            }),
            (w.resizeLightbox = function (t, e, i, o, n) {
                w.hideNavArrows();
                var s = w.calcBoxPosition(t, e),
                    t = s[0],
                    e = s[1],
                    s = s[2];
                w.$loading.hide(),
                    w.$watermark.hide(),
                    w.options.nextElem <= w.options.curElem &&
                    w.options.onlastitem &&
                    window[w.options.onlastitem] &&
                    "function" == typeof window[w.options.onlastitem] &&
                    window[w.options.onlastitem](w.currentElem),
                    w.options.prevElem >= w.options.curElem &&
                    w.options.onfirstitem &&
                    window[w.options.onfirstitem] &&
                    "function" == typeof window[w.options.onfirstitem] &&
                    window[w.options.onfirstitem](w.currentElem),
                    w.options.fullscreenmode ||
                    "side" == w.options.navarrowspos ||
                    "browserside" == w.options.navarrowspos ||
                    (w.options.isTouch && w.options.navarrowsalwaysshowontouch) ||
                    w.options.alwaysshownavarrows ||
                    (w.$lightboxBox.on("mouseenter mousemove", function () {
                        ((w.options.arrowloop && 0 <= w.options.prevElem) ||
                            (!w.options.arrowloop &&
                                0 <= w.options.prevElem &&
                                w.options.prevElem < w.options.curElem)) &&
                            w.$prev.fadeIn(),
                            ((w.options.arrowloop && 0 <= w.options.nextElem) ||
                                (!w.options.arrowloop &&
                                    0 <= w.options.nextElem &&
                                    w.options.nextElem > w.options.curElem)) &&
                            w.$next.fadeIn();
                    }),
                        w.$lightboxBox.on("mouseleave", function () {
                            w.$next.fadeOut(), w.$prev.fadeOut();
                        }));
                parseInt(w.$lightboxBox.css("margin-top"));
                w.$lightboxBox.css({ "margin-top": s }), w.resizePositionFixed();
                i = i ? w.options.resizespeed : 0;
                w.options.fullscreenmode && w.options.fullscreennotransition && (i = 0),
                    ("slide" == w.options.transition ||
                        "crossfade" == w.options.transition) &&
                    0 <= w.existingElem &&
                    (i = 0),
                    void 0 !== n && n && (i = 0),
                    w.options.enteranimation &&
                    ((i = 0),
                        w.$lightboxBox.hasClass("html5box-enter-animated") ||
                        (w.$lightboxBox.one(
                            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                            function () {
                                w.$lightboxBox.removeClass(
                                    "html5box-" + w.options.enteranimation
                                );
                            }
                        ),
                            w.$lightboxBox.addClass(
                                "html5box-enter-animated html5box-" + w.options.enteranimation
                            )));
                n = x(window).width();
                ("left" == w.options.titlestyle || "right" == w.options.titlestyle) &&
                    n > w.options.sidetobottomscreenwidth
                    ? (t == w.$lightboxBox.width() &&
                        e == w.$lightboxBox.height() &&
                        (i = 0),
                        w.$lightboxBox
                            .animate({ width: t }, i)
                            .animate({ height: e }, i, function () {
                                w.onAnimateFinish(o);
                            }))
                    : (t == w.$elemWrap.width() && e == w.$elemWrap.height() && (i = 0),
                        w.$lightboxBox.css({ width: t, height: "auto" }),
                        w.$elemWrap
                            .animate({ width: t }, i)
                            .animate({ height: e }, i, function () {
                                w.onAnimateFinish(o);
                            }));
            }),
            (w.onAnimateFinish = function (t) {
                w.$loading.show(),
                    w.$watermark.show(),
                    w.$close.show(),
                    w.$elem.css({ "background-color": w.options.bgcolor }),
                    w.resizePositionFixed(),
                    t(),
                    w.finishCallback(),
                    x(window).trigger("html5lightbox.lightboxshowend");
            }),
            (w.finishCallback = function () {
                ("slide" == w.options.transition ||
                    "crossfade" == w.options.transition) &&
                    0 <= w.existingElem &&
                    ("slide" == w.options.transition
                        ? (w.$prevelem.animate(
                            { left: -1 == w.direction ? "-100%" : "100%", opacity: 0 },
                            { duration: w.options.transitionduration }
                        ),
                            w.$elem.animate(
                                { left: 0, opacity: 1 },
                                {
                                    duration: w.options.transitionduration,
                                    always: function () {
                                        w.$prevelem.remove(),
                                            w.$elem
                                                .removeClass("html5-elem-box-current")
                                                .css({ position: "relative", height: "100%" });
                                    },
                                }
                            ))
                        : (w.$prevelem.animate(
                            { opacity: 0 },
                            { duration: w.options.transitionduration }
                        ),
                            w.$elem.animate(
                                { opacity: 1 },
                                {
                                    duration: w.options.transitionduration,
                                    always: function () {
                                        w.$prevelem.remove(),
                                            w.$elem
                                                .removeClass("html5-elem-box-current")
                                                .css({ position: "relative", height: "100%" });
                                    },
                                }
                            )));
            }),
            (w.resetDiv = function (t) {
                var e;
                0 < w.elemArray.length &&
                    0 <= t &&
                    10 == w.elemArray[t][0] &&
                    ((e = w.elemArray[t][1]),
                        0 < x(e).length &&
                        x("#html5lightbox-div" + t)
                            .children()
                            .appendTo(x(e)));
            }),
            (w.reset = function () {
                w.options.stamp && w.$watermark.hide(),
                    (w.showing = !1),
                    w.$image.empty(),
                    w.$text.empty(),
                    w.$error.hide(),
                    w.$loading.hide(),
                    w.$image.hide(),
                    ("bottom" != w.options.titlestyle &&
                        "inside" != w.options.titlestyle) ||
                    w.$elemData.hide(),
                    w.options.fullscreenmode || w.$close.hide(),
                    w.$elem.css({ "background-color": "" });
            }),
            (w.resetNavigation = function () {
                (w.options.navheight = 0),
                    x(".html5-nav").remove(),
                    (w.navvisible = !1);
            }),
            (w.finish = function () {
                0 < x(".html5-nav").length &&
                    x(".html5-nav").addClass("html5box-animated html5box-fadeOutDown"),
                    w.options.enteranimation &&
                    w.$lightboxBox.removeClass(
                        "html5box-enter-animated html5box-" + w.options.enteranimation
                    ),
                    "fadeOut" == w.options.exitanimation ||
                        "fadeOutDown" == w.options.exitanimation
                        ? (w.$lightbox.one(
                            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                            function () {
                                w.$lightboxBox.removeClass(
                                    "html5box-animated html5box-" + w.options.exitanimation
                                ),
                                    w.$lightbox.removeClass(
                                        "html5box-animated html5box-fadeOut"
                                    ),
                                    w.finishDone();
                            }
                        ),
                            w.$lightbox.addClass("html5box-animated html5box-fadeOut"),
                            w.$lightboxBox.addClass(
                                "html5box-animated html5box-" + w.options.exitanimation
                            ))
                        : w.finishDone();
            }),
            (w.finishDone = function () {
                (w.existingElem = -1),
                    w.resetDiv(w.options.curElem),
                    x(".html5-lightbox-video", w.$lightbox).length &&
                    x(".html5-lightbox-video", w.$lightbox).attr("src", ""),
                    x("head")
                        .find("style")
                        .each(function () {
                            "html5box-html5-lightbox" == x(this).data("creator") &&
                                x(this).remove();
                        }),
                    w.options.bodynoscroll && x("html,body").removeClass("bodynoscroll"),
                    w.slideTimeout.stop(),
                    w.reset(),
                    w.resetNavigation(),
                    w.$lightbox.remove(),
                    x("#html5box-html5-lightbox").remove(),
                    w.showObjects(),
                    w.options.oncloselightbox &&
                    window[w.options.oncloselightbox] &&
                    "function" == typeof window[w.options.oncloselightbox] &&
                    window[w.options.oncloselightbox](w.currentElem),
                    w.onLightboxClosed &&
                    "function" == typeof w.onLightboxClosed &&
                    w.onLightboxClosed(w.currentElem),
                    x(window).trigger("html5lightbox.lightboxclosed");
            }),
            (w.pauseSlide = function () { }),
            (w.playSlide = function () { }),
            (w.gotoSlide = function (t) {
                if (
                    ((w.existingElem = w.options.curElem),
                        (w.direction = t),
                        w.resetDiv(w.options.curElem),
                        -1 == t)
                ) {
                    if (w.options.nextElem < 0) return;
                    w.options.curElem = w.options.nextElem;
                } else if (-2 == t) {
                    if (w.options.prevElem < 0) return;
                    w.options.curElem = w.options.prevElem;
                } else
                    0 <= t &&
                        ((w.direction = t > w.options.curElem ? -1 : -2),
                            (w.options.curElem = t));
                w.autosliding && w.slideTimeout.stop(),
                    w.calcNextPrevElem(),
                    "slide" != w.options.transition &&
                    "crossfade" != w.options.transition &&
                    w.reset(),
                    w.loadCurElem(),
                    "inside" == w.options.titlestyle &&
                    w.options.showonmouseoverinside &&
                    0 !== w.currentElem[0] &&
                    w.options.showinsidetitleforimageonly &&
                    w.$elemData.css({ opacity: 0 });
            }),
            (w.enableSwipe = function () {
                var t = !(
                    !w.options.isAndroid ||
                    !(
                        w.options.swipepreventdefaultonandroid ||
                        (0 <= w.options.androidVersion && w.options.androidVersion <= 5)
                    )
                );
                w.$lightboxBox.html5lightboxTouchSwipe({
                    preventWebBrowser: t,
                    swipeDistance: w.options.swipedistance,
                    swipeLeft: function () {
                        w.options.inGroup && w.gotoSlide(-1);
                    },
                    swipeRight: function () {
                        w.options.inGroup && w.gotoSlide(-2);
                    },
                });
            }),
            (w.hideObjects = function () {
                x("embed, object").css({ visibility: "hidden" });
            }),
            (w.showObjects = function () {
                x("embed, object").css({ visibility: "visible" });
            }),
            (w.embedHTML5Video = function (t, e, i, o, n, s) {
                t.html(
                    "<div style='display:block;width:100%;height:100%;position:relative;'><video class='html5-lightbox-video' width='100%' height='100%'" +
                    (w.options.html5videoposter && 0 < w.options.html5videoposter.length
                        ? "poster='" + w.options.html5videoposter + "'"
                        : "") +
                    (i ? " autoplay" : "") +
                    (o ? " loop" : "") +
                    (n ? " muted" : "") +
                    (s ? " playsinline" : "") +
                    (w.options.nativehtml5controls && !w.options.videohidecontrols
                        ? " controls='controls'"
                        : "") +
                    (w.options.nativecontrolsnodownload
                        ? ' controlsList="nodownload"'
                        : "") +
                    " src='" +
                    e +
                    "'>" +
                    (w.options.showsubtitle && w.options.vtturl
                        ? '<track default src="' +
                        w.options.vtturl +
                        '" kind="subtitles" srclang="' +
                        w.options.vttlang +
                        '" label="' +
                        w.options.vttlabel +
                        '">'
                        : "") +
                    "</video></div>"
                ),
                    n && (w.options.defaultvideovolume = 0),
                    w.options.nativehtml5controls ||
                    w.options.videohidecontrols ||
                    (x("video", t).data("src", e),
                        x("video", t).lightboxHTML5VideoControls(
                            w.options.skinsfolder,
                            w,
                            ".html5-lightbox-video",
                            w.options.videohidecontrols,
                            !1,
                            w.options.defaultvideovolume,
                            w.options.nativecontrolsonfullscreen,
                            w.options.nativecontrolsnodownload,
                            null,
                            w.options.showsubtitle,
                            w.options.vttline,
                            w.options.showsubtitlebydefault
                        )),
                    x("video", t)
                        .off("ended")
                        .on("ended", function () {
                            x(window).trigger("html5lightbox.videofinished"),
                                w.autosliding
                                    ? w.gotoSlide(-1)
                                    : w.options.autoclose &&
                                    setTimeout(function () {
                                        w.finish();
                                    }, w.options.autoclosedelay);
                        });
            }),
            (w.embedFlash = function (t, e, i, o) {
                if (w.options.flashInstalled) {
                    var n = {
                        pluginspage: "http://www.adobe.com/go/getflashplayer",
                        quality: "high",
                        allowFullScreen: "true",
                        allowScriptAccess: "always",
                        type: "application/x-shockwave-flash",
                        width: "100%",
                        height: "100%",
                    };
                    (n.src = e), (n.flashVars = x.param(o)), (n.wmode = i);
                    var s,
                        r = "";
                    for (s in n) r += s + "=" + n[s] + " ";
                    t.html("<embed " + r + "/>");
                } else
                    t.html(
                        "<div class='html5lightbox-flash-error' style='display:block; position:relative;text-align:center; width:100%; left:0px; top:40%;'><div class='html5-error'><div>The required Adobe Flash Player plugin is not installed</div><br /><div style='display:block;position:relative;text-align:center;width:112px;height:33px;margin:0px auto;'><a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' width='112' height='33'></img></a></div></div>"
                    );
            }),
            (w.checkType = function (t) {
                return t
                    ? t.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i)
                        ? 0
                        : t.match(/[^\.]\.(swf)\s*$/i)
                            ? 1
                            : t.match(/\.(mp4|m4v|ogv|ogg|webm)(.*)?$/i)
                                ? 2
                                : t.match(/\:\/\/.*(youtube\.com)/i) ||
                                    t.match(/\:\/\/.*(youtu\.be)/i)
                                    ? 3
                                    : t.match(/\:\/\/.*(vimeo\.com)/i)
                                        ? 4
                                        : t.match(/\:\/\/.*(dailymotion\.com)/i) ||
                                            t.match(/\:\/\/.*(dai\.ly)/i)
                                            ? 9
                                            : t.match(/[^\.]\.(pdf)/i)
                                                ? 5
                                                : t.match(/[^\.]\.(mp3)\s*$/i)
                                                    ? 6
                                                    : t.match(/[^\.]\.(flv)\s*$/i)
                                                        ? 8
                                                        : t.match(/\#\w+/i)
                                                            ? 10
                                                            : t.match(/\:\/\/.*(wistia)/i)
                                                                ? 11
                                                                : 7
                    : -1;
            }),
            (w.getURLParams = function () {
                for (
                    var t = {}, e = window.location.search.substring(1).split("&"), i = 0;
                    i < e.length;
                    i++
                ) {
                    var o = e[i].split("=");
                    o && 2 == o.length && (t[o[0].toLowerCase()] = unescape(o[1]));
                }
                return t;
            }),
            (w.absoluteUrl = function (t) {
                var e = document.createElement("a");
                return (
                    (e.href = t),
                    e.protocol + "//" + e.host + e.pathname + e.search + e.hash
                );
            }),
            (w.showLightboxObject = function (t) {
                t &&
                    w.showLightbox(
                        t.type,
                        t.href,
                        t.title,
                        t.width,
                        t.height,
                        t.webm,
                        t.ogg,
                        t.thumbnail,
                        t.description,
                        t.div,
                        t.originalwidth,
                        t.originalheight,
                        t.socialmedia,
                        t.weblink,
                        t.weblinktarget,
                        t.weblinktext,
                        t.group,
                        t.mediumwidth,
                        t.mediumheight,
                        t.smallwidth,
                        t.smallheight
                    );
            }),
            (w.showLightbox = function (
                t,
                e,
                i,
                o,
                n,
                s,
                r,
                a,
                l,
                h,
                c,
                u,
                p,
                d,
                f,
                m,
                g,
                v,
                y,
                _,
                b
            ) {
                (w.options = x.extend(w.options, w.defaultoptions)),
                    x(window).trigger("html5lightbox.lightboxshow"),
                    w.init(),
                    w.reset(),
                    w.$lightbox.show(),
                    w.adjustLightboxPos(w.options.loadingwidth, w.options.loadingheight),
                    w.loadElem(
                        new Array(
                            t,
                            e,
                            i,
                            g,
                            o,
                            n,
                            s,
                            r,
                            a,
                            l,
                            h,
                            c,
                            u,
                            p,
                            d,
                            f,
                            m,
                            v,
                            y,
                            _,
                            b
                        )
                    );
            }),
            (w.addItemNoDuplicate = function (
                t,
                e,
                i,
                o,
                n,
                s,
                r,
                a,
                l,
                h,
                c,
                u,
                p,
                d
            ) {
                for (var f = 0; f < w.elemArray.length; f++)
                    if (w.elemArray[f][1] == t) return;
                w.addItem(t, e, i, o, n, s, r, a, l, h, c, u, p, d);
            }),
            (w.addItem = function (t, e, i, o, n, s, r, a, l, h, c, u, p, d) {
                (type = h && 0 <= h ? h : w.checkType(t)),
                    w.elemArray.push(
                        new Array(
                            type,
                            t,
                            e,
                            i,
                            o,
                            n,
                            s,
                            r,
                            a,
                            l,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            c,
                            u,
                            p,
                            d
                        )
                    );
            }),
            (w.showItem = function (t) {
                if (
                    ((w.options = x.extend(w.options, w.defaultoptions)),
                        x(window).trigger("html5lightbox.lightboxshow"),
                        w.init(),
                        w.elemArray.length <= 0)
                )
                    return !0;
                w.hideObjects();
                for (var e = 0; e < w.elemArray.length && w.elemArray[e][1] != t; e++);
                return (
                    e == w.elemArray.length ||
                    ((w.options.curElem = e),
                        w.calcNextPrevElem(),
                        w.reset(),
                        w.$lightbox.show(),
                        w.adjustLightboxPos(w.options.loadingwidth, w.options.loadingheight),
                        w.loadCurElem(),
                        !1)
                );
            }),
            w.each(function () {
                var t = x(this),
                    e = this.nodeName.toLowerCase();
                "a" == e || "area" == e
                    ? t.off("click").click(w.clickHandler)
                    : t.find("a,area").each(function () {
                        x(this).off("click").click(w.clickHandler);
                    });
                var i = !1,
                    o = 0,
                    n = !1,
                    s = 0;
                "undefined" != typeof html5lightbox_options &&
                    html5lightbox_options &&
                    ("autoopen" in html5lightbox_options &&
                        (i = html5lightbox_options.autoopen),
                        "autoopendelay" in html5lightbox_options &&
                        (o = html5lightbox_options.autoopendelay),
                        "autoopenonce" in html5lightbox_options &&
                        (n = html5lightbox_options.autoopenonce),
                        "autoopenonceexpire" in html5lightbox_options &&
                        (s = html5lightbox_options.autoopenonceexpire)),
                    (i = t.data("autoopen") ? t.data("autoopen") : i),
                    (o = t.data("autoopendelay") ? t.data("autoopendelay") : o),
                    (n = t.data("autoopenonce") ? t.data("autoopenonce") : n),
                    (s = t.data("autoopenonceexpire") ? t.data("autoopenonceexpire") : s);
                e = w.readClassOptions(t);
                if (
                    (e &&
                        ("autoopen" in e && (i = e.autoopen),
                            "autoopendelay" in e && (o = e.autoopendelay),
                            "autoopenonce" in e && (n = e.autoopenonce),
                            "autoopenonceexpire" in e && (s = e.autoopenonceexpire)),
                        (autocookie = "html5lightboxpopup=1;path=/"),
                        0 < s &&
                        ((e = new Date()).setTime(e.getTime() + 60 * s * 60 * 1e3),
                            (autocookie += ";expires=" + e.toUTCString())),
                        i)
                ) {
                    var r = !1;
                    if (n) {
                        var a,
                            l = document.cookie ? document.cookie.split(";") : [];
                        for (a in l) {
                            var h = x.trim(l[a]).split("=");
                            if (h.length && "html5lightboxpopup" == h[0]) {
                                r = !0;
                                break;
                            }
                        }
                    }
                    if (!r)
                        return (
                            setTimeout(function () {
                                t.click(), (document.cookie = autocookie);
                            }, o),
                            !1
                        );
                }
                t.data("preloadonpageload") &&
                    0 ==
                    ("mediatype" in t.data()
                        ? t.data("mediatype")
                        : w.checkType(t.attr("href"))) &&
                    ((o = t.data("preloaddelay") ? t.data("preloaddelay") : 0),
                        setTimeout(function () {
                            new Image().src = t.attr("href");
                        }, o));
            });
        var h = w.getURLParams();
        return (
            "html5lightboxshare" in h &&
            ((h = decodeURIComponent(h.html5lightboxshare)),
                0 < (h = x('.html5lightbox[href="' + h + '"]')).length && h.click()),
            w.options.preloadallonpageload &&
            setTimeout(function () {
                w.each(function () {
                    ("a" != this.nodeName.toLowerCase() &&
                        "area" != this.nodeName.toLowerCase()) ||
                        (0 ===
                            ("mediatype" in x(this).data()
                                ? x(this).data("mediatype")
                                : w.checkType(x(this).attr("href"))) &&
                            ((new Image().src = x(this).attr("href")),
                                x(this).data("thumbnail") &&
                                (new Image().src = x(this).data("thumbnail"))));
                });
            }, w.options.preloadalldelay),
            w
        );
    }),
        ((e = jQuery).fn.html5lightboxTouchSwipe = function (t) {
            var a = {
                preventWebBrowser: !1,
                swipeDistance: 0,
                swipeLeft: null,
                swipeRight: null,
                swipeTop: null,
                swipeBottom: null,
            };
            return (
                t && e.extend(a, t),
                this.each(function () {
                    var i = -1,
                        o = -1,
                        n = -1,
                        s = -1;
                    function r(t) {
                        s = n = o = i = -1;
                    }
                    try {
                        e(this).on("touchstart", function (t) {
                            var e = t.originalEvent;
                            1 <= e.targetTouches.length
                                ? ((i = e.targetTouches[0].pageX),
                                    (o = e.targetTouches[0].pageY))
                                : r();
                        }),
                            e(this).on("touchmove", function (t) {
                                a.preventWebBrowser && t.preventDefault();
                                var e = t.originalEvent;
                                1 <= e.targetTouches.length
                                    ? ((n = e.targetTouches[0].pageX),
                                        (s = e.targetTouches[0].pageY))
                                    : r();
                            }),
                            e(this).on("touchend", function (t) {
                                (0 < n || 0 < s) &&
                                    (Math.abs(n - i) > Math.abs(s - o)
                                        ? Math.abs(n - i) > a.swipeDistance &&
                                        (i < n
                                            ? a.swipeRight && a.swipeRight.call()
                                            : a.swipeLeft && a.swipeLeft.call())
                                        : Math.abs(s - o) > a.swipeDistance &&
                                        (o < s
                                            ? a.swipeBottom && a.swipeBottom.call()
                                            : a.swipeTop && a.swipeTop.call())),
                                    r();
                            }),
                            e(this).on("touchcancel", r);
                    } catch (t) { }
                })
            );
        }),
        ((Y = jQuery).fn.lightboxHTML5VideoControls = function (
            t,
            e,
            i,
            o,
            n,
            s,
            r,
            a,
            l,
            h,
            c,
            u
        ) {
            var p = "ontouchstart" in window,
                d = p ? "touchstart" : "mousedown",
                f = p ? "touchmove" : "mousemove",
                m = p ? "touchcancel" : "mouseup",
                g = "click",
                v = p ? 48 : 36,
                y = null,
                _ = null,
                b = !1,
                w = !0,
                x = Y(this).data("ishd"),
                T = Y(this).data("hd"),
                k = Y(this).data("src"),
                S = Y(this);
            S.get(0).removeAttribute("controls");
            var C = Y("<div class='html5boxVideoPlay'></div>");
            S.after(C);
            l =
                l && "playbutton" in l && 0 < l.playbutton.length
                    ? l.playbutton
                    : t + "html5boxplayer_playvideo.png";
            C.css({
                position: "absolute",
                top: "50%",
                left: "50%",
                display: "block",
                cursor: "pointer",
                width: 64,
                height: 64,
                "margin-left": -32,
                "margin-top": -32,
                "background-image": "url('" + l + "')",
                "background-position": "center center",
                "background-repeat": "no-repeat",
            }).on(g, function () {
                S.get(0).play();
            });
            var E = Y("<div class='html5boxVideoFullscreenBg'></div>"),
                A = Y(
                    "<div class='html5boxVideoControls'><div class='html5boxVideoControlsBg'></div><div class='html5boxPlayPause'><div class='html5boxPlay'></div><div class='html5boxPause'></div></div><div class='html5boxTimeCurrent'>--:--</div><div class='html5boxFullscreen'></div><div class='html5boxCaption'></div><div class='html5boxHD'></div><div class='html5boxVolume'><div class='html5boxVolumeButton'></div><div class='html5boxVolumeBar'><div class='html5boxVolumeBarBg'><div class='html5boxVolumeBarActive'></div></div></div></div><div class='html5boxTimeTotal'>--:--</div><div class='html5boxSeeker'><div class='html5boxSeekerBuffer'></div><div class='html5boxSeekerPlay'></div><div class='html5boxSeekerHandler'></div></div><div style='clear:both;'></div></div>"
                );
            S.after(A),
                S.after(E),
                E.css({
                    display: "none",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                }),
                A.css({
                    display: "block",
                    position: "absolute",
                    width: "100%",
                    height: v,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    margin: "0 auto",
                });
            function P() {
                w = !0;
            }
            S.on("touch click mousemove mouseenter", function () {
                w = !0;
            }),
                o ||
                setInterval(function () {
                    w &&
                        (A.show(),
                            (w = !1),
                            clearTimeout(y),
                            (y = setTimeout(function () {
                                S.get(0).paused || A.fadeOut();
                            }, 5e3)));
                }, 250),
                Y(".html5boxVideoControlsBg", A).css({
                    display: "block",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    "background-color": "#000000",
                    opacity: 0.7,
                    filter: "alpha(opacity=70)",
                }),
                Y(".html5boxPlayPause", A).css({
                    display: "block",
                    position: "relative",
                    width: "32px",
                    height: "32px",
                    margin: Math.floor((v - 32) / 2),
                    float: "left",
                });
            var O = Y(".html5boxPlay", A),
                D = Y(".html5boxPause", A);
            O.css({
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
                width: "32px",
                height: "32px",
                cursor: "pointer",
                "background-image": "url('" + t + "html5boxplayer_playpause.png')",
                "background-position": "top left",
            })
                .hover(
                    function () {
                        Y(this).css({ "background-position": "bottom left" });
                    },
                    function () {
                        Y(this).css({ "background-position": "top left" });
                    }
                )
                .on(g, function () {
                    S.get(0).play();
                }),
                D.css({
                    display: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                    "background-image": "url('" + t + "html5boxplayer_playpause.png')",
                    "background-position": "top right",
                })
                    .hover(
                        function () {
                            Y(this).css({ "background-position": "bottom right" });
                        },
                        function () {
                            Y(this).css({ "background-position": "top right" });
                        }
                    )
                    .on(g, function () {
                        S.get(0).pause();
                    });
            var I = Y(".html5boxTimeCurrent", A),
                $ = Y(".html5boxTimeTotal", A),
                L = Y(".html5boxSeeker", A),
                j = Y(".html5boxSeekerPlay", A),
                z = Y(".html5boxSeekerBuffer", A),
                N = Y(".html5boxSeekerHandler", A);
            I.css({
                display: "block",
                position: "relative",
                float: "left",
                "line-height": v + "px",
                "font-weight": "normal",
                "font-size": "12px",
                margin: "0 8px",
                "font-family": "Arial, Helvetica, sans-serif",
                color: "#fff",
            }),
                $.css({
                    display: "block",
                    position: "relative",
                    float: "right",
                    "line-height": v + "px",
                    "font-weight": "normal",
                    "font-size": "12px",
                    margin: "0 8px",
                    "font-family": "Arial, Helvetica, sans-serif",
                    color: "#fff",
                }),
                L.css({
                    display: "block",
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                    height: "10px",
                    "background-color": "#222",
                    margin: Math.floor((v - 10) / 2) + "px 4px",
                })
                    .on(d, function (t) {
                        t = (p ? t.originalEvent.touches[0] : t).pageX - L.offset().left;
                        j.css({ width: t }),
                            (S.get(0).currentTime = (t * S.get(0).duration) / L.width()),
                            L.on(f, function (t) {
                                t =
                                    (p ? t.originalEvent.touches[0] : t).pageX - L.offset().left;
                                j.css({ width: t }),
                                    (S.get(0).currentTime = (t * S.get(0).duration) / L.width());
                            });
                    })
                    .on(m, function () {
                        L.off(f);
                    }),
                z.css({
                    display: "block",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    "background-color": "#444",
                }),
                j.css({
                    display: "block",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    "background-color": "#fcc500",
                });
            var R,
                M,
                F = r ? S : S.parent();
            (F.get(0).requestFullscreen ||
                F.get(0).webkitRequestFullScreen ||
                F.get(0).mozRequestFullScreen ||
                F.get(0).webkitEnterFullScreen ||
                F.get(0).msRequestFullscreen) &&
                ((R = function (t) {
                    r
                        ? t
                            ? (S.get(0).setAttribute("controls", "controls"),
                                a && S.get(0).setAttribute("controlsList", "nodownload"))
                            : S.get(0).removeAttribute("controls")
                        : t
                            ? (Y(document).on("mousemove", P),
                                A.css({ "z-index": 2147483647, position: "fixed" }),
                                E.css({ "z-index": 2147483647, display: "block" }),
                                C.css({ "z-index": 2147483647 }))
                            : (Y(document).off("mousemove", P),
                                A.css({ "z-index": "", position: "absolute" }),
                                E.css({ "z-index": "", display: "none" }),
                                C.css({ "z-index": "" }));
                }),
                    document.addEventListener &&
                    (document.addEventListener(
                        "MSFullscreenChange",
                        function () {
                            (b = null != document.msFullscreenElement), R(b);
                        },
                        !1
                    ),
                        document.addEventListener(
                            "fullscreenchange",
                            function () {
                                (b = document.fullscreen), R(b);
                            },
                            !1
                        ),
                        document.addEventListener(
                            "mozfullscreenchange",
                            function () {
                                (b = document.mozFullScreen), R(b);
                            },
                            !1
                        ),
                        document.addEventListener(
                            "webkitfullscreenchange",
                            function () {
                                (b = document.webkitIsFullScreen), R(b);
                            },
                            !1
                        )),
                    F &&
                    F.get(0) &&
                    F.get(0).addEventListener &&
                    (F.get(0).addEventListener(
                        "webkitbeginfullscreen",
                        function () {
                            R((b = !0));
                        },
                        !1
                    ),
                        F.get(0).addEventListener(
                            "webkitendfullscreen",
                            function () {
                                R((b = !1));
                            },
                            !1
                        )),
                    r ||
                    Y("head").append(
                        "<style type='text/css'>video" +
                        i +
                        "::-webkit-media-controls { display:none !important; }</style>"
                    ),
                    Y(".html5boxFullscreen", A)
                        .css({
                            display: "block",
                            position: "relative",
                            float: "right",
                            width: "32px",
                            height: "32px",
                            margin: Math.floor((v - 32) / 2),
                            cursor: "pointer",
                            "background-image": "url('" + t + "html5boxplayer_fullscreen.png')",
                            "background-position": "left top",
                        })
                        .hover(
                            function () {
                                var t = Y(this).css("background-position")
                                    ? Y(this).css("background-position").split(" ")[0]
                                    : Y(this).css("background-position-x");
                                Y(this).css({ "background-position": t + " bottom" });
                            },
                            function () {
                                var t = Y(this).css("background-position")
                                    ? Y(this).css("background-position").split(" ")[0]
                                    : Y(this).css("background-position-x");
                                Y(this).css({ "background-position": t + " top" });
                            }
                        )
                        .on(g, function () {
                            (b = !b)
                                ? (r &&
                                    (S.get(0).setAttribute("controls", "controls"),
                                        a && S.get(0).setAttribute("controlsList", "nodownload")),
                                    F.get(0).requestFullscreen
                                        ? F.get(0).requestFullscreen()
                                        : F.get(0).webkitRequestFullScreen
                                            ? F.get(0).webkitRequestFullScreen()
                                            : F.get(0).mozRequestFullScreen
                                                ? F.get(0).mozRequestFullScreen()
                                                : F.get(0).webkitEnterFullScreen &&
                                                F.get(0).webkitEnterFullScreen(),
                                    F.get(0).msRequestFullscreen && F.get(0).msRequestFullscreen())
                                : document.cancelFullScreen
                                    ? document.cancelFullScreen()
                                    : document.mozCancelFullScreen
                                        ? document.mozCancelFullScreen()
                                        : document.webkitCancelFullScreen
                                            ? document.webkitCancelFullScreen()
                                            : document.webkitExitFullscreen
                                                ? document.webkitExitFullscreen()
                                                : document.msExitFullscreen && document.msExitFullscreen();
                        })),
                T &&
                Y(".html5boxHD", A)
                    .css({
                        display: "block",
                        position: "relative",
                        float: "right",
                        width: "32px",
                        height: "32px",
                        margin: Math.floor((v - 32) / 2),
                        cursor: "pointer",
                        "background-image": "url('" + t + "html5boxplayer_hd.png')",
                        "background-position": (x ? "right" : "left") + " center",
                    })
                    .on(g, function () {
                        (x = !x),
                            Y(this).css({
                                "background-position": (x ? "right" : "left") + " center",
                            }),
                            (e.isHd = x);
                        var t = S.get(0).isPaused;
                        S.get(0).setAttribute(
                            "src",
                            (x ? T : k) + "#t=" + S.get(0).currentTime
                        ),
                            t ? S.get(0).pause() : S.get(0).play();
                    }),
                h &&
                (M = Y(".html5boxCaption", A))
                    .css({
                        display: "block",
                        position: "relative",
                        float: "right",
                        width: "32px",
                        height: "32px",
                        margin: Math.floor((v - 32) / 2),
                        cursor: "pointer",
                        "background-image": "url('" + t + "html5boxplayer_caption.png')",
                        "background-position": u ? "right center" : "left center",
                    })
                    .data("showcaption", u)
                    .on(g, function () {
                        var t = !M.data("showcaption");
                        if (
                            (M.data("showcaption", t).css({
                                "background-position": (t ? "right" : "left") + " center",
                            }),
                                S.get(0).textTracks)
                        )
                            for (var e = 0; e < S.get(0).textTracks.length; e++)
                                S.get(0).textTracks[e].mode = t ? "showing" : "hidden";
                    });
            var H,
                q,
                B,
                W,
                U = 0 == (S.get(0).volume = s) ? 1 : s,
                u = S.get(0).volume;
            (S.get(0).volume = u / 2 + 0.1),
                S.get(0).volume === u / 2 + 0.1 &&
                ((S.get(0).volume = u),
                    (s = Y(".html5boxVolume", A)),
                    (H = Y(".html5boxVolumeButton", A)),
                    (q = Y(".html5boxVolumeBar", A)),
                    (B = Y(".html5boxVolumeBarBg", A)),
                    (W = Y(".html5boxVolumeBarActive", A)),
                    s
                        .css({
                            display: "block",
                            position: "relative",
                            float: "right",
                            width: "32px",
                            height: "32px",
                            margin: Math.floor((v - 32) / 2),
                        })
                        .hover(
                            function () {
                                clearTimeout(_);
                                var t = S.get(0).volume;
                                W.css({ height: Math.round(100 * t) + "%" }), q.show();
                            },
                            function () {
                                clearTimeout(_),
                                    (_ = setTimeout(function () {
                                        q.hide();
                                    }, 1e3));
                            }
                        ),
                    H.css({
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        "background-image": "url('" + t + "html5boxplayer_volume.png')",
                        "background-position": "top " + (0 < u ? "left" : "right"),
                    })
                        .hover(
                            function () {
                                var t = Y(this).css("background-position")
                                    ? Y(this).css("background-position").split(" ")[0]
                                    : Y(this).css("background-position-x");
                                Y(this).css({ "background-position": t + " bottom" });
                            },
                            function () {
                                var t = Y(this).css("background-position")
                                    ? Y(this).css("background-position").split(" ")[0]
                                    : Y(this).css("background-position-x");
                                Y(this).css({ "background-position": t + " top" });
                            }
                        )
                        .on(g, function () {
                            var t = 0 < (t = S.get(0).volume) ? ((U = t), 0) : U,
                                e = Y(this).css("background-position")
                                    ? Y(this).css("background-position").split(" ")[1]
                                    : Y(this).css("background-position-y");
                            H.css({
                                "background-position": (0 < t ? "left" : "right") + " " + e,
                            }),
                                0 < t && S.prop("muted", !1),
                                (S.get(0).volume = t),
                                W.css({ height: Math.round(100 * t) + "%" });
                        }),
                    q.css({
                        display: "none",
                        position: "absolute",
                        left: 4,
                        bottom: "100%",
                        width: 24,
                        height: 80,
                        "margin-bottom": Math.floor((v - 32) / 2),
                        "background-color": "#000000",
                        opacity: 0.7,
                        filter: "alpha(opacity=70)",
                    }),
                    B.css({
                        display: "block",
                        position: "relative",
                        width: 10,
                        height: 68,
                        margin: 7,
                        cursor: "pointer",
                        "background-color": "#222",
                    }),
                    W.css({
                        display: "block",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        "background-color": "#fcc500",
                    }),
                    B.on(d, function (t) {
                        t =
                            1 <
                                (t =
                                    1 -
                                    ((p ? t.originalEvent.touches[0] : t).pageY - B.offset().top) /
                                    B.height())
                                ? 1
                                : t < 0
                                    ? 0
                                    : t;
                        W.css({ height: Math.round(100 * t) + "%" }),
                            H.css({
                                "background-position": "left " + (0 < t ? "top" : "bottom"),
                            }),
                            0 < t && S.prop("muted", !1),
                            (S.get(0).volume = t),
                            B.on(f, function (t) {
                                t =
                                    1 <
                                        (t =
                                            1 -
                                            ((p ? t.originalEvent.touches[0] : t).pageY -
                                                B.offset().top) /
                                            B.height())
                                        ? 1
                                        : t < 0
                                            ? 0
                                            : t;
                                W.css({ height: Math.round(100 * t) + "%" }),
                                    H.css({
                                        "background-position": "left " + (0 < t ? "top" : "bottom"),
                                    }),
                                    0 < t && S.prop("muted", !1),
                                    (S.get(0).volume = t);
                            });
                    }).on(m, function () {
                        B.off(f);
                    }));
            function X(t) {
                var e = Math.floor(t / 3600),
                    i = e < 10 ? "0" + e : e,
                    o = (n = Math.floor((t - 3600 * e) / 60)) < 10 ? "0" + n : n,
                    n = Math.floor(t - (3600 * e + 60 * n)),
                    n = o + ":" + (n < 10 ? "0" + n : n);
                return 0 < e && (n = i + ":" + n), n;
            }
            n && C.hide(), o && A.hide();
            try {
                S.on("canplay", function () {
                    h &&
                        (function (t) {
                            if (S.get(0).textTracks) {
                                for (var e = 0; e < S.get(0).textTracks.length; e++) {
                                    if (
                                        ((S.get(0).textTracks[e].mode = "hidden"),
                                            S.get(0).textTracks[e].activeCues)
                                    )
                                        for (
                                            var i = 0;
                                            i < S.get(0).textTracks[e].activeCues.length;
                                            i++
                                        )
                                            S.get(0).textTracks[e].activeCues[i].line = t;
                                    if (S.get(0).textTracks[e].cues)
                                        for (i = 0; i < S.get(0).textTracks[e].cues.length; i++)
                                            S.get(0).textTracks[e].cues[i].line = t;
                                }
                                for (
                                    var o = Y(".html5boxCaption", A).data("showcaption"), e = 0;
                                    e < S.get(0).textTracks.length;
                                    e++
                                )
                                    S.get(0).textTracks[e].mode = o ? "showing" : "hidden";
                            }
                        })(c);
                }),
                    S.on("play", function () {
                        n || C.hide(), o || (O.hide(), D.show());
                    }),
                    S.on("pause", function () {
                        n || C.show(), o || (A.show(), clearTimeout(y), O.show(), D.hide());
                    }),
                    S.on("ended", function () {
                        Y(window).trigger("html5lightbox.videoended"),
                            n || C.show(),
                            o || (A.show(), clearTimeout(y), O.show(), D.hide());
                    }),
                    S.on("timeupdate", function () {
                        var t,
                            e,
                            i = S.get(0).currentTime;
                        i &&
                            (I.text(X(i)),
                                (e = S.get(0).duration) &&
                                ($.text(X(e)),
                                    (t = L.width()),
                                    (e = Math.round((t * i) / e)),
                                    j.css({ width: e }),
                                    N.css({ left: e })));
                    }),
                    S.on("progress", function () {
                        var t;
                        S.get(0).buffered &&
                            0 < S.get(0).buffered.length &&
                            !isNaN(S.get(0).buffered.end(0)) &&
                            !isNaN(S.get(0).duration) &&
                            ((t = L.width()),
                                z.css({
                                    width: Math.round(
                                        (t * S.get(0).buffered.end(0)) / S.get(0).duration
                                    ),
                                }));
                    });
            } catch (t) { }
        }),
        jQuery(document).ready(function () {
            "undefined" == typeof html5Lightbox &&
                jQuery.fn.html5lightbox &&
                (html5Lightbox = jQuery(".html5lightbox").html5lightbox());
        });
}