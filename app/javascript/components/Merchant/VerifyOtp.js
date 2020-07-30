import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import useQuery from "Hooks/useQuery";
import { verifyOtp } from "Apis/MerchantApi";
import Input from "Common/Form/Input";
import Button from "Common/Button";

/**
 * There is a very similar component in User, we could reuse the same given the functions can be raised to parent.
 */
function VerifyOtp() {
  const params = useQuery();
  const tempId = params.get("id");

  const qrCodeData = (merchantData) => {
    const qrCodeData = JSON.stringify({
      id: merchantData.id,
      type: "Merchant",
    });
    return encodeURIComponent(qrCodeData);
  };

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tempId) {
      history.push("/merchant");
    }
  }, [params]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      target: {
        otp: { value },
      },
    } = event;
    setLoading(true);
    setError(null);
    try {
      const response = await verifyOtp(tempId, value);
      history.push(`/merchant/qr?code=${qrCodeData(response.data)}`);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4">
      <h2 className="font-bold text-gray-900 text-lg mb-2">Enter OTP</h2>
      <p className="text-sm text-gray-500">
        You would have received a one time password as SMS in your registered
        mobile number {params.get("mobile")}. Please provide the OTP here to
        verify your mobile number.{" "}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <Input
            pattern="\d*"
            maxLength="6"
            required
            label="One Time Password"
            name="otp"
            autoComplete="one-time-code"
            className="mt-6 mb-4"
          />
        </div>
        {error && (
          <div className="mb-2 text-red-600 text-center" role="alert">
            <p>Could not verify OTP. Please try again.</p>
          </div>
        )}
        <div className="flex items-center justify-between mt-6">
          <a
            className="inline-block font-medium text-sm text-blue-500 hover:text-blue-800"
            href="/merchant"
          >
            Back to Register
          </a>
          <div>
            <span className="block w-full rounded-md shadow-sm">
              <Button
                htmlType="submit"
                colorType="primary"
                sizeType="lg"
                loading={loading}
              >
                Verify OTP
              </Button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VerifyOtp;
