const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm text-slate-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-violet-500"
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;