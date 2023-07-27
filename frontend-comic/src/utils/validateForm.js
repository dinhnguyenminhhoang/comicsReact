const validateForm = (formData, validationRules) => {
    const errors = {};
    let isValid = true;
    Object.entries(validationRules).forEach(([field, rules]) => {
        if (
            rules.required &&
            (!formData[field] || formData[field].trim() === "")
        ) {
            isValid = false;
            errors[field] = `${
                field.charAt(0).toUpperCase() + field.slice(1)
            } không được để trống`;
        }
        if (
            rules.pattern &&
            formData[field] &&
            !rules.pattern.test(formData[field])
        ) {
            isValid = false;
            errors[field] = rules.errorMessage;
        }
        if (
            rules.minLength &&
            formData[field] &&
            formData[field].length < rules.minLength
        ) {
            isValid = false;
            errors[field] = rules.errorMessage;
        }
        if (
            rules.hasSpecialChar &&
            formData[field] &&
            !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData[field])
        ) {
            isValid = false;
            errors[field] = rules.errorMessage;
        }

        if (
            rules.hasUpperCase &&
            formData[field] &&
            !/[A-Z]+/.test(formData[field])
        ) {
            isValid = false;
            errors[field] = rules.errorMessage;
        }
    });
    return [isValid, errors];
};
export default validateForm;
