import React, { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { SelectChangeEvent } from "@mui/material/Select";

interface FilterDrawerProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isOpen: boolean;
  toggleDrawer: Function;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  isOpen,
  toggleDrawer,
}) => {
  const [selectedLocal, setSelectedLocal] = useState(selectedCategory);
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedLocal(event.target.value);
  };

  const handleApply = () => {
    setSelectedCategory(selectedLocal);
    toggleDrawer(false)
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      disableSwipeToOpen={true}
      onClose={() => toggleDrawer(false)}
      onOpen={() => {}}
      PaperProps={{
        style: {
          height: "fit-content",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        },
      }}
    >
      <div className="flex flex-col min-h-[35vh] restaraunt-backround">
        <div className="px-4 pt-4 flex-1">
          <Typography variant="h6" gutterBottom>
            Filter
          </Typography>
          <Box mb={2}>
            <Select value={selectedLocal} onChange={handleChange} fullWidth>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </div>
        <div
          
          className="bg-primary text-center font-semibold text-white py-3 cursor-pointer"
          onClick={handleApply}
          
        >
          Apply
        </div>
      </div>
    </SwipeableDrawer>
  );
};

export default FilterDrawer;
