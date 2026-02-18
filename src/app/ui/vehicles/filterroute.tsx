'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname,useSearchParams,useRouter  } from 'next/navigation';

interface RouteOption {
  id: string;
  label : string
}

export default function FilterRoute({routeOptions}:{routeOptions : RouteOption[]}) {
  const [value, setValue] = React.useState<RouteOption | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  // const [options, setOptions] = React.useState<RouteOption[]>([]);
  // const [loading, setLoading] = React.useState(true);
  // const [num, setNum] = React.useState<number>(0);
  // const mounted = useRef(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  // console.log('data : ',routeOptions);
  const handleChange = useDebouncedCallback((term) => {
          try {
            const params = new URLSearchParams(searchParams);
            if (term == null) {
              params.delete('filter[route]');
              replace(`${pathname}?${params}`);
            }else{
              console.log(`Searching... ${term}`);
              params.set(`filter[route]`, term.toString());
              replace(`${pathname}?${params}`);
            }
          } catch (error) {
            console.log(error);
          }
      }, 300);


  
  return (
    <div>
      <div><Autocomplete
        multiple={false}
        value={value}
        onChange={(_event: React.SyntheticEvent, newValue: RouteOption | null) => {
          setValue(newValue);
          handleChange(newValue?.id);
          console.log(newValue?.id);
        }}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
          console.log('newinput',newInputValue);
        }}
        id="route-filter-autocomplete"
        options={routeOptions}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ width: 200 }}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Select Route" 
            variant="outlined"
          />
        )}
      /></div>
      
    </div>
  );
}