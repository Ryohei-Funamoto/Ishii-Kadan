'use strict';

document.addEventListener('DOMContentLoaded', function () {
  /**---------------
   * サブヘッダーの出現
  --------------- */
  const header = document.querySelector('.js-header');
  const headerSub = document.querySelector('div.js-header-sub');
  var headerHeight;

  window.addEventListener('scroll', function () {
    headerHeight = header.clientHeight;

    if (window.pageYOffset > headerHeight) {
      headerSub.classList.add('is-show');
    } else {
      headerSub.classList.remove('is-show');
    }
  });

  /**
   * サブヘッダーのハンバーガーメニューを開閉
   */
  const hamburgerSub = document.querySelector('.js-hamburger-sub');
  const drawerSub = document.querySelector('.js-drawer-sub');

  hamburgerSub.addEventListener('click', function () {
    if (hamburgerSub.classList.contains('is-open')) {
      hamburgerSub.classList.remove('is-open');
      drawerSub.classList.remove('is-open');
      bodyScrollLock.clearAllBodyScrollLocks();
    } else {
      hamburgerSub.classList.add('is-open');
      drawerSub.classList.add('is-open');
      bodyScrollLock.disableBodyScroll(drawerSub);
    }
  });

  /**---------------
   * MVスライダー
  --------------- */
  const topMvSlider = new Swiper('.js-top-mv-slider', {
    loop: true,
    effect: 'fade',
    autoplay: {
      delay: 4000,
      disableOnInterAction: false,
    },
    speed: 1600,
  });

  /**---------------
   * お知らせのタブ
  --------------- */
  const tabs = document.querySelectorAll('.js-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // 現在アクティブになっているタブを非アクティブにする
      document.querySelectorAll('.is-active')[0].classList.remove('is-active');
      // クリックしたタブをアクティブにする
      this.classList.add('is-active');
      // 現在表示されているパネルを非表示にする
      document.querySelectorAll('.js-panel.is-show')[0].classList.remove('is-show');
      // タブの集合を配列に変換する
      const arrayTabs = Array.prototype.slice.call(tabs);
      // 配列からクリックしたタブの順序を取得する
      const index = arrayTabs.indexOf(this);
      // クリックしたタブの対象となるパネルを表示する
      document.querySelectorAll('.js-panel')[index].classList.add('is-show');
    });
  });

  /**---------------
   * スクロールアニメーション
  --------------- */
  const animeDuration = 1.5;
  const animeTrigPos = '0% 50%';

  // セクションタイトル
  gsap.set('.js-section-title', {
    opacity: 0,
    y: 50,
  });

  ScrollTrigger.batch('.js-section-title', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      duration: animeDuration,
    }),
    start: animeTrigPos,
    once: true
  });

  // concept
  gsap.set('.js-concept-text', {
    opacity: 0,
    y: 50,
  });
  ScrollTrigger.batch('.js-concept-text', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: {
        from: 'start',
        amount: 1.5,
      },
      duration: animeDuration,
    }),
    start: animeTrigPos,
    once: true,
  });

  // features
  gsap.utils.toArray('.js-features-item').forEach(item => {
    const featuresImgWraps = item.querySelectorAll('.js-features-image-wrapper');
    const featuresImgs = item.querySelectorAll('.js-features-image');
    const featuresExtendBgs = item.querySelectorAll('.js-features-extend-bg');
    const featuresBodies = item.querySelectorAll('.js-features-body');

    gsap.set(featuresImgWraps, { opacity: 0 });
    gsap.set(featuresImgs, { opacity: 0 });
    gsap.set(featuresExtendBgs, {
      scaleX: 0,
      transformOrigin: 'left',
    });
    gsap.set(featuresBodies, {
      opacity: 0,
      y: 50
    });

    const featuresItemTL = gsap.timeline({ paused: true });

    featuresItemTL.to(featuresBodies, {
      keyframes: {
        '0%': {
          opacity: 0,
          y: 50
        },
        '100%': {
          opacity: 1,
          y: 0
        }
      },
      duration: animeDuration
    }).to(featuresImgWraps, {
      keyframes: {
        '0%': {
          opacity: 0,
        },
        '100%': {
          opacity: 1
        }
      },
      duration: animeDuration
    }, '<').to(featuresExtendBgs, {
      keyframes: {
        '0%': {
          scaleX: 0,
          transformOrigin: 'left'
        },
        '50%': {
          scaleX: 1,
          transformOrigin: 'left'
        },
        '50.001%': {
          transformOrigin: 'right'
        },
        '100%': {
          scaleX: 0,
          transformOrigin: 'right'
        }
      },
      duration: animeDuration
    }, '<').to(featuresImgs, {
      keyframes: {
        '0%': {
          opacity: 0,
        },
        '100%': {
          opacity: 1
        }
      },
      duration: animeDuration
    }, '<0.5');

    ScrollTrigger.create({
      trigger: item,
      start: animeTrigPos,
      onEnter: () => featuresItemTL.play(),
      once: true
    });
  });

  // recommended
  gsap.set('.js-recommended-card', {
    opacity: 0,
    y: 50
  });

  ScrollTrigger.batch('.js-recommended-card', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      duration: animeDuration,
      stagger: {
        from: 'start',
        amount: 1.5,
      }
    }),
    start: animeTrigPos,
    once: true,
  });

  // news
  gsap.set('.js-news-tabs', {
    opacity: 0,
    y: 50
  });
  ScrollTrigger.batch('.js-news-tabs', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      duration: animeDuration
    }),
    start: animeTrigPos,
    once: true
  });

  gsap.set('.js-news-post', {
    opacity: 0,
    y: 50
  });
  ScrollTrigger.batch('.js-news-post', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      duration: animeDuration
    }),
    start: animeTrigPos,
    once: true
  });

  // access
  gsap.set('.js-access-img', {
    opacity: 0,
    x: -50
  });
  ScrollTrigger.batch('.js-access-img', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      x: 0,
      duration: animeDuration
    }),
    start: animeTrigPos,
    once: true
  });

  gsap.set('.js-access-info', {
    opacity: 0,
    x: 50
  });
  ScrollTrigger.batch('.js-access-info', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      x: 0,
      duration: animeDuration
    }),
    start: animeTrigPos,
    once: true
  });

  gsap.set('.js-access-map', {
    opacity: 0,
    y: 50
  });
  ScrollTrigger.batch('.js-access-map', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      duration: animeDuration
    }),
    start: animeTrigPos,
    once: true
  });
});
