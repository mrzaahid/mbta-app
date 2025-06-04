import {  ClockIcon, Cog6ToothIcon, StopCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function VehiclesStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-sky-700 text-amber-400': status === 'INCOMING_AT',
          'bg-green-500 text-white': status === 'STOPPED_AT',
          'bg-red-300 text-yellow' : status === 'IN_TRANSIT_TO',
        },
      )}
    >
      {status === 'INCOMING_AT' ? (
        <>
          Incoming
          <ClockIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'STOPPED_AT' ? (
        <>
          Stopped
          <StopCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'IN_TRANSIT_TO' ? (
        <>
          In Transit
          <Cog6ToothIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
