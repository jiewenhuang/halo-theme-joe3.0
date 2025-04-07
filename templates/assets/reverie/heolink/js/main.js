function showNav() {
  document.getElementById("nav_list").classList.toggle("active");
}

document.addEventListener('DOMContentLoaded', function () {
  initHeoLink();
});

document.addEventListener('pjax:complete', function() {
  initHeoLink();
});

function initHeoLink() {
  const pjax = new Pjax({
    selectors: [
      "title",
      "#web_content"
    ]
  })

  heolink.initNavLink();
  heolink.listenNavScroll();
}