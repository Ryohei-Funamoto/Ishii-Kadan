'use strict';

document.addEventListener('DOMContentLoaded', function () {
  /**
   * ハンバーガーメニューとドロワーの開閉
   */
  const hamburger = document.querySelector('.js-hamburger');
  const drawer = document.querySelector('.js-drawer');

  hamburger.addEventListener('click', function () {
    if (hamburger.classList.contains('is-open')) {
      hamburger.classList.remove('is-open');
      drawer.classList.remove('is-open');
      bodyScrollLock.clearAllBodyScrollLocks();
    } else {
      hamburger.classList.add('is-open');
      drawer.classList.add('is-open');
      bodyScrollLock.disableBodyScroll(drawer);
    }
  });

  /**
   * 宿泊予約フォームの日付選択
   */
  let minDate = new Date();
  minDate = minDate.setDate(minDate.getDate() + 1);

  flatpickr('#js-date', {
    locate: 'ja',
    dateFormat: 'Y.m.d（D）',
    minDate: minDate,
    mode: 'multiple'
  });

  /**
   * 宿泊予約のモーダルを開く
   */
  const modalOpenItems = document.querySelectorAll('.js-modal-open');

  modalOpenItems.forEach(item => {
    item.addEventListener('click', function () {
      let targetClass = this.dataset.target;
      const targets = document.querySelectorAll('.' + targetClass);
      targets.forEach(target => {
        target.classList.add('is-show');
      });
      bodyScrollLock.disableBodyScroll('.c-modal-overlay');
    });
  });

  /**
   * 宿泊予約のモーダルを閉じる
   */
  const modalCloseItems = document.querySelectorAll('.js-modal-close');

  modalCloseItems.forEach(item => {
    item.addEventListener('click', function () {
      let targetClass = this.dataset.target;
      const targets = document.querySelectorAll('.' + targetClass);
      targets.forEach(target => {
        target.classList.remove('is-show');
      });
      bodyScrollLock.clearAllBodyScrollLocks();
    });
  });
});

(function ($) {
  // PC/SP判定
  // スクロールイベント
  // リサイズイベント
  // スムーズスクロール

  /* ここから */

  const breakpoint = 640;
  const mql = window.matchMedia(`screen and (max-width: ${breakpoint}px)`); //、MediaQueryListの生成
  let deviceFlag = mql.matches ? 1 : 0; // 0 : PC ,  1 : SP

  // pagetop
  let timer = null;
  const $pageTop = $('#pagetop');
  $pageTop.hide();

  // スクロールイベント
  $(window).on('scroll touchmove', function () {

    // スクロール中か判定
    if (timer !== false) {
      clearTimeout(timer);
    }

    // スクロール量が100pxを超えたら、200ms後にフェードイン
    timer = setTimeout(function () {
      if ($(this).scrollTop() > 100) {
        $('#pagetop').fadeIn('normal');
      } else {
        $pageTop.fadeOut();
      }
    }, 200);

    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();
    const footHeight = parseInt($('#footer').innerHeight());


    if (scrollHeight - scrollPosition <= footHeight - 20) {
      // 現在の下から位置が、フッターの高さの位置にはいったら(bottom20px分を引いて調整)
      $pageTop.css({
        'position': 'absolute',
        'bottom': footHeight,
      });
    } else {
      $pageTop.css({
        'position': 'fixed',
        'bottom': '20px'
      });
    }

  });


  // リサイズイベント
  const checkBreakPoint = function (mql) {
    deviceFlag = mql.matches ? 1 : 0; // 0 : PC ,  1 : SP
    // → PC
    if (deviceFlag === 0) {
      console.log('PC');
    } else {
      // →SP
      console.log('SP');
    }

    deviceFlag = mql.matches;
  }

  // ブレイクポイントの瞬間に発火
  mql.addListener(checkBreakPoint); //MediaQueryListのchangeイベントに登録

  // 初回チェック
  checkBreakPoint(mql);


  // スムーズスクロール
  // #で始まるアンカーをクリックした場合にスムーススクロール
  $('a[href^="#"]').on('click', function () {
    const speed = 500;
    // アンカーの値取得
    const href = $(this).attr('href');
    // 移動先を取得
    const target = $(href == '#' || href == '' ? 'html' : href);
    // 移動先を数値で取得
    const position = target.offset().top;

    // スムーススクロール
    $('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  });


})(jQuery);