import React from "react";

import Input from "Common/Form/Input";

function GenerateForm() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Generate QR Code
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
          Filling this form will generate a QR code for your shop/establishment.
        </p>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
            <form>
              <Input
                name="name"
                label="Shop Name"
                required
                placeholder="Name of the establishment/shop/premises"
              />
              <Input
                name="phone"
                label="Mobile number"
                required
                placeholder="10 digit mobile number"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateForm;
