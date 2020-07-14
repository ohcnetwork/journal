import React from 'react';
import SignUpOtp from './SignUpOtp'
import signUpThump from './signUpThump.jpg'

function SignUp() {
  return (
    <div className="w-full h-full flex justify-center items-center">
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full h-64" src={signUpThump} alt="signUpThump"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Sign Up</div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Full Name" required/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
              Date of Birth
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dob" type="date" placeholder="Date of Birth" required/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
              Mobile Number
            </label>
            +91<input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="mobileNumber" maxlength="10" type="tel" required/>
            <p className="text-red-500 text-xs italic">Please provide your 10 digit Mobile number.</p>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button">
              Send OTP
            </button>
          </div>
        </form>
      </div>
   <SignUpOtp />
    </div>
    </div>
  );
}

export default SignUp;
