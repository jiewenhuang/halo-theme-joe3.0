const sco = {
  musicPlaying: false,

  musicToggle(isMeting = true) {
    if (!this.isMusicBind) {
      this.musicBind();
    }
    const $music = document.querySelector("#nav-music");
    const $meting = document.querySelector("meting-js");
    const $console = document.getElementById("consoleMusic");

    this.musicPlaying = !this.musicPlaying;
    $music.classList.toggle("playing", this.musicPlaying);
    $music.classList.toggle("stretch", this.musicPlaying);
    $console?.classList.toggle("on", this.musicPlaying);

    if (isMeting) {
      this.musicPlaying ? $meting.aplayer.play() : $meting.aplayer.pause();
    }
  },
  musicBind() {
    const $music = document.querySelector("#nav-music");
    const $name = document.querySelector("#nav-music .aplayer-music");
    const $button = document.querySelector("#nav-music .aplayer-button");

    $name?.addEventListener("click", () => {
      $music.classList.toggle("stretch");
    });

    $button?.addEventListener("click", () => {
      this.musicToggle(false);
    });

    this.isMusicBind = true;
  }
};