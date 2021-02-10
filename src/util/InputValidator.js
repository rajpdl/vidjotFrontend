const InputValidator = (input) => {
    if(!input || input.length < 4) {
        return false;
    }
    return true;
};
export default InputValidator;