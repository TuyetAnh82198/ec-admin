import Form from "../form/Form";
import { PAGE_TITLE } from "../../../utils/constants";
import fetchLogin from "../../../utils/fetchLogin";
import handleNavigate from "../../../utils/handleNavigate";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetchLogin()
      .then((loggedInState) => {
        if (loggedInState) {
          handleNavigate.toHomePage(navigate);
        }
      })
      .catch((err) => {});
  }, []);
  return <Form pageTitle={PAGE_TITLE.REGISTER} />;
};
export default Register;
