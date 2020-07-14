import React from 'react';
function SignUpOtp() {
    return (
        <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Enter OTP</div>
        <form>
          <div className="mb-4">
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="mobileNumber" pattern="\d*" maxlength="6"required/>
            <p className="text-red-500 text-xs italic">Please provide 6 digit OTP</p>
          </div>
  
          <div className="flex items-center justify-between">
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Back to Sign Up page
            </a>
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Verify OTP
          </button>
          </div>
        </form>
      </div>
    );
  }
  
  export default SignUpOtp;
  