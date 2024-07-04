import { Box } from "@chakra-ui/react";
import { useCurrentUserContext } from "../utils/context/CurrentUser";
import PatientDashboard from "../components/Patient-Components/PatientDashboard";
import ProviderDashboard from "../components/Provider-Components/ProviderDashboard";


const Dashboard = () => {

  const isProvider = useCurrentUserContext().isProvider;


  const renderDashboard = () => {
    if (isProvider) {
      return <ProviderDashboard />;
    } 
    if (!isProvider) {
      return <PatientDashboard />;
    }
  };

  return (
    <Box>
      DASHBOARD
    {renderDashboard()}
    </Box>
  )
};

export default Dashboard;
