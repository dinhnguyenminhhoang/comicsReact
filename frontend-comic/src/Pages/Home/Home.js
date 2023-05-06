import classNames from "classnames/bind";
import Styles from "./Home.module.scss"
import TopComic from "~/Components/TopComic/TopComic";
const cx = classNames.bind(Styles);
function Home() {
    return (
        <div className={cx("home-wrapper")}>
            <TopComic />
        </div>
    );
}

export default Home;