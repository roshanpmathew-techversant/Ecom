import React, { useState } from "react";
import QRCode from "react-qr-code"; // npm i react-qr-code

const Payment = ({ display }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Map each payment option to a QR value (could be real payment URLs)
  const qrLinks = {
    google: "https://example.com/google-pay",
    apple: "https://example.com/apple-pay",
    paypal: "https://example.com/paypal",
    visa: "https://example.com/visa-pay",
  };

  const handlePaymentClick = (option) => {
    setSelectedPayment(option);
  };

  return (
    <div
      className={`${display} w-[300px] p-2 rounded-lg shadow flex flex-col items-center justify-center gap-2 bg-slate-50`}
    >
      <p className="capitalize font-semibold self-start">Payment method</p>

      {/* Payment options */}
      {["google", "apple", "paypal", "visa"].map((option) => (
        <label
          key={option}
          className="inline-flex justify-between w-full items-center rounded-lg p-2 border border-transparent hover:bg-slate-200 cursor-pointer transition-all duration-300"
        >
          <div className="inline-flex items-center justify-center gap-2">
            <p className="font-semibold">
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </p>
          </div>
          <input
            type="radio"
            name="payment"
            value={option}
            onChange={() => handlePaymentClick(option)}
            className="hidden"
          />
        </label>
      ))}

      {/* QR Code Overlay */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center">
            <p className="mb-4 font-semibold">
              Scan to Pay with{" "}
              {selectedPayment.charAt(0).toUpperCase() +
                selectedPayment.slice(1)}
            </p>
            <QRCode value={qrLinks[selectedPayment]} size={150} />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setSelectedPayment(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
