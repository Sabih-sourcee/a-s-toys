/**
 * A&S Toys order sink.
 * Bound to a Google Sheet. Deploy as a web app (see README).
 * Each order is appended to the Orders sheet and emailed to Sabih.
 */
var NOTIFY_EMAIL = 'bookspower218@gmail.com';
var SHEET_NAME = 'Orders';
var HEADERS = [
  'Timestamp',
  'Order ID',
  'Name',
  'Phone',
  'City',
  'Address',
  'Items',
  'Total PKR',
  'Payment',
  'Notes',
  'Email'
];

function doGet(e) {
  var params = (e && e.parameter) || {};
  var callback = String(params.callback || '').replace(/[^\w$]/g, '');
  var result;
  try {
    if (!params.payload) {
      result = { ok: true, service: 'as-toys-orders' };
    } else {
      result = saveOrder(JSON.parse(params.payload));
    }
  } catch (err) {
    result = { ok: false, error: String(err && err.message ? err.message : err) };
  }
  var body = callback ? callback + '(' + JSON.stringify(result) + ')' : JSON.stringify(result);
  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    return ContentService
      .createTextOutput(JSON.stringify(saveOrder(data)))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err && err.message ? err.message : err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveOrder(data) {
  data = data || {};
  var name = String(data.name || '').trim();
  var phone = String(data.phone || '').trim();
  var city = String(data.city || '').trim();
  var address = String(data.address || '').trim();
  var items = Array.isArray(data.items) ? data.items : [];
  var total = Number(data.total);
  if (!name || !phone || !city || !address) {
    throw new Error('Name, phone, city, and address are required.');
  }
  if (!items.length || !isFinite(total)) {
    throw new Error('Cart items and total are required.');
  }

  var itemText = items.map(function (item) {
    var qty = Number(item.quantity) || 0;
    var price = Number(item.price) || 0;
    return qty + 'x ' + (item.title || item.id || 'Item') + ' @ Rs ' + price;
  }).join('; ');

  var orderId = String(data.orderId || ('AST-' + new Date().getTime()));
  var notes = String(data.notes || '');
  var email = String(data.email || '');
  var payment = String(data.payment || 'COD');

  var sheet = getSheet_();
  sheet.appendRow([
    new Date(),
    orderId,
    name,
    phone,
    city,
    address,
    itemText,
    total,
    payment,
    notes,
    email
  ]);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New order ' + orderId + ' — A&S Toys',
    body: [
      'A new order was placed on usmanitoys.com.',
      '',
      'Order: ' + orderId,
      'Name: ' + name,
      'Phone: ' + phone,
      'City: ' + city,
      'Address: ' + address,
      email ? 'Email: ' + email : '',
      'Items: ' + itemText,
      'Total: Rs ' + total,
      'Payment: ' + payment,
      notes ? 'Notes: ' + notes : ''
    ].filter(String).join('\n')
  });

  return { ok: true, orderId: orderId };
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('Open this script from the Google Sheet (Extensions > Apps Script).');
  }
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}
