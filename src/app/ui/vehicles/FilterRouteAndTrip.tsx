'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname,useSearchParams,useRouter  } from 'next/navigation';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { coba } from '@/app/lib/data';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface RouteOption {
  id: string;
  label : string
}


export default function FilterRouteAndTrip({routeOptions,tripOptions}:{routeOptions : RouteOption[], tripOptions : RouteOption[]}) {
  const [valueRoute, setValueRoute] = React.useState<RouteOption | null>(null);
  const [inputValueRoute, setInputValueRoute] = React.useState('');
  const [valueTrip, setValueTrip] = React.useState<RouteOption | null>(null);
  const [inputValueTrip, setInputValueTrip] = React.useState('');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  // console.log('data : ',routeOptions);
  const filterRouteInput = useDebouncedCallback((term) => {
          try {
            const params = new URLSearchParams(searchParams);
            if (term == null) {
              params.delete('filter[route]');
              replace(`${pathname}?${params}`);
            }else{
              console.log(`Searching... ${term}`);
              params.set(`filter[route]`, term);
              replace(`${pathname}?${params}`);
            }
          } catch (error) {
            console.log(error);
          }
      }, 300);
      const filterTripInput = useDebouncedCallback((term) => {
          try {
            const params = new URLSearchParams(searchParams);
            if (term == null) {
              params.delete('filter[trip]');
              replace(`${pathname}?${params}`);
            }else{
              console.log(`Searching... ${term}`);
              params.set(`filter[trip]`, term);
              replace(`${pathname}?${params}`);
            }
          } catch (error) {
            console.log(error);
          }
      }, 300);
  const handleExport = () => {
    // This function only runs when a user clicks the button 
    // (which only happens in the browser), so document will be defined.
    const csvContent = routeOptions.map(opt => `${opt.id},${opt.label}`).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a"); // This is safe here
    link.href = url;
    link.download = "data.csv";
    link.click();
    
  };
  return (
    <div>
    <Autocomplete
      value={valueRoute} 
      style={{ width: 500 }}
      onChange={(_event, newValue) => {
        setValueRoute(newValue);
        filterRouteInput(newValue ? newValue.id : null);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      
      options={routeOptions}
      getOptionLabel={(option) => option.label || ""}
      renderInput={(params) => (
        <TextField {...params} label="Select Route" />
      )}
    />
    {valueRoute &&
      <Autocomplete
        value={valueTrip}
        style={{ width: 500 }}
        onChange={(_event, newValue) => {
          setValueTrip(newValue);
          filterTripInput(newValue ? newValue.id : null);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        
        options={tripOptions}
        getOptionLabel={(option) => option.label || ""}
        renderInput={(params) => (
          <TextField {...params} label="Select Trip" />
        )}
      />
    }
    <div>
      {inputValueRoute}
    </div>
    <div>
        {valueRoute?.id}
    </div>
      {inputValueTrip}
    </div>
  );
}