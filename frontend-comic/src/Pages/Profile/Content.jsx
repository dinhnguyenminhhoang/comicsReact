import { Row } from "react-bootstrap";
import Books from "~/Components/Books/Books";
const Content = ({ cx, followedData, chipi }) => {
    return (
        <div className={cx("profile__content")}>
            <div className={cx("profile__header")}>
                <span className={cx("header__category")}>Bộ sưu tập</span>
            </div>
            <div className={cx("content__container")}>
                <Row className={cx("profile__category-wrapper")}>
                    {followedData?.errCode === 0 &&
                    followedData.data.length > 0 ? (
                        followedData.data.map((comic, index) => {
                            return (
                                <Books
                                    image={comic.image}
                                    name={comic.name}
                                    timePassed={followedData.data}
                                    index={index}
                                    id={comic.id}
                                    className
                                    key={index}
                                />
                            );
                        })
                    ) : (
                        <div className={cx("no__follow")}>
                            <h1 className={cx("no__follow--title")}>
                                Theo dõi truyện đi nào !!
                            </h1>
                            <img
                                src={chipi}
                                alt=""
                                className={cx("no__follow--image")}
                            />
                        </div>
                    )}
                </Row>
                <div className={cx("profile__love-wrapper")}></div>
            </div>
        </div>
    );
};

export default Content;
