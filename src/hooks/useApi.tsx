import { useEffect, useMemo, useState } from "react";
import { ApiRoutesId } from "../constants/ApiRoutesId";

type Queries = {
  name?: string;
  chapter?: string;
  nationality?: string;
  family?: string;
  abilities?: string;
  isHuman?: boolean;
  living?: string;
  catchphrase?: string;
  alternateName?: string;
  standUser?: string;
  battlecry?: string;
  page: number;
}

export type Stand = {
  abilities: string;
  alternateName: string;
  battlecry: string;
  chapter: string;
  id: string;
  image: string;
  japaneseName: string;
  name: string;
  standUser: string;
  asset: string;
}

const ITEM_PER_PAGE_COUNT = 20;

function useApi<T>(route: ApiRoutesId, query: Queries = { page: 1 }): T[] {
  
  const [apiDatas, setApiDatas] = useState<T[]>([]);
  useEffect(() => {
    const getDatas = async () => {
      return new Promise((resolve, reject) => {
        const promises = Array.from(
          { 
            length: query.page * ITEM_PER_PAGE_COUNT
          }, 
          async (_, id) => {
            return await fetch(route + (id + 1))
              .then((res: Response) => res.json())
              .catch((err: Error) => console.log(err))
          }
        );


        Promise.all(promises)
          .then((datas) => setApiDatas(datas))
          .then((datas) => resolve(datas))
          .catch((err) => reject(err));
      });
    }

    getDatas();
  }, [query.page])

  return apiDatas;
}

export default useApi;