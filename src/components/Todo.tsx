import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type todos = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  remindAt: string | Date;
};
type data = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
function Todo() {
  const [todos, setTodos] = useState<todos[]>([]);
  const [allData, setAllData] = useState<todos[]>([]);
  const [offset, setOffset] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://jsonplaceholder.cypress.io/todos");
      const { data } = res;
      if (data) {
        const date = new Date();
        const expectedData = data.map((d: data) => {
          return {
            ...d,
            createdAt: date.toISOString(),
            remindAt: "",
          };
        });
        const respo = axios.post("https://jsonplaceholder.cypress.io/todos", expectedData)
        setAllData(expectedData);
        const xyz = expectedData.slice(0, 9);
        setTodos(xyz);
      }
    };
    fetchData();
  }, []);

  const fetchMoreData = () => {
    const lastElem = todos.length;
    const newLast = offset * 10 + lastElem;
    console.log(newLast);
    
    if (newLast < allData.length) {
        setHasMore(true);
        setTodos(prv => [...prv, ...allData.slice(lastElem, newLast)])
        setOffset(prv=> prv+1);
        console.log(todos);
        
    } else setHasMore(false)
  }

  return (
    <div className=" flex flex-col items-center w-8/12 h-full mt-8 gap-2">
      <h1 className=" text-3xl text-center font-bold">Todos</h1>
      <button className="p-2 bg-fuchsia-600 hover:bg-fuchsia-700 rounded text-sm font-bold text-gray-50 transition duration-200">
        New Todo
      </button>

      <div
        className="w-full mt-8 gap-2 overflow-auto"
        style={{height: "300px"}}
        id="scrollableDiv"
      >
        <InfiniteScroll
          dataLength={todos.length}
          next={fetchMoreData}
          scrollableTarget="scrollableDiv"
          inverse={true} //
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {todos  &&
          todos.map((todo) => {
            console.log(todos.length)
            return (
              <div
                key={todo.id}
                className=" flex items-center justify-between w-full gap-2 bg-red-400 p-3 rounded-md"
              >
                <p>{todo.title}</p>
                <div className=" flex items-center justify-evenly w-fit gap-2">
                  <label>
                    completed:
                    <input type="checkbox" />
                  </label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
        </div>
    </div>
  );
}

export default Todo;
