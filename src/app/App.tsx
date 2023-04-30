import {useAppDispatch, useAppSelector} from "./hooks";
import {useEffect} from "react";
import {Counter} from "../features/counter/Counter";
import {appActions} from "./app.slice";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }, 3000);
  }, []);

  return (
      <div className="App">
        {isLoading && <h1>Loader...</h1>}
        <Counter />
      </div>
  );
}

export default App;