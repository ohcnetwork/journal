import React from "react";

import Input from "Common/Form/Input";
import Button from "Common/Button";

function SignUpOtp() {
  return (
    <div className="py-4">
      <h2 className="font-bold text-gray-900 text-lg mb-2">Enter OTP</h2>
      <p className="text-sm text-gray-500">
        You would have received a one time password from us in your registered
        mobile number. Please provide the OTP here to verify your mobile number.{" "}
      </p>
      <form>
        <div className="mt-2 mb-1">
          <Input
            pattern="\d*"
            maxLength="6"
            required
            label="One Time Password"
            name="otp"
            autoComplete="one-time-code"
          />
        </div>
        <div className="flex items-center justify-between">
          <a
            className="inline-block font-medium text-sm text-blue-500 hover:text-blue-800"
            href="/"
          >
            Back to Sign Up
          </a>
          <div>
            <span className="block w-full rounded-md shadow-sm">
              <Button htmlType="submit" colorType="primary" sizeType="lg">
                Verify OTP
              </Button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpOtp;
