// 首页大图
(function() {
    "use strict";
    const EvanBigBanner = function(options) {
        if (!(this instanceof EvanBigBanner)) { return new EvanBigBanner(options) }
        this.options = Object.assign({}, { followMode: false, followTheme: false, titlePrint: false, titlePrintInterval: 300, titleTiktok: false, titleText: "来自小莫唐尼的Joe首页大图", titleColor: "#ffffff", titleShadow: "-3px 2px 6px #1c1f21", hitokotoParams: {}, hitokotoApi: "https://v1.hitokoto.cn", hitokotoColor: "#ffffff", hitokotoEnable: true, }, options);
        this.init()
    };
    const Utils = { checkIsMobile: function() { return /Mobi|Android|iPhone/i.test(navigator.userAgent) }, };
    EvanBigBanner.prototype = {
        dom: { bigBanner: null, waves: null, bannerTitle: null, bannerSubTitle: null, hitokotoText: null, hitokotoForm: null, },
        _timer: { printText: null, },
        fnGetDom() {
            this.dom.bigBanner = $("#EvanBigBanner");
            this.dom.waves = $("#EvanWaves");
            this.dom.bannerTitle = $("#EvanBigBanner_Title");
            this.dom.bannerSubTitle = $("#EvanBigBanner_SubTitle");
            this.dom.hitokotoText = $("#HitokotoText");
            this.dom.hitokotoForm = $("#HitokotoForm")
        },
        fnSetStyle() {
            this.dom.waves.find(".parallax use").removeAttr("fill");
            this.dom.bannerTitle.css({ color: this.options.titleColor, textShadow: this.options.titleShadow, });
            if (this.options.titleTiktok) { this.dom.bannerTitle.addClass("evan-tiktok-text") }
            this.dom.hitokotoText.css({ color: this.options.hitokotoColor });
            this.dom.hitokotoForm.css({ color: this.options.hitokotoColor });
            if (this.options.followMode) { if (!this.options.wavesColor) { this.dom.waves.css("fill", "var(--background)") } }
            if (this.options.followTheme) { if (!this.options.wavesColor) { this.dom.waves.css("fill", "var(--theme)") } if (!this.options.titleTiktok) { this.dom.bannerTitle.css("color", "var(--theme)") } }
        },
        fnPrintText() {
            const _this = this;
            if (_this.options.titleTiktok) return;
            let _textContent = "",
                _outTextContent = "";
            if (_this.options.titleText) { _textContent = _this.options.titleText } else { _textContent = _this.dom.bannerTitle.text() }
            let i = 0;
            const _showPrintText = () => {
                _this._timer.printText = setTimeout(() => {
                    if (_outTextContent.length < _textContent.length) {
                        _outTextContent += _textContent[i++];
                        _this.dom.bannerTitle.html("" + _outTextContent + "_");
                        _showPrintText()
                    } else {
                        clearTimeout(_this._timer.printText);
                        _this.dom.bannerTitle.html(_outTextContent + '<span id="EvanBigBannerLastTitleTip">_</span>');
                        _lastPrintText()
                    }
                }, _this.options.titlePrintInterval)
            };
            _showPrintText();
            let _isShowLast = true;
            const _lastPrintText = () => {
                setTimeout(() => {
                    if (_isShowLast) { $("#EvanBigBannerLastTitleTip").css({ visibility: "hidden" }) } else { $("#EvanBigBannerLastTitleTip").css({ visibility: "visible" }) }
                    _isShowLast = !_isShowLast;
                    _lastPrintText()
                }, _this.options.titlePrintInterval)
            }
        },
        fnGetHitokoto() {
            var _this = this;
            var _loopFn = function(callback) {
                $.get(_this.options.hitokotoApi, _this.options.hitokotoParams, function(res) {
                    _this.dom.hitokotoText.fadeIn(1500).html(res.hitokoto);
                    _this.dom.hitokotoForm.fadeIn(1500).html("「&nbsp;" + res.from + "&nbsp;」");
                    typeof callback == "function" && callback()
                })
            };
            if (_this.options.hitokotoEnable) {
                clearTimeout(_this.timer);
                var _timerFn = function() {
                    _this.timer = setTimeout(function() {
                        _this.dom.hitokotoText.fadeOut(1500);
                        _this.dom.hitokotoForm.fadeOut(1500);
                        setTimeout(function() { _loopFn(function() { _timerFn() }) }, 1100)
                    }, 6000)
                };
                _loopFn();
                _timerFn()
            }
        },
        init() {
            var _this = this;
            $(function() {
                _this.fnGetDom();
                _this.fnGetHitokoto();
                _this.fnPrintText();
                _this.fnSetStyle();
                if (_this.options.titleText) { _this.dom.bannerTitle.text(_this.options.titleText) } else { _this.dom.bannerSubTitle.css("opacity", 1) }
            })
        },
    };
    window.EvanBigBanner = EvanBigBanner
})();
const link = document.getElementById('evan-big-banner_goto');
const target = document.querySelector('#indexPosition');

link.addEventListener('click', (event) => {
    event.preventDefault();

    const targetPosition = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});