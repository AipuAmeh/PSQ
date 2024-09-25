import PropTypes from "prop-types";
import PasswordChecklist from "react-password-checklist";

const PasswordChecklistComp = ({ password }) => {
return (
    <PasswordChecklist   
    rules={["capital", "specialChar", "minLength", "number"]}
    minLength={8}
    value={password}
/>
)
};

PasswordChecklistComp.propTypes = {
    password: PropTypes.bool.isRequired
};

export default PasswordChecklistComp;