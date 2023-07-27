import { Button, Col, Form, Row } from "react-bootstrap";
import UploadAvata from "../UploadAvata/UploadAvata";
import Input from "../Input/Input";
const FormModal = ({
    cx,
    formData,
    imageData,
    handleInputChange,
    handleSetImage,
    handleSubmit,
}) => {
    return (
        <div className={cx("container")}>
            <h1 className={cx("mb-4", "header")}>
                {imageData && (
                    <img
                        className={cx("modal__image")}
                        src={imageData}
                        alt=""
                        width={100}
                        height={100}
                        style={{
                            objectFit: "cover",
                            borderRadius: "999px",
                        }}
                    />
                )}
            </h1>
            <div className={cx("from-container")}>
                <Row className={cx("mb-3")}>
                    <label>username: </label>
                    <Form.Group as={Col} controlId="username">
                        <Form.Label>username:</Form.Label>
                        <Form.Control
                            className={cx("form-control-lg")}
                            style={{ borderRadius: "10px" }}
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Nhập username"
                        />
                    </Form.Group>
                </Row>
                <Row className={cx("mb-3")}>
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            className={cx("form-control-lg")}
                            style={{ borderRadius: "10px" }}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Nhập email"
                            disabled
                        />
                    </Form.Group>
                </Row>
                <Row className={cx("mb-3")}>
                    <UploadAvata
                        handleSetImage={handleSetImage}
                        className={true}
                    />
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-center">
                        <Col sm={2}>
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100"
                            >
                                chỉnh sửa
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default FormModal;
