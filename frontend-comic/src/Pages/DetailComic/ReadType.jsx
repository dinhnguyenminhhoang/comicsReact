import { Link } from "react-router-dom";

const ReadType = ({ cx, comicById, chapterById }) => {
    return (
        <div className={cx("read__type")}>
            {comicById?.data && chapterById?.data && (
                <Link
                    to={`/reading/${comicById.data.name}/${comicById.data.id}/${
                        chapterById.data[chapterById.data.length - 1].id
                    }`}
                >
                    <button
                        className={cx("read__btn--first")}
                        dangerouslySetInnerHTML={{
                            __html: "đọc từ đầu",
                        }}
                    />
                </Link>
            )}
            {comicById?.data && chapterById?.data && (
                <Link
                    to={`/reading/${comicById.data.name}/${comicById.data.id}/${chapterById.data[0].id}`}
                >
                    <button
                        className={cx("read__btn--new")}
                        dangerouslySetInnerHTML={{
                            __html: "đọc mới nhất",
                        }}
                    />
                </Link>
            )}
        </div>
    );
};

export default ReadType;
