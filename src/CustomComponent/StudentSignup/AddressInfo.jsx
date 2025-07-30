import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const MAX_ADDRESS_LENGTH = 300;

const AddressInfo = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const formData = watch();

  const homeAddress = formData?.homeAddress || "";
  const mailingAddress = formData?.mailingAddress || "";

  return (
    <>
      {/* Phone Number */}
      <div className="mb-6">
        <Label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone Number <span className="text-red-600">*</span>
        </Label>
        <div className="relative ">
          <PhoneInput
            country={'us'}
            value={formData?.phone || ""}
            onChange={(value) => setValue("phone", value)}
            
            inputClass="w-full rounded-lg pl-12 py-2 bg-gray-50 " 
            disableDropdown={false}
          />
          <p className="text-xs text-red-600 mt-1">{errors?.phone?.message}</p>
        </div>
      </div>



      {/* Home Address */}
      <div>
        <Label
          htmlFor="homeAddress"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Home Address
        </Label>
        <Textarea
          name="homeAddress"
          id="homeAddress"
          maxLength={MAX_ADDRESS_LENGTH}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your home address"
          rows={3}
          {...register("homeAddress", {
            maxLength: {
              value: MAX_ADDRESS_LENGTH,
              message: "Home address must not exceed 300 characters",
            },
          })}
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>{errors?.homeAddress?.message}</span>
          <span>{homeAddress.length}/{MAX_ADDRESS_LENGTH}</span>
        </div>
      </div>

      {/* Mailing Address */}
      <div>
        <Label
          htmlFor="mailingAddress"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Mailing Address (if different from home address)
        </Label>
        <Textarea
          name="mailingAddress"
          id="mailingAddress"
          maxLength={MAX_ADDRESS_LENGTH}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your mailing address"
          rows={3}
          {...register("mailingAddress", {
            maxLength: {
              value: MAX_ADDRESS_LENGTH,
              message: "Mailing address must not exceed 300 characters",
            },
          })}
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>{errors?.mailingAddress?.message}</span>
          <span>{mailingAddress.length}/{MAX_ADDRESS_LENGTH}</span>
        </div>
      </div>
    </>
  );
};

export default AddressInfo;