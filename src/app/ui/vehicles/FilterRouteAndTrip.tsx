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


export default function FilterRouteAndTrip({routeOptions}:{routeOptions : RouteOption[]}) {
  const [valueRoute, setValueRoute] = React.useState<RouteOption[] | null>(null);
  const [inputValueRoute, setInputValueRoute] = React.useState('');
  const [valueTrip, setValueTrip] = React.useState<RouteOption[] | null>(null);
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
  return (
    <div>
        <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={routeOptions}
      disableCloseOnSelect
      onChange={(_event: React.SyntheticEvent, newValue: RouteOption[] | null) => {
          setValueRoute(newValue);
          setInputValueRoute(newValue?.map((option) => option.id).join(', ')||'');
          filterRouteInput(newValue?.map((option) => option.id).join(', '));
        //   filterRouteInput(newValue?.map);
          console.log(newValue?.toString());
        }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        );
      }}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
    />
     {/* <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={routeOptions}
      disableCloseOnSelect
      onChange={(_event: React.SyntheticEvent, newValue: RouteOption[] | null) => {
          setValueRoute(newValue);
          setInputValueRoute(newValue?.map((option) => option.id).join(', ')||'');
          filterRouteInput(newValue?.map((option) => option.id).join(', '));
        //   filterRouteInput(newValue?.map);
          console.log(newValue?.toString());
        }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        );
      }}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
    /> */}
    <div>
      {inputValueRoute}
    </div>
    <div>
        {valueRoute?.map((option) => option.id).join(', ')}
    </div>
      
    </div>
  );
}