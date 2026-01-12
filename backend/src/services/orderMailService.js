const sendEmail = require("../utils/sendEmail");

const sendOrderConfirmationMail = async (user, order) => {

  const itemsRows = order.items
    .map(
      (item, index) => `
      <tr>
        <td style="padding:8px; border: 1px solid #ddd;">${index + 1}</td>
        <td style="padding:8px; border: 1px solid #ddd;">${item.product.name}</td>
        <td style="padding:8px; border: 1px solid #ddd;">${item.size || "-"}</td>
        <td style="padding:8px; border: 1px solid #ddd;">${item.quantity}</td>
        <td style="padding:8px; border: 1px solid #ddd;">Rs.${item.product.price}</td>
        <td style="padding:8px; border: 1px solid #ddd;">Rs.${item.product.price * item.quantity}</td>
      </tr>`
    )
    .join("");

  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f6f6f6;
        padding: 20px;
      }
      .container {
        max-width: 700px;
        margin: auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.05);
      }
      h2 { color: #333; }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
      }
      th, td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
      .total {
        margin-top: 15px;
        font-weight: bold;
        font-size: 16px;
        text-align: right;
      }
      .footer {
        margin-top: 25px;
        font-size: 13px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Order Confirmation</h2>
      <p>Hi <strong>${user.name}</strong>,</p>

      <p>Thank you for your order! Here are your order details:</p>

      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Order Date:</strong> ${order.orderDate.toDateString()}</p>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <p class="total">Total Price: Rs.${order.totalPrice}</p>

      <p>We hope you enjoy your purchase...</p>

      <div class="footer">
        <p>Thank you for shopping with us!</p>
      </div>
    </div>
  </body>
  </html>
  `;

  await sendEmail({
    to: user.email,
    subject: `Order Confirmation - ${order._id}`,
    html: emailHtml,
  });
};

module.exports = sendOrderConfirmationMail;
