const { createHmac } = await import('node:crypto');
import { request } from 'https';
import paypal from 'paypal-rest-sdk'
import Order from "../models/orders.js"
import Coupon from "../models/coupons.js"
import Product from "../models/products.js";
import Cart from '../models/cart.js'

export const PayMomo = (req, res) => {
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const orderInfo = 'THANH TOÁN MOMO';
    const partnerCode = 'MOMO';
    const redirectUrl = 'http://localhost:8080/api/momo';
    const ipnUrl = 'http://localhost:8080/api/momo';
    const requestType = "payWithMethod";
    const amount = req.body.total;
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    // Bổ sung
    const userId = req.body.userId;
    const couponId = req.body.couponId;
    const products = req.body.products;
    const status = req.body.status;
    const phone = req.body.phone;
    const address = req.body.address;
    const notes = req.body.notes;
    const extraData = `userId=${userId}&couponId=${couponId}&phone=${phone}&address=${address}&notes=${notes}&products=${JSON.stringify(products)}`;
    const orderGroupId = '';
    const autoCapture = true;
    const lang = 'vi';
    // Create raw signature
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    // Generate signature
    const signature = createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    // JSON object to send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature,
        // 
        userId: userId,
        couponId: couponId,
        products: products,
        status: status,
        phone: phone,
        address: address,
        notes: notes
    });

    // HTTPS request options
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        },
    };

    // Send the request and get the response
    const momoRequest = request(options, momoResponse => {
        momoResponse.setEncoding('utf8');
        momoResponse.on('data', body => {
            res.json({ payUrl: JSON.parse(body).payUrl });
        });
        momoResponse.on('end', () => {
            console.log('No more data in response.');
        });
    });
    momoRequest.on('error', error => {
        console.log(`Problem with request: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    });

    // Write data to request body
    console.log("Sending....");
    momoRequest.write(requestBody);
    momoRequest.end();
};



export const MomoSuccess = async (req, res) => {
    const body = req.query;
    const total = body.amount
    const paymentId = body.orderId;
    const paymentCode = body.requestId;
    const payerId = body.orderInfo
    // Tạo một đối tượng để lưu trữ các giá trị
    const data = {};

    // Tách chuỗi thành các cặp key-value dựa trên dấu "&"
    const keyValuePairs = body.extraData.split('&');

    // Lặp qua từng cặp key-value
    keyValuePairs.forEach((keyValue) => {
        // Tách mỗi cặp thành key và value dựa trên dấu "="
        const [key, value] = keyValue.split('=');

        // Kiểm tra nếu giá trị là một chuỗi JSON
        if (key === 'products') {
            // Sử dụng JSON.parse() để chuyển thành đối tượng JavaScript
            data[key] = JSON.parse(decodeURIComponent(value));
        } else {
            // Lưu trữ các giá trị khác
            data[key] = decodeURIComponent(value);
        }
    });

    // Bây giờ bạn có thể truy cập các giá trị từ đối tượng data
    const userId = data.userId;
    const couponId = data.couponId;
    const phone = data.phone;
    const address = data.address;
    const products = data.products;
    const notes = data.notes;

    // Xử lý dữ liệu theo cách bạn muốn ở đây
    const formattedData = {
        userId,
        couponId,
        products: products,
        total: Number(total),
        phone,
        address,
        notes,
        paymentId,
        paymentCode,
        payerId
    };
    if (formattedData.notes === 'undefined') {
        // Chuyển chuỗi "null" thành giá trị null
        formattedData.notes = undefined;
    }
    if (formattedData.couponId === 'null') {
        // Chuyển chuỗi "null" thành giá trị null
        formattedData.couponId = null;
    }
    // Kiểm tra xem có phiếu giảm giá được sử dụng trong đơn hàng không
    if (formattedData.couponId !== null) {
        // Tăng số lượng phiếu giảm giá đã sử dụng lên 1
        const coupon = await Coupon.findById(formattedData.couponId);
        if (coupon) {
            coupon.coupon_quantity -= 1;
            await coupon.save();
        }
    }
    for (const item of formattedData.products) {
        const product = await Product.findById(item.productId);
        if (product) {
            product.stock_quantity -= item.stock_quantity; // Giảm số lượng theo số lượng trong giỏ hàng
            product.sold_quantity += item.stock_quantity; // Tăng view theo số lượng trong giỏ hàng
            await product.save();
        }
    }

    await Order.create(formattedData);
    const cartExist = await Cart.findOne({ userId });
    cartExist.products = []; // Xoá tất cả sản phẩm trong giỏ hàng
    cartExist.total = 0;// Đặt tổng giá trị về 0
    cartExist.couponId = null
    await cartExist.save();

    res.redirect('http://localhost:4200/orders');
}



// 
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQyc1P8zTxcYbL9RgIIeJDyrClQl8pCATFKLf9o-BW5FqkisSdtBMlblVOg611WhgQg429hx6JUnjdeE',
    'client_secret': 'ENYh-J6nt272nE7bQ_nWtAUijIwvlt0Yf9IYU2-Y6vDBT6lZYYw6-xNMSqt9vISwLlPC6vHs-_T6s3dx'
});

export const PayPal = (req, res) => {
    const { products, userId, couponId, phone, address, notes } = req.body
    const exchangeRate = 1 / 24057
    const transformedProducts = products.map(product => {
        const priceUsd = (product.product_price * exchangeRate).toFixed(2);
        return {
            sku: product.productId,
            name: product.product_name,
            quantity: product.stock_quantity,
            image_url: product.image,
            description: product.product_price,
            price: priceUsd,
            currency: 'USD',
        };
    });
    const totalMoney = transformedProducts.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
    }, 0);
    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: `http://localhost:8080/api/success`,
            cancel_url: `http://localhost:5173/carts`,
        },
        transactions: [
            {
                item_list: {
                    items: transformedProducts,
                },
                amount: {
                    currency: 'USD',
                    total: totalMoney.toString(),
                },
                description: 'Hat for the best team ever',
                custom: JSON.stringify({
                    phone: phone,
                    address: address,
                    userId: userId,
                    couponId: couponId,
                    notes: notes
                }),
            },
        ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.status(400).json(error)
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    // Trả về đường link dưới dạng JSON response
                    res.json({ approval_url: payment.links[i].href });
                    return; // Dừng hàm và kết thúc response
                }
            }
        }
    });
}


