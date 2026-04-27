// INTENTIONAL: client-intake is the paying-client onboarding path. Unlike
// free-score-intake (high-volume, fully automated), client-intake is gated
// by manual JB review. Admin email embeds a paste-ready audit + CrowdReply
// onboarding heredoc — design seam is the human, not a webhook. Do NOT
// wire a DO webhook POST here without revisiting the strategic intent.
// See tracker v12.3 §7 leave-alone (audit B3) and roadmap aggregator-tier
// posture for context.
async function handleIntakeForm(data, RESEND_KEY) {
  const contactName = data.contact_name || data.contactName || "";
  const email = data.email || "";
  const businessName = data.business_name || data.businessName || "";
  const websiteUrl = data.website_url || data.websiteUrl || "";
  const industry = data.industry || "";
  const yearFounded = data.year_founded || data.yearFounded || "";
  const description = data.business_description || data.businessDescription || "";
  const markets = data.markets || "";
  const idealCustomer = data.ideal_customer || data.idealCustomer || "";
  const keyServices = data.key_services || data.keyServices || "";
  const competitor1 = data.competitor_1 || "";
  const competitor2 = data.competitor_2 || "";
  const competitor3 = data.competitor_3 || "";
  const platforms = data.platforms || "";
  const otherPlatforms = data.other_platforms || data.otherPlatforms || "";
  const reviewCount = data.review_count || data.reviewCount || "";
  const primaryGoal = data.primary_goal || data.primaryGoal || "";
  const additionalNotes = data.additional_notes || data.additionalNotes || "";

  // Build slug for client folder
  const slug = businessName.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 60) || "client";

  // Build the platforms list as a string
  const platformList = Array.isArray(platforms) ? platforms.join(", ") : platforms;

  // Build intake.json content for the audit
  const intakeJson = JSON.stringify({
    company: businessName,
    contact_name: contactName,
    email: email,
    website_url: websiteUrl,
    niche: industry,
    industry: industry,
    year_founded: yearFounded,
    description: description,
    markets: markets.split(",").map(m => m.trim()).filter(Boolean),
    ideal_customer: idealCustomer,
    key_services: keyServices,
    competitors: [competitor1, competitor2, competitor3].filter(Boolean),
    social_platforms: Array.isArray(platforms) ? platforms : [],
    directory_listings: [],
    other_platforms: otherPlatforms,
    review_count: reviewCount,
    primary_goal: primaryGoal,
    additional_notes: additionalNotes,
    baseline_geo_score: 0,
    intake_date: new Date().toISOString().split("T")[0],
  }, null, 2);

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
          subject: `CLIENT INTAKE: ${businessName} (${contactName})`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:700px;">
              <div style="background:#1A3A5C;padding:20px;">
                <h2 style="color:white;margin:0;">New Client Intake Received</h2>
              </div>
              <div style="padding:24px;background:#EAFAF1;border-left:4px solid #27AE60;">
                <h3 style="color:#27AE60;margin:0 0 8px;">PAID CLIENT ONBOARDING</h3>
                <p style="margin:0;font-size:16px;">
                  ${contactName} from ${businessName} has completed the intake form.
                </p>
              </div>
              <div style="padding:24px;">
                <h3 style="color:#1A3A5C;">Business Details</h3>
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:6px 0;color:#666;width:140px;">Contact</td><td style="padding:6px 0;font-weight:bold;">${contactName}</td></tr>
                  <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;">${email}</td></tr>
                  <tr><td style="padding:6px 0;color:#666;">Business</td><td style="padding:6px 0;font-weight:bold;">${businessName}</td></tr>
                  <tr><td style="padding:6px 0;color:#666;">Website</td><td style="padding:6px 0;">${websiteUrl}</td></tr>
                  <tr><td style="padding:6px 0;color:#666;">Industry</td><td style="padding:6px 0;">${industry}</td></tr>
                  <tr><td style="padding:6px 0;color:#666;">Founded</td><td style="padding:6px 0;">${yearFounded || "Not provided"}</td></tr>
                  <tr><td style="padding:6px 0;color:#666;">Markets</td><td style="padding:6px 0;">${markets}</td></tr>
                  <tr><td style="padding:6px 0;color:#666;">Key Services</td><td style="padding:6px 0;">${keyServices}</td></tr>
                  <tr><td style="padding:6px 0;color:#666;">Ideal Customer</td><td style="padding:6px 0;">${idealCustomer || "Not provided"}</td></tr>
                  <tr><td style="padding:6px 0;color:#666;">Reviews</td><td style="padding:6px 0;">${reviewCount || "Not provided"}</td></tr>
                  <tr><td style="padding:6px 0;color:#666;">Primary Goal</td><td style="padding:6px 0;">${primaryGoal}</td></tr>
                </table>

                <h3 style="color:#1A3A5C;margin-top:20px;">Description</h3>
                <p style="background:#F8F9FA;padding:12px;border-radius:6px;">${description}</p>

                <h3 style="color:#1A3A5C;">Competitors</h3>
                <p>${competitor1 || "None"}<br>${competitor2 || ""}<br>${competitor3 || ""}</p>

                <h3 style="color:#1A3A5C;">Current Platforms</h3>
                <p>${platformList || "None checked"}${otherPlatforms ? "<br>Other: " + otherPlatforms : ""}</p>

                ${additionalNotes ? `<h3 style="color:#1A3A5C;">Additional Notes</h3><p style="background:#F8F9FA;padding:12px;border-radius:6px;">${additionalNotes}</p>` : ""}
              </div>

              <div style="padding:24px;background:#EBF5FB;border-radius:8px;margin:0 24px 24px;">
                <h3 style="color:#1A3A5C;margin:0 0 12px;">Ready-to-Run Audit Command</h3>
                <p style="font-size:13px;color:#666;margin:0 0 8px;">Paste this into Claude Code on your Mac Mini:</p>
                <pre style="background:#1C2833;color:#AED6F1;padding:16px;border-radius:6px;font-size:12px;overflow-x:auto;white-space:pre-wrap;">cd ~/Projects/ai-seo-biz

# Create client folder and intake.json
mkdir -p clients/${slug}
cat > clients/${slug}/intake.json << 'INTAKE_EOF'
${intakeJson}
INTAKE_EOF

# Run the full audit report
source GEO/geo_env/bin/activate 2>/dev/null || true
set -a && source .env && set +a
python tools/full_audit_report.py ${slug}

echo "Audit report generated. Check clients/${slug}/reports/"

# CrowdReply onboarding (run after audit)
python tools/crowdreply_onboard_client.py ${slug}</pre>
              </div>
            </div>`,
        }),
      });
    } catch (e) {
      console.error("Intake notification failed:", e.message);
    }
  }

  return { statusCode: 200, body: "OK" };
}

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

  // Determine which form was submitted
  const formName = (payload.payload && payload.payload.form_name) || data["form-name"] || "";
  console.log("Form name:", formName);

  // Route to the correct handler
  if (formName === "client-intake") {
    return handleIntakeForm(data, RESEND_KEY);
  }

  // Otherwise, handle as free-score-intake (existing logic below)

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
                  <a href="https://calendly.com/rankforward/30min" style="display:inline-block;margin-top:12px;background:#2E86C1;color:white;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">Book Your Free Call</a>
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
