/**
 * api/contact.js
 * Vercel Serverless Function — POST /api/contact
 *
 * Variables d'environnement requises (Vercel dashboard → Settings → Environment Variables) :
 *   RESEND_API_KEY = re_itLhjVrX_Gte5LD3ChYH8NdRAPegLKkjc
 *   ADMIN_EMAIL    = wthomasss06@gmail.com
 *   FROM_EMAIL     = onboarding@resend.dev
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, phone, email, message, service } = req.body ?? {}

  if (!name || !message) {
    return res.status(400).json({ error: 'Nom et message requis.' })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || 'wthomasss06@gmail.com'
  const FROM_EMAIL     = process.env.FROM_EMAIL     || 'onboarding@resend.dev'

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Clé API Resend manquante.' })
  }

  /* ── Email à l'admin ──────────────────────────────────────── */
  const adminHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#FFE500;padding:24px 32px;border-radius:8px 8px 0 0">
        <h1 style="margin:0;color:#201C00;font-size:1.4rem">
          📋 Nouveau message — Laverie Plus
        </h1>
      </div>
      <div style="background:#1A1C20;padding:32px;color:#E2E2E8;border-radius:0 0 8px 8px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#979177;font-size:.85rem;width:130px">Nom</td>
              <td style="padding:8px 0;font-weight:600">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#979177;font-size:.85rem">Téléphone</td>
              <td style="padding:8px 0">${phone || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#979177;font-size:.85rem">Email</td>
              <td style="padding:8px 0">${email || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#979177;font-size:.85rem">Service</td>
              <td style="padding:8px 0">${service || '—'}</td></tr>
        </table>
        <hr style="border:1px solid #282A2E;margin:20px 0"/>
        <h3 style="color:#FFE500;margin:0 0 12px">Message</h3>
        <p style="line-height:1.7;color:#C6C6C7;white-space:pre-wrap">${message}</p>
      </div>
      <p style="color:#555;font-size:.75rem;text-align:center;margin-top:16px">
        Reçu le ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Abidjan' })}
      </p>
    </div>`

  /* ── Email de confirmation au client ─────────────────────── */
  const clientHtml = email ? `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#FFE500;padding:24px 32px;border-radius:8px 8px 0 0">
        <h1 style="margin:0;color:#201C00;font-size:1.3rem">
          ✅ Message bien reçu, ${name} !
        </h1>
      </div>
      <div style="background:#1A1C20;padding:32px;color:#E2E2E8;border-radius:0 0 8px 8px">
        <p>Merci d'avoir contacté <strong>Laverie Plus</strong>.</p>
        <p>Nous reviendrons vers vous dans les plus brefs délais.</p>
        <hr style="border:1px solid #282A2E;margin:20px 0"/>
        <p style="color:#979177;font-size:.85rem">
          En cas d'urgence : 
          <a href="tel:0142507750" style="color:#FFE500;text-decoration:none">
            01 42 50 77 50
          </a>
        </p>
      </div>
    </div>` : null

  try {
    /* Envoi à l'admin */
    const adminResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject: `📋 Nouveau contact Laverie Plus — ${name}`,
        html: adminHtml,
      }),
    })

    if (!adminResp.ok) {
      const err = await adminResp.json()
      console.error('Resend admin error:', err)
      return res.status(500).json({ error: 'Erreur envoi email admin.' })
    }

    /* Envoi confirmation au client si email fourni */
    if (clientHtml && email) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [email],
          subject: `✅ Votre message a bien été reçu — Laverie Plus`,
          html: clientHtml,
        }),
      })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return res.status(500).json({ error: 'Erreur serveur.' })
  }
}
