import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Input from "~/Components/Input/Input";
import Button from "~/Components/Button/Button";

const Tests = () => {
    const [value, setValue] = useState("");
    const onChane = (e) => {
        console.log("onChane", value);
        setValue(e.target.value);
    };
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Button text="my btn" />
        </div>
    );
};

export default Tests;
