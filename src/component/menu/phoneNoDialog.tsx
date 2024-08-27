
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { inputStyles } from "../styles/menu/input";
export default function PhoneNoDialog({addPhoneNumber,handleNumberChange,showDialog,validatePhoneNumber}:{showDialog: boolean, handleNumberChange: (event: any) => void, addPhoneNumber: () => void, validatePhoneNumber: () => boolean | undefined}) {
    return <Dialog open={showDialog} fullWidth>
      <div className="h-56 p-6">
        <div className="text-3xl text-black font-bold text-center pb-4">
          Welcome
        </div>
        <TextField
          label="Enter Mobile Number"
          fullWidth
          onChange={handleNumberChange}
          sx={inputStyles} />
        <div
          onClick={() => {
            addPhoneNumber();
          } }
          className={`text-white font-semibold text-base  mt-4 p-3 rounded text-center ${validatePhoneNumber() ? "bg-primary" : "bg-gray-400"} `}
        >
          View Menu
        </div>
      </div>
    </Dialog>;
  }
  