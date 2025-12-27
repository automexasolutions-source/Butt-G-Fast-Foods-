import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const notes = formData.get("notes") as string
    const cart = JSON.parse(formData.get("cart") as string)
    const total = formData.get("total") as string
    const screenshot = formData.get("screenshot") as File

    // Generate order ID
    const orderId = `BG${Date.now()}`

    // Convert screenshot to base64 for email attachment
    const bytes = await screenshot.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Screenshot = buffer.toString("base64")

    // Create nodemailer transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email to customer
    const customerEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: black; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .item { padding: 10px 0; border-bottom: 1px solid #eee; }
            .total { font-size: 24px; font-weight: bold; color: #fbbf24; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 36px;">Butt G Fast Foods</h1>
              <p style="margin: 10px 0 0 0;">Order Confirmation</p>
            </div>
            <div class="content">
              <h2>Thank you for your order, ${name}!</h2>
              <p>Your order has been received and is being processed.</p>
              
              <div class="order-details">
                <h3>Order #${orderId}</h3>
                <p><strong>Delivery Address:</strong> ${address}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
                
                <h4>Order Items:</h4>
                ${cart
                  .map(
                    (item: any) => `
                  <div class="item">
                    <strong>${item.quantity}x ${item.item.name}</strong>
                    ${item.selectedSize ? ` (${item.selectedSize.name})` : ""}
                    <span style="float: right;">Rs ${item.price * item.quantity}/-</span>
                  </div>
                `,
                  )
                  .join("")}
                
                <div class="total">
                  <div style="display: flex; justify-content: space-between; padding-top: 20px;">
                    <span>Total (including delivery):</span>
                    <span>Rs ${total}/-</span>
                  </div>
                </div>
              </div>
              
              <p>We'll start preparing your order once payment is verified. Expected delivery time: 30-45 minutes.</p>
              <p style="color: #666; font-size: 14px;">You'll receive another email once your order is out for delivery.</p>
            </div>
            <div class="footer">
              <p>Butt G Fast Foods | 18-19-B Commercial, Sher Shah Colony, Raiwind Road, Lahore</p>
              <p>Call us: 0321 4500552</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Email to restaurant
    const restaurantEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .item { padding: 10px 0; border-bottom: 1px solid #eee; }
            .highlight { background: #fbbf24; color: black; padding: 15px; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NEW ORDER RECEIVED!</h1>
              <h2>Order #${orderId}</h2>
            </div>
            <div class="content">
              <div class="highlight">
                TOTAL: Rs ${total}/-
              </div>
              
              <div class="order-details">
                <h3>Customer Details:</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Address:</strong> ${address}</p>
                ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
                
                <h3>Order Items:</h3>
                ${cart
                  .map(
                    (item: any) => `
                  <div class="item">
                    <strong>${item.quantity}x ${item.item.name}</strong>
                    ${item.selectedSize ? ` (${item.selectedSize.name})` : ""}
                    <span style="float: right;">Rs ${item.price * item.quantity}/-</span>
                  </div>
                `,
                  )
                  .join("")}
              </div>
              
              <p style="color: #dc2626; font-weight: bold;">Payment screenshot is attached to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email to customer
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: `Order Confirmation #${orderId} - Butt G Fast Foods`,
      html: customerEmailHTML,
    })

    // Send email to restaurant with payment screenshot
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.RESTAURANT_EMAIL || process.env.SMTP_USER,
      subject: `NEW ORDER #${orderId} - Rs ${total}`,
      html: restaurantEmailHTML,
      attachments: [
        {
          filename: `payment-${orderId}.${screenshot.name.split(".").pop()}`,
          content: base64Screenshot,
          encoding: "base64",
        },
      ],
    })

    return NextResponse.json({ success: true, orderId })
  } catch (error) {
    console.error("[v0] Order submission error:", error)
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 })
  }
}
