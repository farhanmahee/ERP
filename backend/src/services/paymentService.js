const axios = require('axios');

const SSLCommerz = {
  initiatePayment: async (paymentData) => {
    const storeId = process.env.SSLCOMMERZ_STORE_ID;
    const storePassword = process.env.SSLCOMMERZ_STORE_PASSWORD;
    const isLive = process.env.SSLCOMMERZ_IS_LIVE === 'true';

    const url = isLive
      ? 'https://securepay.sslcommerz.com/gwprocess/v4/api.php'
      : 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

    const data = {
      store_id: storeId,
      store_passwd: storePassword,
      total_amount: paymentData.amount,
      currency: paymentData.currency || 'BDT',
      tran_id: paymentData.transactionId,
      success_url: paymentData.successUrl,
      fail_url: paymentData.failUrl,
      cancel_url: paymentData.cancelUrl,
      ipn_url: paymentData.ipnUrl,
      product_name: paymentData.productName,
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_phone: paymentData.customerPhone,
      shipping_method: 'NO',
      product_profile: 'general',
    };

    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw new Error('Payment initiation failed');
    }
  },
};

module.exports = SSLCommerz;
