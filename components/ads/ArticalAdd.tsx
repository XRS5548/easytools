import Script from "next/script";

export default function ArticalAds() {
  return (
    <>
      {/* AdSense script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9509089570774470"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      {/* Ad unit */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-9509089570774470"
        data-ad-slot="8395765616"
      ></ins>

      {/* Initialize ad */}
      <Script id="adsbygoogle-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
}
