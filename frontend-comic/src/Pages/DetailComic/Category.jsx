import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Category = ({ cx, icon, categoriesByComicData }) => {
    return (
        <div className={cx("title__wrapper")}>
            <div className={cx("title-name")}>
                <FontAwesomeIcon className={cx("title-icon")} icon={icon} />
                <span className={cx("title__text")}>Thể Loại</span>
            </div>
            <span className={cx("title__content")}>
                <ul className={cx("list-action")}>
                    {categoriesByComicData?.categories?.map(
                        (category, index) => (
                            <li key={index}>
                                <Link to={`/categories/${category.id}`}>
                                    {category.name}
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </span>
        </div>
    );
};
export default Category;
