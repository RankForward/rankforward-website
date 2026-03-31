exports.handler = async (event) => {
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const WEBHOOK_URL = process.env.WEBHOOK_URL;

  console.log("Raw payload:", (event.body || "").slice(0, 500));

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  // Netlify Forms sends: { payload: { data: { firstName, bizName, ... } } }
  // Direct POST sends: { firstName, bizName, ... }
  const data = (payload.payload && payload.payload.data) || payload.data || payload;
  console.log("Parsed data keys:", Object.keys(data || {}));

  // Handle ALL possible field name formats (Netlify Forms, direct POST, etc.)
  const firstName =
    data.firstName || data["first-name"] || data.first_name ||
    data.name || "";
  const email =
    data.email || data["email-address"] || "";
  const businessName =
    data.bizName || data["biz-name"] || data.businessName ||
    data["business-name"] || data.business_name || data.business || "";
  const url =
    data.website || data.url || data["website-url"] ||
    data.website_url || "";
  const industry =
    data.industry || data["industry-type"] || "";
  const market =
    data.market || data["primary-market"] || data["market-city"] ||
    data.city || "";

  // 1. Send admin notification via Resend
  if (RESEND_KEY && !RESEND_KEY.includes("add")) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "RankForward Pipeline <hello@rankforward.ai>",
          to: ["hello@rankforward.ai"],
          subject: `New Lead: ${businessName || "Unknown Business"} (${firstName || "Unknown Name"})`,
          html: `
            <h2>New Free Score Request</h2>
            <p><strong>Name:</strong> ${firstName}</p>
            <p><strong>Business:</strong> ${businessName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>URL:</strong> ${url}</p>
            <p><strong>Industry:</strong> ${industry}</p>
            <p><strong>Market:</strong> ${market}</p>
            <hr>
            <p><strong>Run audit on Mac Mini:</strong></p>
            <pre>cd ~/Projects/ai-seo-biz && source GEO/geo_env/bin/activate && set -a && source .env && set +a && python tools/free_score_report.py "${firstName}" "${businessName}" "${url}" "${industry}" "${market}"</pre>
            <p>Then send report to: ${email}</p>
          `,
        }),
      });
    } catch (e) {
      console.error("Admin notification failed:", e.message);
    }
  }

  // 2. Send confirmation email to lead
  if (RESEND_KEY && !RESEND_KEY.includes("add") && email) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Jamie at RankForward <hello@rankforward.ai>",
          to: [email],
          subject: `Your AI visibility score is being prepared, ${firstName}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
              <div style="background:#1A3A5C;padding:32px;text-align:center;">
                <h1 style="color:white;margin:0;">RankForward</h1>
                <p style="color:#AED6F1;margin:8px 0 0;">AI Search Optimization</p>
              </div>
              <div style="padding:40px 32px;">
                <h2 style="color:#1A3A5C;">Got it, ${firstName}. Your score is being prepared.</h2>
                <p>We received your request for <strong>${businessName}</strong> and are running your AI visibility audit now.</p>
                <p>Within <strong>24 hours</strong> you will receive a 2-page report showing:</p>
                <ul style="line-height:1.8;">
                  <li>Your AI citation readiness score (1-10)</li>
                  <li>What ChatGPT, Claude, and Grok currently say about your business</li>
                  <li>Your top 3 citation gaps and how to close them</li>
                </ul>
                <p style="color:#666;font-size:14px;">No sales pitch. Just your data.</p>
                <div style="background:#EBF5FB;border-radius:8px;padding:20px;margin:24px 0;">
                  <p style="margin:0;color:#1A3A5C;">
                    <strong>Want to talk through the results?</strong><br>
                    Book a free 30-minute strategy call — before or after your report arrives.
                  </p>
                  <a href="https://calendly.com/rankforward/free-strategy-call" style="display:inline-block;margin-top:12px;background:#2E86C1;color:white;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">Book Your Free Call</a>
                </div>
              </div>
              <div style="background:#F8F9FA;padding:20px 32px;text-align:center;font-size:12px;color:#888;">
                RankForward &middot; hello@rankforward.ai &middot; rankforward.ai<br>Prescott, Arizona
              </div>
            </div>`,
        }),
      });
    } catch (e) {
      console.error("Lead confirmation failed:", e.message);
    }
  }

  // 3. Trigger backend webhook if configured
  if (WEBHOOK_URL && !WEBHOOK_URL.includes("placeholder")) {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          email,
          url,
          business_name: businessName,
          industry,
          market,
        }),
      });
    } catch (e) {
      console.error("Webhook POST failed:", e.message);
    }
  }

  return { statusCode: 200, body: "OK" };
};
