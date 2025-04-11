import { useFormContext } from "react-hook-form";

const PasswordInfo = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const formData = watch();

  // console.log(errors, "errors");

  return (
    <div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
          {...register("password")}
        />
        <p className="text-xs text-red-600">{errors?.password?.message}</p>
      </div>
      <div className="mt-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          {...register("confirmPassword")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <p className="text-xs text-red-600">
          {errors?.confirmPassword?.message}
        </p>
      </div>
      <ol class="list-decimal pl-6 space-y-2 text-gray-700 mt-5">
        <li class="text-xs font-medium">Minimum 8 characters</li>
        <li class="text-xs font-medium">At least one uppercase letter</li>
        <li class="text-xs font-medium">At least one digit</li>
        <li class="text-xs font-medium">
          Can include letters, numbers, and special characters
        </li>
      </ol>
    </div>
  );
};

export default PasswordInfo;
