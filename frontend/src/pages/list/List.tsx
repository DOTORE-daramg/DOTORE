import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { viewList } from "../../api/item";
import StyledPagination from "../../stories/common/StyledPagination";
import { InputBox } from "../../stories/InputBox";
import Category from "../../stories/list/Category";
import Checkbox from "../../stories/list/Checkbox";
import Item, { ItemProps } from "../../stories/list/Item";
import ItemSkeleton from "../../stories/list/ItemSkeleton";
import { Title } from "../../stories/Title";

export const Container = styled.div`
  height: fit-content;
  margin: 150px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    margin: 100px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
export const SideContainer = styled.div`
  width: 15rem;
  margin-right: 6rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
    align-items: center;
    margin-right: 0;
  }
`;
export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
export const CategoryContainer = styled.div`
  display: flex;
  width: 10rem;
  justify-content: flex-start;
  margin: 30px 0;
  @media screen and (max-width: 768px) {
    width: 45%;
    justify-content: space-around;
  }
`;

export const CheckboxContainer = styled.div`
  width: 10rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
`;
export const InnerContainer = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MainContainer = styled.div`
  width: calc(100% - 40rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
export const ItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  place-items: center;
  @media screen and (max-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
  }
  @media screen and (max-width: 1000px) {
    /* width: 90%; */
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
  }
`;

export const Message = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const List = () => {
  // 반응형
  const isPc = useMediaQuery({ minWidth: 1300 });
  const isTablet = useMediaQuery({ minWidth: 1000 });
  const viewMode = isPc ? "15rem" : isTablet ? "10rem" : "155px";

  const [filteredItems, setFilteredItems] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelectedSortType, setIsSelectedSortType] = useState<number>(0);
  const categories = ["최신순", "인기순"];

  // const [activePage, setActivePage] = useState<number||null>(1);

  // useEffect(() => { }, [currentPage]);
  // const onClinkPageChange = (page: number) => {
  //   setCurrentPage(page);
  //   //onClick={(e) => setCurrentPage(currentPage - 1)
  //   //onClick={(e) => setCurrentPage(currentPage + 1)
  // }

  // useEffect(() => {
  //   viewAll().then((res) => {
  //     setItems(res.data.data);

  //     if (isSelected === 0) {
  //       // 최신순
  //       setFilteredItems(res.data.data);
  //     } else if (isSelected === 1) {
  //       // 인기순
  //       setFilteredItems(
  //         res.data.data.sort((a: ItemProps, b: ItemProps) => {
  //           return b.like - a.like;
  //         })
  //       );
  //     }
  //     setIsLoading(false);
  //   });
  // }, [isSelected]);

  // 페이지네이션
  // 들고있어야할 state : 면에 렌더링할 item List랑 pageNum, sort, type
  const [itemList, setItemList] = useState<ItemProps[]>([]); // 보여질 아이템들.
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [activePage, setActivePage] = useState<number>(1);
  const handlePageChange = (activePage: number) => {
    setActivePage(activePage);
  };
  const [keyword, setKeyword] = useState<string>("");
  const [sortType, setSortType] = useState<0 | 1>(0); // 정렬
  const [artType, setArtType] = useState<"all" | "first" | "second">("all");
  const [itemTotal, setItemTotal] = useState<number>(0);
  const [skeletonCnt, setSkeletonCnt] = useState<number>(0);

  // const indexOfLast = currentPage * itemsPerPage;
  // const indexOfFirst = indexOfLast - itemsPerPage;

  const onSearch = (searchInput: string) => {
    setKeyword(searchInput);
  };

  const onKeyUpEnter = (e: any) => {
    if (e.key !== "Enter") {
      return;
    }
    onSearch(e.target.value);
  };

  const handleSortType = (category: string) => {
    if (category === "최신순") {
      setSortType(0);
    } else if (category === "인기순") {
      setSortType(1);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    console.log(`검색은 ${keyword}, 정렬은 ${sortType}, 분류는 ${artType}`);
    viewList(activePage, keyword, sortType, artType)
      .then((res) => {
        console.log(res.data);
        setItemList(res.data.data);
        setItemTotal(res.data.total);
        setIsLoading(false);
        // console.log(res.data.total);
      })
      .catch((err) => console.error(err));
  }, [activePage, sortType, artType, keyword]);

  return (
    <Container>
      {/* <SearchBar items={items}></SearchBar> */}
      <InnerContainer>
        <SideContainer>
          <div style={{ marginBottom: "20px" }}>
            <Title label="NFT 보기" size="2rem"></Title>
          </div>
          <InputBox
            icon={"magnifying-glass"}
            items={itemList}
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems}
            width="100%"
            placeholder="작품명 / 작가명 검색"
            onKeyUp={onKeyUpEnter}
          />
          <FilterContainer>
            <CategoryContainer>
              {categories.map((category, index) => (
                <Category
                  key={index}
                  label={category}
                  onClick={() => handleSortType(category)}
                  isSelected={sortType === index}
                />
              ))}
            </CategoryContainer>
            <CheckboxContainer>
              <Checkbox
                id="all"
                label="View All"
                artType={artType}
                onChangeArtType={setArtType}
              />
              <Checkbox
                id="first"
                label="1차 NFT"
                artType={artType}
                onChangeArtType={setArtType}
              />
              <Checkbox
                id="second"
                label="2차 NFT"
                artType={artType}
                onChangeArtType={setArtType}
              />
            </CheckboxContainer>
          </FilterContainer>
        </SideContainer>
        <MainContainer>
          {isLoading ? (
            <ItemContainer>
              {[...Array(12)].map((n, index) => (
                <ItemSkeleton width={viewMode} key={index} />
              ))}
            </ItemContainer>
          ) : itemList && itemList.length > 0 ? (
            <ItemContainer>
              {itemList.map((item, index) => (
                <Item key={index + String(item.tokenId)} {...item} />
              ))}
            </ItemContainer>
          ) : (
            <>
              <Message>등록된 작품이 없습니다.</Message>
            </>
          )}
          <StyledPagination
            activePage={activePage || 1}
            totalCount={itemTotal}
            handlePageChange={handlePageChange}
            displayCount={itemsPerPage}
            pageRangeCount={5}
          />
          {/* <Pagination
            itemsPerPage={itemsPerPage}
            totalCount={items.length}
            paginate={setCurrentPage}>
            
            </Pagination> */}
        </MainContainer>
      </InnerContainer>
    </Container>
  );
};

export default List;
