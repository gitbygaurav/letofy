import { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-beVietnam">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-4">Welcome to Letofy!</p>

        <p className="mb-4">
          These terms and conditions outline the rules and regulations for the use of Letofy&apos;s Website, located at https://www.letofy.com.
        </p>

        <p className="mb-4">
          By accessing this website we assume you accept these terms and conditions. Do not continue to use Letofy if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <p className="mb-4">
          The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to you, the person log on this website and compliant to the Company&apos;s terms and conditions. &quot;The Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our Company. &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client&apos;s needs in respect of provision of the Company&apos;s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
        <p className="mb-4">
          We employ the use of cookies. By accessing Letofy, you agreed to use cookies in agreement with the Letofy&apos;s Privacy Policy.
        </p>

        <p className="mb-4">
          Most interactive websites use cookies to let us retrieve the user&apos;s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">License</h2>
        <p className="mb-4">
          Unless otherwise stated, Letofy and/or its licensors own the intellectual property rights for all material on Letofy. All intellectual property rights are reserved. You may access this from Letofy for your own personal use subjected to restrictions set in these terms and conditions.
        </p>

        <p className="mb-4">You must not:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Republish material from Letofy</li>
          <li>Sell, rent or sub-license material from Letofy</li>
          <li>Reproduce, duplicate or copy material from Letofy</li>
          <li>Redistribute content from Letofy</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Hyperlinking to our Content</h2>
        <p className="mb-4">The following organizations may link to our Website without prior written approval:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Government agencies;</li>
          <li>Search engines;</li>
          <li>News organizations;</li>
          <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
          <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">iFrames</h2>
        <p className="mb-4">
          Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Content Liability</h2>
        <p className="mb-4">
          We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Privacy</h2>
        <p className="mb-4">Please read Privacy Policy</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Disclaimer</h2>
        <p className="mb-4">
          To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>limit or exclude our or your liability for death or personal injury;</li>
          <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
          <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
          <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
        </ul>

        <p className="mb-4">
          The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
        </p>

        <p className="mb-4">
          As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
        </p>
      </div>
    </div>
  );
};

export default Terms;