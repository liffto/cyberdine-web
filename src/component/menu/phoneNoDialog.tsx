
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { inputStyles } from "../styles/menu/input";
export default function PhoneNoDialog({ addPhoneNumber, handleNumberChange, handleNameChange, showDialog, validatePhoneNumber }: { showDialog: boolean, handleNumberChange: (event: any) => void, handleNameChange: (event: any) => void, addPhoneNumber: () => void, validatePhoneNumber: () => boolean | undefined }) {
  return <Dialog open={showDialog} fullWidth>
    <div className="h-84 p-6">
      <div className="text-3xl text-black font-bold text-center pb-4">
        Welcome
      </div>
      <div className="mb-5">
        <TextField
          label="Enter Name"
          fullWidth
          onChange={handleNameChange}
          sx={inputStyles} />
      </div>
      <TextField
        label="Enter Mobile Number"
        fullWidth
        onChange={(e) => {
          const value = e.target.value;
          // Allow only digits and limit to 10 characters
          if (/^\d{0,10}$/.test(value)) {
            handleNumberChange(e);
          }
        }}
        inputProps={{ maxLength: 10 }}
        sx={inputStyles} />

      <div
        onClick={() => {
          addPhoneNumber();
        }}
        className={`text-white font-semibold text-base  mt-4 p-3 rounded text-center ${validatePhoneNumber() ? "bg-primary" : "bg-gray-400"} `}
      >
        View Menu
      </div>
    </div>
  </Dialog>;
}
