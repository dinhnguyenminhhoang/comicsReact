import { Link } from "react-router-dom";
const MenuCategory = ({ categoryData, cx }) => {
    return (
        <div className={cx("nav-container")}>
            <ul className={cx("nav-list")}>
                {categoryData &&
                    categoryData.map((category, index) => {
                        return (
                            <Link to={`/categories/${category.id}`} key={index}>
                                <li className={cx("nav-item")}>
                                    {category.name}
                                </li>
                            </Link>
                        );
                    })}
            </ul>
        </div>
    );
};

export default MenuCategory;
