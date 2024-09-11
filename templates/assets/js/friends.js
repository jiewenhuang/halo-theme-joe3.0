/**朋友圈逻辑 */
const friendContext = {
	/* 激活列表特效 */
	initEffect() {
		$(".joe_loading").remove();
		$(".joe_friends__list").removeClass("hidden");
		if (!ThemeConfig.enable_friend_effect) return;
		new WOW({
			boxClass: "wow",
			animateClass: ThemeConfig.friend_list_effect_class || "fadeIn",
			offset: 0,
			mobile: true,
			live: true,
		}).init();
	}
};

!(function () {
	document.addEventListener("DOMContentLoaded", function () {
		friendContext.initEffect();
	});
})();

