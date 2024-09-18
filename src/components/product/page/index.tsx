import type { MyResponse } from '@/api/request';
import type { PageData } from '@/interface';
import type { ColumnsType } from 'antd/es/table/interface';
import { css } from '@emotion/react';
import { forwardRef, useCallback, useEffect, } from 'react';
import MyTable from '@/components/core/table';
import { useStates } from '@/utils/use-states';


interface SearchApi {
  (params?: any): MyResponse<PageData<any>>;
}

type ParseDataType<S> = S extends (params?: any) => MyResponse<PageData<infer T>> ? T : S;

export type MyPageTableOptions<S> = ColumnsType<S>;
export interface PageProps<S> {
  pageApi?: S;
  pageParams?: object;
  tableOptions?: MyPageTableOptions<ParseDataType<S>>;
  tableRender?: (data: MyPageTableOptions<ParseDataType<S>>[]) => React.ReactNode;
}

export interface RefPageProps {
  setAsideCheckedKey: (key?: string) => void;
  load: (data?: object) => Promise<void>;
}

const BasePage = <S extends SearchApi>(props: PageProps<S>, ref: React.Ref<RefPageProps>) => {
  const {
    pageApi,
    pageParams,
    tableOptions,
    tableRender,
  } = props;
  const [pageData, setPageData] = useStates<PageData<ParseDataType<S>>>({
    pageSize: 20,
    pageNum: 1,
    total: 0,
    data: [],
  });


  const getPageData = useCallback(
    async (params: Record<string, any> = {}) => {
      if (pageApi) {
        const obj = {
          ...params,
          ...pageParams,
          pageSize: pageData.pageSize,
          pageNum: pageData.pageNum,
        };
        const res = await pageApi(obj);

        if (res.success) {
          setPageData({ total: res.data.total, data: res.data });
        }
      }
    },
    [pageApi, pageParams, pageData.pageSize, pageData.pageNum],
  );

  useEffect(() => {
    getPageData();
  }, [getPageData]);

  const onSearch = (searchParams: Record<string, any>) => {
    getPageData(searchParams);
  };

  const onPageChange = (pageNum: number, pageSize?: number) => {
    setPageData({ pageNum });

    if (pageSize) {
      setPageData({ pageSize });
    }
  };

  return (
    <div css={styles}>
      <div className="tabs-main">
          {tableOptions && (
            <div className="table">
              <MyTable
                height="100%"
                dataSource={pageData.data}
                columns={tableOptions}
                pagination={{
                  current: pageData.pageNum,
                  pageSize: pageData.pageSize,
                  total: pageData.total,
                  onChange: onPageChange,
                }}
              >
                {tableRender?.(pageData.data)}
              </MyTable>
            </div>
          )}
      </div>
    </div>
  );
};

const BasePageRef = forwardRef(BasePage) as <S extends SearchApi>(
  props: PageProps<S> & { ref?: React.Ref<RefPageProps> },
) => React.ReactElement;

type BasePageType = typeof BasePageRef;

interface MyPageType extends BasePageType {
  MyTable: typeof MyTable;
}

const MyPage = BasePageRef as MyPageType;

MyPage.MyTable = MyTable;

export default MyPage;

const styles = css`
  display: flex;
  flex-direction: column;
  .tabs-main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  .search {
    margin-bottom: 10px;
  }

  .aside-main {
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    @media screen and (max-height: 800px) {
      overflow: auto;
    }
  }

  .table {
    flex: 1;
    overflow: hidden;
    @media screen and (max-height: 800px) {
      overflow: auto;
      min-height: 500px;
    }
  }
`;
