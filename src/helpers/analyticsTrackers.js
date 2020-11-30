const createMatomoSnippet = (first, rest) => {
  var _paq = window._paq || [];
  var trackingUrl = first.trackingUrl;
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);

  _paq.push(["setTrackerUrl", trackingUrl + "matomo.php"]);
  _paq.push(["setSiteId", first.trackingId]);
  _.map(rest, (tracker) => _paq.push(["addTracker", tracker.trackingUrl + "matomo.php", tracker.trackingId]));
  const d = document;
  const g = d.createElement("script");
  const s = d.getElementsByTagName("script")[0];
  g.type = "text/javascript";
  g.async = true;
  g.defer = true;
  g.src = trackingUrl + "matomo.js";
  s.parentNode.insertBefore(g, s);
};

const createGoogleAnalyticsSnippet = () => {
  const d = document;
  const g = d.createElement("script");
  const s = d.getElementsByTagName("script")[0];
  g.async = true;
  g.src = "https://www.googletagmanager.com/gtag/js?id=G-F4051947VB";
  s.parentNode.insertBefore(g, s);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "G-F4051947VB");
};

// const generateGoogleAnalyticsSnippet = () => `
// <!-- Global site tag (gtag.js) - Google Analytics -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-F4051947VB"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-F4051947VB');
// </script>
// `;

export default function injectTrackers() {
  try {
    const matomoTrackers = [{ trackingId: "2", trackingUrl: "https://localhostlocal.matomo.cloud/" }];
    createMatomoSnippet(matomoTrackers, []);
    createGoogleAnalyticsSnippet();
  } catch (error) {
    console.log("Trackers could not be added", error);
  }
}
