import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const AddressInfo = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const formData = watch();

  // console.log(errors, "errors");

  return (
    <>
      <div>
        <Label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone Number
        </Label>
        <Input
          type="tel"
          name="phone"
          id="phone"
          maxLength={15}
          inputMode="numeric"
          pattern="[0-9]*"
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter phone number"
          {...register("phone", {
            required: "Phone number is required",
            maxLength: {
              value: 15,
              message: "Phone number must not exceed 15 digits",
            },
            pattern: {
              value: /^[0-9]*$/,
              message: "Phone number must contain only digits",
            },
          })}
        />
        <p className="text-xs text-red-600">{errors?.phone?.message}</p>
      </div>

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
          maxLength={300}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your home address"
          rows={3}
          {...register("homeAddress", {
            maxLength: {
              value: 300,
              message: "Home address must not exceed 300 characters",
            },
          })}
        />
        <p className="text-xs text-red-600">{errors?.homeAddress?.message}</p>
      </div>

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
          maxLength={300}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your mailing address"
          rows={3}
          {...register("mailingAddress", {
            maxLength: {
              value: 300,
              message: "Mailing address must not exceed 300 characters",
            },
          })}
        />
        <p className="text-xs text-red-600">{errors?.mailingAddress?.message}</p>
      </div>

    </>
  );
};

export default AddressInfo;