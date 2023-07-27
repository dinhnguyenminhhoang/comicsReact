import classNames from "classnames/bind";
import styles from "./Categories.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getComicByCategory } from "~/redux/action/action.js";
import TopComic from "~/Components/TopComic/TopComic";
import Books from "~/Components/Books/Books";
import Heading from "~/Components/Heading/Heading";
const cx = classNames.bind(styles);
function Categories() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const comicByCategoryData = useSelector(
        (state) => state.comicByCategory.data
    );
    useEffect(() => {
        dispatch(getComicByCategory(id));
    }, [dispatch, id]);
    return (
        <div className={cx("categories__container")}>
            <TopComic />
            <Heading heading="Truyện theo thể loại" />
            <div className={cx("category__wrapper")}>
                {comicByCategoryData.comics &&
                    comicByCategoryData.comics.map((comic, index) => {
                        return (
                            <div className={cx("book")} key={index}>
                                <Books
                                    image={comic.image}
                                    name={comic.name}
                                    timePassed={comicByCategoryData.comics}
                                    index={index}
                                    className={true}
                                    id={comic.id}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Categories;
