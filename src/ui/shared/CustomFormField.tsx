import { createContext } from "react"

const FormField = createContext()
const InputField = ({ label, value, icon: Icon, multiline }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-electricCyan-300">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon size={18} className="text-neonPink-300" />
        </div>
      )}
      {multiline ? (
        <textarea
          className={`w-full bg-customBlue-900 text-electricCyan-200 rounded-lg py-2 px-4 ${
            Icon ? "pl-10" : ""
          } focus:ring-2 focus:ring-electricCyan-500 focus:border-transparent`}
          rows={3}
          defaultValue={value}
        />
      ) : (
        <input
          type="text"
          className={`w-full bg-customBlue-900 text-electricCyan-200 rounded-lg py-2 px-4 ${
            Icon ? "pl-10" : ""
          } focus:ring-2 focus:ring-electricCyan-500 focus:border-transparent`}
          defaultValue={value}
        />
      )}
    </div>
  </div>