export const PayPalSuccess = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const token = req.query.token;
    const execute_payment_json = {
        "payer_id": payerId,
    };
    paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
        if (error) {
            console.log(error.response);
            // Xử lý lỗi ở đây nếu cần
        } else {
            // Truy cập thông tin giao dịch từ đối tượng payment
            const productList = payment.transactions[0].item_list.items.map(item => {
                return {
                    product_name: item.name,
                    stock_quantity: item.quantity,
                    product_price: Number(item.description),
                    productId: item.sku,
                    image: item.image_url,
                };
            });
            // Bây giờ bạn có thể sử dụng danh sách sản phẩm productList trong mã của bạn
            const customData = JSON.parse(payment.transactions[0].custom);
            const phone = customData.phone;
            const address = customData.address;
            const userId = customData.userId;
            const couponId = customData.couponId;
            const notes = customData.notes;
            const totalMoney = productList.reduce((acc, product) => {
                return acc + (product.product_price * product.stock_quantity);
            }, 0);
            // Tạo đối tượng có định dạng bạn mong muốn
            const formattedData = {
                products: productList,
                total: totalMoney,
                phone,
                address,
                userId,
                couponId,
                notes,
                paymentId,
                paymentCode: token,
                payerId
            };
            if (formattedData.notes === 'undefined') {
                // Chuyển chuỗi "null" thành giá trị null
                formattedData.notes = undefined;
            }
            if (formattedData.couponId === 'null') {
                // Chuyển chuỗi "null" thành giá trị null
                formattedData.couponId = null;
            }
            // Kiểm tra xem có phiếu giảm giá được sử dụng trong đơn hàng không
            if (formattedData.couponId !== null) {
                // Tăng số lượng phiếu giảm giá đã sử dụng lên 1
                const coupon = await Coupon.findById(formattedData.couponId);
                if (coupon && coupon.coupon_quantity > 0) {
                    coupon.coupon_quantity -= 1;
                    await coupon.save();
                } else {
                    res.send("Đã hết phiếu giảm giá");
                    return
                }
            }
            for (const item of formattedData.products) {
                const product = await Product.findById(item.productId);
                if (product) {
                    product.stock_quantity -= item.stock_quantity; // Giảm số lượng theo số lượng trong giỏ hàng
                    product.sold_quantity += item.stock_quantity; // Tăng view theo số lượng trong giỏ hàng
                    await product.save();
                }
            }
            await Order.create(formattedData);
            const cartExist = await Cart.findOne({ userId });
            cartExist.products = []; // Xoá tất cả sản phẩm trong giỏ hàng
            cartExist.total = 0;// Đặt tổng giá trị về 0
            cartExist.couponId = null
            await cartExist.save();
            res.redirect('http://localhost:4200/orders'); // Thay đổi '/other-page' thành URL của trang khác
        }
    });
}