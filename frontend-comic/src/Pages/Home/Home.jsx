import classNames from "classnames/bind";
import Styles from "./Home.module.scss";

import TopComic from "~/Components/TopComic/TopComic";
import AllComic from "~/Components/AllComic/AllComic";
const cx = classNames.bind(Styles);
function Home() {
  return (
    <div className={cx("home-wrapper")}>
      <TopComic />
      <AllComic />
    </div>
  );
}

export default Home;
