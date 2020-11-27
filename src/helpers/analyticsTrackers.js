const generateMatomoSnippet = () => `
  <!-- Matomo -->
  <script type="text/javascript">
    var _paq = window._paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
    _paq.push(["setCookieDomain", "*.yarynakorduba.github.io"]);
    _paq.push(["setDomains", ["*.yarynakorduba.github.io/ram-viz"]]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="https://localhostlocal.matomo.cloud/";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '2']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.type='text/javascript'; g.async=true; g.src='//cdn.matomo.cloud/localhostlocal.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
    })();
  </script>
  <noscript><p><img src="https://localhostlocal.matomo.cloud/matomo.php?idsite=2&amp;rec=1" style="border:0;" alt="" /></p></noscript>
  <!-- End Matomo Code -->   
`;

const generateGoogleAnalyticsSnippet = () => `
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-F4051947VB"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-F4051947VB');
</script>
`;

export default function injectTrackers() {
  try {
    const googleTrackersSnippet = generateMatomoSnippet();
    const matomoTrackersSnippet = generateGoogleAnalyticsSnippet();
    document.head.insertAdjacentHTML("afterbegin", googleTrackersSnippet);
    document.head.insertAdjacentHTML("afterbegin", matomoTrackersSnippet);
  } catch (error) {
    console.log("Trackers could not be added", error);
  }
}
