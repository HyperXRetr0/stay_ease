import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-blue-700">
        <label className="text-sm font-semibold text-white">
          Adults
          <input
            type="number"
            className="border rounded w-full py-2 px-3 font-normal text-gray-700"
            min={1}
            {...register("adultCount", { required: "This field in required" })}
          />
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>

        <label className="text-sm font-semibold text-white">
          Children
          <input
            type="number"
            className="border rounded w-full py-2 px-3 font-normal text-gray-700"
            min={0}
            {...register("childCount", { required: "This field in required" })}
          />
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
