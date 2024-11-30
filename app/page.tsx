'use client'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from "react";

import NextPreviousBtn from "@/components/nextPreviousBtn/Index";
import PageData from "@/components/pageData/Index";
import Demo from '@/components/demo/Index';

export interface RootObject {
  count: number;
  next: string | null;
  previous: null | null;
  results: Result[];
}

export interface Result {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQuery />
        {false && <Demo />}
      </QueryClientProvider>
    </>
  );
}

const ReactQuery = () => {

  const [numPage, setNumPage] = useState(1);

  // Access the client
  const queryClient = useQueryClient()

  const fetchPlanets = async (/* { queryKey } */params: number | {
    id: number;
    title: string;
    page: number;
  }) => {
    console.log('🚀 => file: page.tsx:60 => fetchPlanets => params:', params)
    const { queryKey } = params

    const response = await fetch(
      `https://swapi.dev/api/planets/?page=${queryKey[1]}`
    );
    return response.json();
  };

  // Queries
  const {
    data,
    isLoading,
    error,
    isError,
    isFetching,
    status,
    isSuccess,
    dataUpdatedAt,
    refetch,
  } = useQuery<RootObject>({ queryKey: ['todos', numPage], queryFn: fetchPlanets })


  // Mutations
  const mutation = useMutation({
    mutationFn: fetchPlanets,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const getMutate = () => {
    mutation.mutate({
      id: Date.now(),
      title: 'Do Laundry',
      page: numPage
    })
  }

  return (
    <div className="max-w-[600px] mx-auto">


      <Title />
      <DataUpdatedAt time={dataUpdatedAt} />
      <NextPreviousBtn page={numPage} setNumPage={setNumPage}
        previous={data?.previous || null} next={data?.next || null}>
        <button onClick={getMutate} className='border-2 border-solid p-2 rounded-lg'>
          call mutate
        </button>
      </NextPreviousBtn>
      <div className="w-full">
        {
          isFetching && <div>isFetching...</div>
        }
        {
          isLoading && <div>Loading...</div>
        }
        {
          isError && <div>Error: {JSON.stringify(error)}</div>
        }
        {
          isSuccess && (data.results?.map(c => <PageData page={c} key={`${c.name}${c.orbital_period}`} />))
        }
        {
          isSuccess && (false && <span className="break-words">{JSON.stringify(data)}</span>)
        }
      </div>
    </div>
  )
}

const Title = () => {
  return (
    <h1 className="text-3xl text-yellow-200 text-center my-5">React Query</h1>
  )
}

const DataUpdatedAt = ({
  time,
}: {
  time: number
}) => {

  const getTimeToData = () => {
    const _t = new Date(time)
    return _t.toLocaleTimeString()
  }

  return (
    <h5 className="mb-1 overflow-hidden">
      <span className="mr-1.5">data updated at:</span>
      <span>{getTimeToData()}</span>
    </h5>
  )
}

