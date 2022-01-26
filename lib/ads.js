export const loadAds = () => {
    window.adthrive = window.adthrive || {};
    window.adthrive.cmd = window.adthrive.cmd || [];
    window.adthrive.plugin = 'adthrive-ads-manual';
    window.adthrive.host = 'ads.adthrive.com';

    var s = document.createElement('script');
    s.async = true;
    s.referrerpolicy='no-referrer-when-downgrade';
    s.src = 'https://' + window.adthrive.host + '/sites/6164a6ff014ece4bc4e34c23/ads.min.js?referrer=' + window.encodeURIComponent(window.location.href) + '&cb=' + (Math.floor(Math.random() * 100) + 1);
    var n = document.getElementsByTagName('script')[0];
    n.parentNode.insertBefore(s, n);
}